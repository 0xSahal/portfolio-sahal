import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import AwardsGallery from '@/components/features/AwardsGallery';
import { experience, education } from '@/data/experience';

function monogram(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Trajectory() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-t">
      <SectionHeading
        eyebrow="The path here"
        title="Intern to Head of Engineering, fast."
        intro="A short, steep climb: from writing my first client components to owning product engineering end to end."
      />

      <div className="mx-auto mt-16 max-w-3xl">
        <ol className="relative">
          {experience.map((company, i) => {
            const isLast = i === experience.length - 1;
            return (
              <li key={company.id} className="relative">
                <Reveal delay={i * 0.06}>
                  <div className="relative flex gap-6 pb-16 last:pb-0">
                    {/* spine connecting employers */}
                    {!isLast && (
                      <span
                        aria-hidden
                        className="bg-border absolute top-[4.5rem] bottom-0 left-[27px] w-px sm:left-[31px]"
                      />
                    )}

                    {/* logo / monogram node — kept on a light chip in both themes so
                        colored brand logos stay legible (some have dark text) */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`rounded-card border-border flex h-14 w-14 items-center justify-center overflow-hidden border shadow-sm sm:h-16 sm:w-16 ${
                          company.logo ? 'bg-white' : 'bg-surface'
                        }`}
                      >
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={`${company.company} logo`}
                            width={64}
                            height={64}
                            unoptimized
                            className="h-full w-full object-contain p-1.5"
                          />
                        ) : (
                          <span className="text-accent font-serif text-xl font-semibold">
                            {monogram(company.company)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex-1">
                      {/* company header — height-matched to the logo chip so the
                          name sits visually centered against it, not top-aligned */}
                      <div className="flex min-h-14 flex-col justify-center sm:min-h-16">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-text-primary font-serif text-xl font-medium">
                            {company.companyUrl ? (
                              <a
                                href={company.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-underline"
                              >
                                {company.company}
                              </a>
                            ) : (
                              company.company
                            )}
                          </h3>
                          {company.location && (
                            <span className="text-text-muted text-sm">{company.location}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 space-y-9">
                        {company.roles.map((role) => (
                          <div key={role.title} className="border-border/70 border-l-2 pl-6">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="text-text-primary font-medium">{role.title}</h4>
                              {role.isCurrent && (
                                <span className="rounded-pill bg-accent-soft text-accent px-2.5 py-0.5 text-xs font-medium">
                                  Now
                                </span>
                              )}
                            </div>
                            <p className="text-text-muted mt-1 text-sm">{role.period}</p>
                            <p className="text-text-secondary mt-3 leading-relaxed">
                              {role.description}
                            </p>
                            {role.highlights && (
                              <ul className="mt-4 space-y-2">
                                {role.highlights.map((h) => (
                                  <li
                                    key={h}
                                    className="text-text-secondary flex gap-2.5 text-sm leading-relaxed"
                                  >
                                    <span
                                      className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                                      aria-hidden
                                    />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {role.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-pill border-border text-text-muted border px-2.5 py-0.5 text-xs"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {company.awards && (
                        <div className="mt-9">
                          <p className="text-text-muted text-xs font-medium tracking-[0.14em] uppercase">
                            Recognition
                          </p>
                          <AwardsGallery awards={company.awards} />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* education footer */}
        <Reveal delay={0.1}>
          <div className="border-border text-text-secondary mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-8 text-sm">
            <span className="text-text-primary font-medium">{education.school}</span>
            <span className="text-text-muted">·</span>
            <span>{education.degree}</span>
            <span className="text-text-muted sm:ml-auto">{education.period}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
