import { getTranslations } from 'next-intl/server';
import { Factory, ShieldCheck, Globe2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const valueIcons = [ShieldCheck, Factory, Globe2];

export default async function AboutPage() {
  const t = await getTranslations('about');
  const stats = t.raw('stats') as { value: string; label: string }[];
  const values = t.raw('values.items') as { title: string; desc: string }[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-graphite-950">
              {t('story.title')}
            </h2>
            <p className="mt-6 text-balance leading-relaxed text-mist-700">{t('story.body1')}</p>
            <p className="mt-4 text-balance leading-relaxed text-mist-700">{t('story.body2')}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-mist-900/8 bg-mist-50 p-6">
                  <p className="font-display text-3xl font-bold text-graphite-950">{s.value}</p>
                  <p className="mt-2 text-sm text-mist-700">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-mist-900 text-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-lg text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('values.title')}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((item, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="grid items-center gap-12 rounded-3xl bg-white p-10 shadow-sm lg:grid-cols-2 lg:p-14">
              <div>
                <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                  {t('facility.title')}
                </h2>
                <p className="mt-5 leading-relaxed text-mist-700">{t('facility.body')}</p>
              </div>
              <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-graphite-700 via-graphite-900 to-graphite-950 lg:h-72">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white, transparent 55%)' }} />
                <Factory size={80} strokeWidth={1} className="absolute bottom-6 end-6 text-white/30" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
