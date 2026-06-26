import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

export default function Problem() {
  return (
    <Section containerClassName="max-w-3xl text-center">
      <Reveal>
        <h2 className="text-text-primary font-serif text-[1.75rem] leading-[1.18] font-medium tracking-tight sm:text-3xl md:text-[2.5rem]">
          Most projects don&rsquo;t fail from bad code.
          <br className="hidden sm:block" /> They fail from{' '}
          <span className="text-accent">no clear path.</span>
        </h2>
        <div className="text-text-secondary mx-auto mt-7 max-w-xl space-y-4 text-lg leading-relaxed">
          <p>
            You&rsquo;ve got the vision: maybe a deadline, maybe a half-built site and a developer
            who went quiet. What you don&rsquo;t have is someone who can take the whole thing off
            your plate and actually ship it.
          </p>
          <p className="text-text-primary">
            That&rsquo;s the part I&rsquo;m good at: turning &ldquo;I think I want this&rdquo; into
            something real that works.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
