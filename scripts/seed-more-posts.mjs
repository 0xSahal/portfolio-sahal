// Seed two more blog posts into Sanity as Portable Text. Idempotent: reuses the
// author/categories by slug and skips any post whose slug already exists.
//
// Usage (same write token as the first seed):
//   1. SANITY_API_WRITE_TOKEN must be set in .env.local (Editor role).
//   2. Run:  npm run seed:posts
//
// The token is read from the environment and never hard-coded.

import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { createClient } from '@sanity/client';

function loadEnvLocal() {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {
    // rely on ambient env
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Check .env.local.');
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
const block = (style, text, extra = {}) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
  ...extra,
});
const p = (text) => block('normal', text);
const h2 = (text) => block('h2', text);
const h3 = (text) => block('h3', text);
const li = (text) => block('normal', text, { listItem: 'bullet', level: 1 });

// --- Post 1: voice cloning ---
const voiceBody = [
  p('Your phone rings. It is your daughter, and she is crying. She has been in an accident, she is in trouble, she needs money right now, and she is begging you not to tell anyone. The voice is hers. The panic is hers. Every instinct you have says move.'),
  p('Except it is not her. It is a few seconds of her voice, scraped from a social media clip and run through an AI tool that anyone can rent for the price of a coffee.'),
  p('This is not science fiction or a rare edge case. In 2026 it is one of the most common and most profitable scams in the world. The FBI has tied roughly 900 million dollars in losses to AI voice-cloning scams in the United States alone. And the technology has gotten so cheap and so convincing that the old reassurance, "I would be able to tell," no longer holds.'),
  p('Here is the honest picture of how this works, and a defense plan that takes about five minutes to set up and protects your whole family.'),

  h2('How a three-second clip becomes a weapon'),
  p('Voice cloning used to need hours of clean audio and a studio. Not anymore. Researchers at McAfee found that as little as three seconds of audio can produce a clone that matches a real voice about 85 percent of the time. That is one Instagram story. One voice note forwarded in a group chat. One clip from a birthday video.'),
  p('The scammer feeds that sample into a tool, types whatever they want the person to say, and the AI speaks it in their voice, with their accent, their rhythm, even their emotion. Then they call from a spoofed number, often late at night, and they manufacture panic, because panic shuts down the part of your brain that asks questions.'),
  p('The scripts are predictable once you know them:'),
  li('The family emergency: a child, grandchild, or spouse in an accident, arrested, or stranded, needing money immediately and secretly.'),
  li('The official threat: a police officer or court official claiming you missed jury duty and owe a penalty.'),
  li('The boss: a manager or executive asking an employee to move money or buy gift cards urgently.'),
  p('The technology is new. The trick is ancient: create fear, create urgency, and rush you past your own judgment.'),

  h2('It is not just families. Businesses are the bigger target.'),
  p('If the personal version frightens you, the corporate version should get every business owner\'s attention. In one widely reported case, a finance employee at a large company joined a video call with what looked and sounded like the company\'s chief financial officer and several colleagues. Every person on that call was a deepfake. Convinced it was real, the employee transferred about 25 million dollars.'),
  p('That was a video deepfake, which is harder to pull off than voice. But the direction is clear, and as the tools get cheaper the same playbook scales down to small businesses: a cloned voice of the owner telling the bookkeeper to pay an urgent invoice, a fake supplier, a rushed wire transfer.'),
  p('By some industry measures, deepfake-enabled fraud attempts have climbed more than 2,000 percent over the last three years. This is not a wave that is coming. It is already here.'),

  h2('The five-minute defense that actually works'),
  p('Here is the reassuring part. You do not need to be technical, and you do not need to win a detection contest against the AI. You just need habits that make the fake useless.'),
  h3('Agree on a family safe word'),
  p('Pick a word or short phrase that is odd, memorable, and never posted online. Something like "purple cactus" or "blue elephant." Share it with your close family in person. The rule is simple: if someone calls in a panic asking for money or secrecy, you ask for the safe word. A scammer will not have it. Your real daughter will.'),
  h3('Hang up and call back'),
  p('This single habit defeats almost every version of this scam. If you get an alarming call, hang up, and call the person back on the number you already have saved for them. Do not call the number that just rang you. If they are fine, you will know in ten seconds. If you cannot reach them, call another family member. Real emergencies survive a five-minute check. Scams do not.'),
  h3('Distrust urgency and secrecy'),
  p('The two reddest flags are "you must act right now" and "do not tell anyone." That is not how most real emergencies work, but it is exactly how every scam works. The moment you feel rushed and isolated, that feeling is the warning.'),
  h3('Lock down the money'),
  p('Never send money, gift cards, or crypto based on a phone call alone, no matter whose voice it is. For businesses, require a second person to approve any payment above a set amount, and confirm any change to bank details through a known channel, never the one in the request.'),

  h2('How to spot a fake in the moment'),
  p('Detection is getting harder, so treat this as a backup, not your main defense. Still, clones often slip on a few things:'),
  li('Unnatural smoothness, with none of the normal pauses, stumbles, or filler words.'),
  li('Odd breathing, or no breathing at all.'),
  li('Background sound that does not match where the person claims to be.'),
  li('A strange flatness when you ask an unexpected, personal question.'),
  p('Honestly, asking something only the real person would know, like "what did we eat at dinner on Sunday," is far more reliable than listening for audio glitches.'),

  h2('What every business should put in place'),
  p('If you run a company, write these into policy this week:'),
  li('A mandatory verify-by-callback rule for any payment or sensitive request, even when it appears to come from the boss.'),
  li('A two-person approval step for moving money above a threshold.'),
  li('A blameless culture where an employee can pause a request from the "CEO" to verify it, without fear. Most deepfake heists succeed because a junior person felt too intimidated to ask a question.'),
  p('The companies that get hit are rarely the ones without firewalls. They are the ones without a verification habit.'),

  h2('The bigger picture'),
  p('It is tempting to feel helpless watching AI get this good this fast. Do not. The technology behind these scams is genuinely impressive, but the defense does not require beating it at its own game. You do not have to out-detect a deepfake. You just have to refuse to act on a voice alone.'),
  p('A safe word. A call back. A pause. Those three habits cost nothing and protect the people you love more than any app will. Set them up this week, and tell the people you care about, especially the older ones, who are targeted most.'),
  p('The scammers are betting that fear will beat your judgment. Prove them wrong.'),
];

