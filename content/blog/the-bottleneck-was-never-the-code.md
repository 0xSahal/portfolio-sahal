# The Bottleneck Was Never the Code

> First post for the SahalShaikh.com blog. The article body is below. The exact
> values to paste into each Sanity Studio field are listed at the very bottom.

By the end of 2025, most developers were not asking whether to use AI to write code. They were asking how much of it to hand over. Industry surveys put adoption of AI coding tools at roughly 85 percent of developers, and the bolder predictions had AI writing the majority of all new code within the year.

The promise was simple. If a machine can produce code in seconds, then building software gets faster, cheaper, and easier for everyone.

Some of that came true. A lot of code does get written faster now. But here is the paradox that defined the last eighteen months. Teams are generating more code than ever, merging more changes than ever, moving faster at the keyboard than at any point in the history of the craft. And yet the thing that actually matters, shipping software that works and keeps working, has not gotten proportionally easier.

For a lot of teams, it quietly got harder.

## What "vibe coding" revealed

In early 2025, Andrej Karpathy gave a name to a way of working that was already spreading: vibe coding. You describe what you want, you accept what the AI gives back, and if it looks like it works, you ship it. No close reading of the code. No real understanding of why it works. Just vibes.

It is a genuinely useful mode for a weekend prototype. The trouble starts when that prototype meets real users, real data, and real money.

The reports that arrived through 2026 were not subtle. A large share of AI-generated code, by some analyses close to half, shipped with security vulnerabilities. Duplicated code climbed. Refactoring, the unglamorous work of keeping a codebase clean and changeable, dropped sharply, because nobody understood the code well enough to safely touch it. And at production scale, database design produced by a model that was never thinking about scale quietly inflated cloud bills.

The pattern underneath all of it is the same. AI is very good at producing code that is almost right. Almost right is delightful in a demo and expensive in production.

## The number that tells the real story

Here is the statistic I keep coming back to. Teams that lean heavily on AI merge dramatically more pull requests, on the order of sixty percent more. And yet their delivery speed, measured honestly from idea to shipped, improves by only around ten percent.

Read that again. The code is being written far faster. The product is barely shipping faster.

Google's 2025 DORA report, the most serious long-running study of how software actually gets delivered, explained why. AI now has a positive relationship with throughput, the raw volume of work produced. But it still has a negative relationship with stability, whether what you ship stays up and stays correct. The time you save writing code does not disappear. It moves downstream, into reviewing, auditing, and verifying what the machine produced.

The report's sharpest line is the one every founder should keep somewhere visible: AI does not fix a team, it amplifies what is already there. Strong teams get faster. Struggling teams get faster at making a mess.

Which leads to the conclusion that reframes the whole conversation. The bottleneck was never the code.

## The bottleneck was always judgment

Writing code was always the most automatable part of building software. The hard parts were never the typing. They were deciding what to build, understanding the business well enough to know what actually matters, designing a system that will not buckle in its second year, and being able to look at a confident, plausible-looking solution and know whether it is correct, secure, and right for the people who will use it.

Those are judgment problems. And judgment is precisely what AI does not hand you for free.

This is why hiring is shifting in real time. The industry is moving away from screening for syntax and toward screening for reasoning. One large technical hiring platform reported that assessments for problem-solving and aptitude have surged many times over since 2024, while the classic memorize-the-algorithm interview is quietly being retired. The new question sounds more like this: here is a broken service and three AI-generated fixes, which would you ship, and what would you check before you did. There is no correct syntax answer. There is only judgment.

When code is abundant, the scarce thing is the wisdom to direct it.

## What this means if you are building something

If you are a founder, or a business with an idea you want to make real, the AI era is genuinely good news. With one large caveat.

The good news: the cost of turning an idea into working software has fallen, and it will keep falling. You should be more ambitious, not less.

The caveat: the cost of turning an idea into the wrong software has fallen just as fast. It has never been easier to spend three months and a real budget building something fast, polished, and pointed in completely the wrong direction. Speed without clarity only gets you to the wrong place sooner.

So the question worth asking has changed. It is no longer "can this person write the code." Almost anyone, and increasingly almost anything, can write the code. The question is "can this person help me figure out what is actually worth building, and then ship it in a way that holds up."

That is a question about judgment, communication, and ownership. Not typing speed.

## How I think about it

My approach is built around the part the machine cannot do for you. I start with clarity. What is the business actually trying to move. What does success look like. What can we cut. Then, and only then, the building.

I use AI heavily in that building, because refusing to would be like insisting on a hand saw at a sawmill. But I treat everything it produces as a draft to be understood, reviewed, and held to a standard, never as an answer to be pasted in and hoped over. The model is a fast, tireless junior who needs a senior in the room. I am that senior, and increasingly that is the job.

The result is the only thing a client should care about. An idea turned into something real, that works, that you actually understand, and that does not become a liability six months from now.

Clarity first. Then shipped.

## The next few years

The teams and the builders who win the next few years will not be the ones who generate the most code. That race is over, and the machines won it. The winners will be the ones who pair that new abundance with the thing it cannot replace: clear thinking about what to build, and the judgment to know when "almost right" is not good enough.

The code got cheap. Good decisions did not. That is where the real work, and the real value, now lives.

---

## Studio fields (paste these into /studio)

- **Title:** The Bottleneck Was Never the Code
- **Slug:** the-bottleneck-was-never-the-code
- **Category:** Engineering
- **Excerpt:** AI can write most of the code now, so why has shipping good software not gotten proportionally easier? What actually changed, and what it means for anyone building a product.
- **SEO meta title:** The Bottleneck Was Never the Code
- **SEO meta description:** AI writes most of the code now, yet shipping good software has not gotten easier. The real bottleneck was never code. It was judgment. Here is what changed.
- **Body:** everything from "By the end of 2025..." down to "...where the real work, and the real value, now lives." (the section above this one)
- **Cover image prompt:** An editorial, warm-premium flat lay on a paper-toned desk in soft natural light. A laptop showing faint lines of code, slightly out of focus, next to a notebook with a clean hand-drawn system diagram and a single amber highlighter. Minimal, calm, confident. Honey-amber accent against warm neutrals. No text. 16:9.
