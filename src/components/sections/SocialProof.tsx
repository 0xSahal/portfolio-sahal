import { Fragment } from 'react';
import Container from '@/components/ui/Container';

const proofPoints = [
  'Trusted by founders & teams worldwide',
  'Years shipping production products',
  'Hear from some of them below',
];

export default function SocialProof() {
  return (
    <div className="border-border bg-bg-secondary/50 border-y">
      <Container className="text-text-secondary flex flex-col items-center justify-center gap-3 py-4 text-center text-sm sm:flex-row sm:gap-7">
        {proofPoints.map((point, i) => (
          <Fragment key={point}>
            {i > 0 && (
              <span
                aria-hidden
                className="bg-text-muted hidden h-1 w-1 shrink-0 rounded-full sm:inline-block"
              />
            )}
            <span>{point}</span>
          </Fragment>
        ))}
      </Container>
    </div>
  );
}