// --- Post 2: agents ---
const agentsBody = [
  p('For three years, using AI mostly meant having a very smart conversation. You asked, it answered. You wrote a prompt, it wrote back. Useful, but it was still just talk. You did the doing.'),
  p('In 2026 that line quietly moved. AI stopped only answering questions and started taking actions: booking the thing, filling the form, watching the site, moving work through software while you do something else. The industry calls these "agents," and that word is carrying a lot of marketing weight right now. So let us cut through it: what an agent actually is, where it genuinely helps today, and where it will still embarrass you.'),

  h2('What an "agent" actually is, in plain English'),
  p('A normal AI assistant is like a brilliant consultant on the phone. It can tell you exactly what to do, but you still have to go and do it.'),
  p('An agent is that same consultant, except you have handed it the keys. It can reach your browser, your tools, your inbox, and it has permission to act. You give it a goal, like "find three flights under 400 dollars next Friday and hold the best one," and it takes the steps, clicks the buttons, and comes back with a result instead of instructions.'),
  p('That is the whole shift in one sentence: from telling you what to do, to doing it. Everything else is detail.'),

  h2('Where this is genuinely working'),
  p('This is not all hype. In specific, bounded jobs, agents are already earning their keep.'),
  li('Always-on monitoring. You can point an agent at the web and say "watch for concert tickets under face value" or "tell me when a house in this area lists under 500k," and it checks continuously and pings you. A tireless assistant doing the boring watching.'),
  li('Repetitive software work. Inside companies, agents are moving routine tasks through systems: triaging tickets, reconciling records, drafting and routing documents. The adoption is real, with sectors like telecom and retail reporting that nearly half of organizations are now deploying some form of autonomous workflow.'),
  li('Coding and research. Agents now handle multi-step work across a whole codebase or a long research task, not just single snippets, with a person reviewing the result.'),
  p('The common thread: the task is well defined, the steps are repetitive, and a human still checks the outcome.'),

  h2('Where it still falls on its face'),
  p('Now the honest half. Agents today are confident, fast, and regularly wrong in ways that matter.'),
  p('Hand an agent an open-ended, high-stakes, or ambiguous job and it will still make decisions a sensible person never would, then carry them out with total conviction. The danger is precisely that it acts. A chatbot that gives a wrong answer wastes a minute. An agent that takes a wrong action can send the email, make the booking, or move the money before you notice.'),
  p('So the rule for 2026 is simple. The more reversible and bounded the task, the more you can trust an agent with it. The more permanent and open-ended the task, the more a human needs to stay in the loop.'),

  h2('What this means if you run a business'),
  p('Here is the take that matters. Most businesses are about to do agents wrong. They will bolt a chatbot onto their website, call it an "AI agent," and wonder why nothing changed.'),
  p('The real value is not a bot that talks to customers. It is agents that quietly do work inside your operations: the follow-ups that never get sent, the records that never get reconciled, the leads that never get chased. The unglamorous, repetitive, falls-through-the-cracks work that silently costs you money.'),
  p('The winners will not be the companies that "add AI." They will be the ones who pick a few narrow, repetitive, reversible processes, hand them to an agent with clear limits, and keep a person watching the results. Start where a mistake is cheap. Expand only as trust is earned.'),

  h2('What it means for everyone else'),
  p('You do not need to run a company to benefit. Over the next year, agents will increasingly live inside the tools you already use. Your phone\'s assistant is being rebuilt to actually carry out multi-step tasks across your apps. Your browser is learning to do things, not just show you pages.'),
  p('The practical advice is the same as for businesses, just smaller. Let agents handle the low-stakes, annoying, reversible chores, like comparison shopping, watching for a price drop, or drafting a boring email. Keep your own hands on anything involving money, important messages, or anything you cannot easily undo.'),
  p('And build one habit now: always check what an agent did before you rely on it. "Trust but verify" was good advice for people. For software that acts on your behalf, it is essential.'),

  h2('The honest bottom line'),
  p('Agents are the most genuinely useful shift in AI since the chatbot, and also the most over-promised. Both things are true at once. They will save you real time on the right tasks and create real messes on the wrong ones, and most of the skill over the next year is knowing which is which.'),
  p('The technology can now do things. Whether that helps you or hurts you comes down to the same boring, human quality it always has: judgment about what to hand over, and the discipline to check the result. The tools changed. That part did not.'),
];

