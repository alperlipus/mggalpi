import { getTranslations } from 'next-intl/server';
import { Calculator, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ResourceCenter } from '@/components/ResourceCenter';
import { CALC_EMBED_URL } from '@/data/config';

export default async function ResourcesPage() {
  const t = await getTranslations('resources.hero');
  const tCalc = await getTranslations('calculator');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      {/* Hesaplama aracı — kaynakların en başında */}
      {CALC_EMBED_URL && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                  <span className="h-px w-8 bg-volt-500" aria-hidden />
                  {tCalc('eyebrow')}
                </p>
                <h2 className="mt-3 flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-graphite-950 sm:text-3xl">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <Calculator size={20} strokeWidth={1.75} />
                  </span>
                  {tCalc('title')}
                </h2>
                <p className="mt-3 max-w-lg text-mist-700">{tCalc('subtitle')}</p>
              </div>
              <a
                href={CALC_EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-graphite-700 hover:text-volt-700"
              >
                {tCalc('openFull')}
                <ArrowUpRight size={15} className="rtl:-scale-x-100" />
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-mist-900/10 shadow-card">
              <iframe
                src={CALC_EMBED_URL}
                title={tCalc('title')}
                className="h-[70vh] min-h-[520px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <ResourceCenter />
        </div>
      </section>
    </>
  );
}
