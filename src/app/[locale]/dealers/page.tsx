import { getTranslations } from 'next-intl/server';
import { MapPinned, GraduationCap, Megaphone } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { DealerForm } from '@/components/DealerForm';

const icons = [MapPinned, GraduationCap, Megaphone];

export default async function DealersPage() {
  const t = await getTranslations('dealers');
  const benefits = t.raw('benefits.items') as { title: string; desc: string }[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                {t('benefits.title')}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-8">
              {benefits.map((b, i) => {
                const Icon = icons[i] ?? MapPinned;
                return (
                  <Reveal key={b.title} delay={i * 0.1} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-600">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-graphite-950">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{b.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <DealerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
