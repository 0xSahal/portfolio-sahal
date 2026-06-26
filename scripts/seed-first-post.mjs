// Seed the first blog post (author + category + post) into Sanity as proper
// Portable Text. Idempotent: safe to run more than once. It will reuse an
// existing author/category by slug and skip the post if its slug already exists.
//
// Usage:
//   1. Create a write token at https://www.sanity.io/manage
//      (your project -> API -> Tokens -> "Editor" role).
//   2. Add it to .env.local:   SANITY_API_WRITE_TOKEN=sk...
//   3. Run:                    npm run seed:blog
//
// The token is read from the environment and never hard-coded. It needs write
// access, so treat it like a password and do not commit it.

import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { createClient } from '@sanity/client';

// --- minimal .env.local loader (so no --env-file flag or dotenv dep needed) ---
function loadEnvLocal() {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // no .env.local — rely on the ambient environment instead
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Check .env.local.',
  );
  process.exit(1);
}
if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN.\n' +
      'Create one at https://www.sanity.io/manage (API -> Tokens, "Editor" role)\n' +
      'then add it to .env.local as:  SANITY_API_WRITE_TOKEN=sk...',
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// --- Portable Text helpers ---
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);
const span = (text) => ({ _type: 'span', _key: key(), text, marks: [] });
const block = (style, text) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
});
const p = (text) => block('normal', text);
const h2 = (text) => block('h2', text);

// --- Content ---
const POST_SLUG = 'the-bottleneck-was-never-the-code';

const body = [
  p('By the end of 2025, most developers were not asking whether to use AI to write code. They were asking how much of it to hand over. Industry surveys put adoption of AI coding tools at roughly 85 percent of developers, and the bolder predictions had AI writing the majority of all new code within the year.'),
  p('The promise was simple. If a machine can produce code in seconds, then building software gets faster, cheaper, and easier for everyone.'),
  p('Some of that came true. A lot of code does get written faster now. But here is the paradox that defined the last eighteen months. Teams are generating more code than ever, merging more changes than ever, moving faster at the keyboard than at any point in the history of the craft. And yet the thing that actually matters, shipping software that works and keeps working, has not gotten proportionally easier.'),
  p('For a lot of teams, it quietly got harder.'),

  h2('What "vibe coding" revealed'),
  p('In early 2025, Andrej Karpathy gave a name to a way of working that was already spreading: vibe coding. You describe what you want, you accept what the AI gives back, and if it looks like it works, you ship it. No close reading of the code. No real understanding of why it works. Just vibes.'),
  p('It is a genuinely useful mode for a weekend prototype. The trouble starts when that prototype meets real users, real data, and real money.'),
  p('The reports that arrived through 2026 were not subtle. A large share of AI-generated code, by some analyses close to half, shipped with security vulnerabilities. Duplicated code climbed. Refactoring, the unglamorous work of keeping a codebase clean and changeable, dropped sharply, because nobody understood the code well enough to safely touch it. And at production scale, database design produced by a model that was never thinking about scale quietly inflated cloud bills.'),
  p('The pattern underneath all of it is the same. AI is very good at producing code that is almost right. Almost right is delightful in a demo and expensive in production.'),

  h2('The number that tells the real story'),
  p('Here is the statistic I keep coming back to. Teams that lean heavily on AI merge dramatically more pull requests, on the order of sixty percent more. And yet their delivery speed, measured honestly from idea to shipped, improves by only around ten percent.'),
  p('Read that again. The code is being written far faster. The product is barely shipping faster.'),
  p("Google's 2025 DORA report, the most serious long-running study of how software actually gets delivered, explained why. AI now has a positive relationship with throughput, the raw volume of work produced. But it still has a negative relationship with stability, whether what you ship stays up and stays correct. The time you save writing code does not disappear. It moves downstream, into reviewing, auditing, and verifying what the machine produced."),
  p("The report's sharpest line is the one every founder should keep somewhere visible: AI does not fix a team, it amplifies what is already there. Strong teams get faster. Struggling teams get faster at making a mess."),
  p('Which leads to the conclusion that reframes the whole conversation. The bottleneck was never the code.'),

  h2('The bottleneck was always judgment'),
  p('Writing code was always the most automatable part of building software. The hard parts were never the typing. They were deciding what to build, understanding the business well enough to know what actually matters, designing a system that will not buckle in its second year, and being able to look at a confident, plausible-looking solution and know whether it is correct, secure, and right for the people who will use it.'),
  p('Those are judgment problems. And judgment is precisely what AI does not hand you for free.'),
  p('This is why hiring is shifting in real time. The industry is moving away from screening for syntax and toward screening for reasoning. One large technical hiring platform reported that assessments for problem-solving and aptitude have surged many times over since 2024, while the classic memorize-the-algorithm interview is quietly being retired. The new question sounds more like this: here is a broken service and three AI-generated fixes, which would you ship, and what would you check before you did. There is no correct syntax answer. There is only judgment.'),
  p('When code is abundant, the scarce thing is the wisdom to direct it.'),

  h2('What this means if you are building something'),
  p('If you are a founder, or a business with an idea you want to make real, the AI era is genuinely good news. With one large caveat.'),
  p('The good news: the cost of turning an idea into working software has fallen, and it will keep falling. You should be more ambitious, not less.'),
  p('The caveat: the cost of turning an idea into the wrong software has fallen just as fast. It has never been easier to spend three months and a real budget building something fast, polished, and pointed in completely the wrong direction. Speed without clarity only gets you to the wrong place sooner.'),
  p('So the question worth asking has changed. It is no longer "can this person write the code." Almost anyone, and increasingly almost anything, can write the code. The question is "can this person help me figure out what is actually worth building, and then ship it in a way that holds up."'),
  p('That is a question about judgment, communication, and ownership. Not typing speed.'),

  h2('How I think about it'),
  p('My approach is built around the part the machine cannot do for you. I start with clarity. What is the business actually trying to move. What does success look like. What can we cut. Then, and only then, the building.'),
  p('I use AI heavily in that building, because refusing to would be like insisting on a hand saw at a sawmill. But I treat everything it produces as a draft to be understood, reviewed, and held to a standard, never as an answer to be pasted in and hoped over. The model is a fast, tireless junior who needs a senior in the room. I am that senior, and increasingly that is the job.'),
  p('The result is the only thing a client should care about. An idea turned into something real, that works, that you actually understand, and that does not become a liability six months from now.'),
  p('Clarity first. Then shipped.'),

  h2('The next few years'),
  p('The teams and the builders who win the next few years will not be the ones who generate the most code. That race is over, and the machines won it. The winners will be the ones who pair that new abundance with the thing it cannot replace: clear thinking about what to build, and the judgment to know when "almost right" is not good enough.'),
  p('The code got cheap. Good decisions did not. That is where the real work, and the real value, now lives.'),
];