async function upsertBySlug({ type, slug, doc }) {
  const existing = await client.fetch('*[_type == $type && slug.current == $slug][0]._id', { type, slug });
  if (existing) {
    console.log(`  - ${type} "${slug}" already exists (${existing})`);
    return existing;
  }
  const created = await client.create({ _type: type, slug: { _type: 'slug', current: slug }, ...doc });
  console.log(`  - created ${type} "${slug}" (${created._id})`);
  return created._id;
}

async function createPostIfMissing({ slug, doc }) {
  const existing = await client.fetch('*[_type == "post" && slug.current == $slug][0]._id', { slug });
  if (existing) {
    console.log(`  - post "${slug}" already exists (${existing}); skipping`);
    return;
  }
  const created = await client.create({ _type: 'post', slug: { _type: 'slug', current: slug }, ...doc });
  console.log(`  - created post "${slug}" (${created._id})`);
}

async function main() {
  console.log(`Seeding 2 posts into project ${projectId}, dataset "${dataset}"...`);

  const authorId = await upsertBySlug({
    type: 'author',
    slug: 'sahal-shaikh',
    doc: {
      name: 'Sahal Shaikh',
      bio: 'Independent product engineer. I turn ambiguous ideas into websites and products that move the business, end to end.',
    },
  });

  const securityId = await upsertBySlug({
    type: 'category',
    slug: 'security',
    doc: { title: 'Security', description: 'Staying safe online as AI changes the threat landscape.' },
  });

  const aiId = await upsertBySlug({
    type: 'category',
    slug: 'ai',
    doc: { title: 'AI', description: 'Plain-English takes on where AI actually helps, and where it does not.' },
  });

  await createPostIfMissing({
    slug: 'ai-voice-cloning-protect-your-family',
    doc: {
      title: 'AI Can Clone a Voice in Three Seconds. Here Is How to Protect Your Family.',
      excerpt:
        'AI voice cloning has grown into a billion-dollar scam industry that targets ordinary families and businesses alike. The good news: a few simple habits make you and the people you love very hard to fool.',
      category: { _type: 'reference', _ref: securityId },
      author: { _type: 'reference', _ref: authorId },
      publishedAt: new Date(Date.now() - 60 * 1000).toISOString(),
      featured: false,
      body: voiceBody,
      metaTitle: 'AI Voice Cloning Scams: How to Protect Your Family',
      metaDescription:
        'AI can clone a voice from three seconds of audio, and scams have drained hundreds of millions. Here is how voice-cloning fraud works and the simple habits that stop it.',
    },
  });

  await createPostIfMissing({
    slug: 'ai-agents-stopped-talking-started-doing',
    doc: {
      title: 'AI Just Stopped Talking and Started Doing. Here Is What That Changes.',
      excerpt:
        'In 2026, AI quietly crossed a line, from answering questions to taking actions on your behalf. Here is what "agents" really are, where they help, and where they will still let you down.',
      category: { _type: 'reference', _ref: aiId },
      author: { _type: 'reference', _ref: authorId },
      publishedAt: new Date().toISOString(),
      featured: false,
      body: agentsBody,
      metaTitle: 'AI Agents in 2026: What Changes When AI Starts Doing',
      metaDescription:
        'AI agents went mainstream in 2026, shifting from answering questions to taking actions. A plain-English guide to what agents are, where they help, and where they fail.',
    },
  });

  console.log('\nDone. Add cover images in /studio for the new posts, then view them at /blog.');
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message);
  if (err.statusCode === 401 || err.statusCode === 403) {
    console.error('Token problem: make sure SANITY_API_WRITE_TOKEN has Editor (write) access.');
  }
  process.exit(1);
});
