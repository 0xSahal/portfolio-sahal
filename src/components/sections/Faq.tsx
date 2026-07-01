import { Plus } from 'lucide-react';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { faqs } from '@/data/faq';

export default function Faq() {
  return (
    <RailSection index="07" label="Questions" title="Questions, answered.">
      <Reveal delay={0.08}>
        <div className="divide-border border-border mt-10 max-w-2xl divide-y border-y md:mt-12">
          {faqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="text-text-primary hover:text-accent flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-medium transition-colors [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  size={18}
                  className="text-text-muted shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="text-text-secondary max-w-xl pb-6 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </RailSection>
  );
}