// --- Upsert helpers (idempotent by slug) ---
async function upsertBySlug({ type, slug, doc }) {
  const existing = await client.fetch(
    '*[_type == $type && slug.current == $slug][0]._id',
    { type, slug },
  );
  if (existing) {
    console.log(`  - ${type} "${slug}" already exists (${existing})`);
    return existing;
  }
  const created = await client.create({
    _type: type,
    slug: { _type: 'slug', current: slug },
    ...doc,
  });
  console.log(`  - created ${type} "${slug}" (${created._id})`);
  return created._id;
}

async function main() {
  console.log(`Seeding into project ${projectId}, dataset "${dataset}"...`);

  const authorId = await upsertBySlug({
    type: 'author',
    slug: 'sahal-shaikh',
    doc: {
      name: 'Sahal Shaikh',
      bio: 'Independent product engineer. I turn ambiguous ideas into websites and products that move the business, end to end.',
    },
  });

  const categoryId = await upsertBySlug({
    type: 'category',
    slug: 'engineering',
    doc: {
      title: 'Engineering',
      description: 'How software actually gets built, and what that means for the business behind it.',
    },
  });

  const existingPost = await client.fetch(
    '*[_type == "post" && slug.current == $slug][0]._id',
    { slug: POST_SLUG },
  );
  if (existingPost) {
    console.log(
      `\nPost "${POST_SLUG}" already exists (${existingPost}). Nothing to do.\n` +
        'Delete it in /studio first if you want to re-seed.',
    );
    return;
  }

  const post = await client.create({
    _type: 'post',
    title: 'The Bottleneck Was Never the Code',
    slug: { _type: 'slug', current: POST_SLUG },
    excerpt:
      'AI can write most of the code now, so why has shipping good software not gotten proportionally easier? What actually changed, and what it means for anyone building a product.',
    category: { _type: 'reference', _ref: categoryId },
    author: { _type: 'reference', _ref: authorId },
    publishedAt: new Date().toISOString(),
    featured: true,
    body,
    metaTitle: 'The Bottleneck Was Never the Code',
    metaDescription:
      'AI writes most of the code now, yet shipping good software has not gotten easier. The real bottleneck was never code. It was judgment.',
  });

  console.log(`\nDone. Created post "${post.title}" (${post._id}).`);
  console.log('Add a cover image in /studio, then view it at /blog.');
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message);
  if (err.statusCode === 401 || err.statusCode === 403) {
    console.error('That looks like a token problem. Make sure SANITY_API_WRITE_TOKEN has Editor (write) access.');
  }
  process.exit(1);
});
