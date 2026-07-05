import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';

export default function Problem() {
  return (
    <RailSection
      index="02"
      label="The problem"
      title={
        <>
          Most projects don&rsquo;t fail from bad code. They fail from{' '}
          <span className="text-accent">no clear path.</span>
        </>
      }
    >
      <Reveal delay={0.08}>
        <div className="text-text-secondary mt-8 max-w-xl space-y-4 text-lg leading-relaxed">
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
    </RailSection>
  );
}
