import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

export function ProductionSection() {
  const t = useTranslations('production');
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <section id="uretim" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-mist-700">{t('body')}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                  <p className="font-tabular font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-mist-600">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
