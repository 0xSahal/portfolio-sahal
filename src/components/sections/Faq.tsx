import { Plus } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faq';

export default function Faq() {
  return (
    <Section containerClassName="max-w-3xl">
      <SectionHeading
        align="center"
        eyebrow="FAQ"
        title="Questions, answered."
        className="mx-auto"
      />

      <div className="divide-border border-border mt-12 divide-y border-y">
        {faqs.map((faq) => (
          <details key={faq.id} className="group">
            <summary className="text-text-primary hover:text-accent flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-medium transition-colors [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="border-border text-text-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 group-open:rotate-45">
                <Plus size={15} />
              </span>
            </summary>
            <p className="text-text-secondary pb-5 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
