import { getTranslations } from 'next-intl/server';
import { Calculator } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CALC_EMBED_URL } from '@/data/config';

export default async function CalculatorPage() {
  const t = await getTranslations('calculator');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-white">
        <div className="container-page">
          {CALC_EMBED_URL ? (
            <div className="overflow-hidden rounded-2xl border border-mist-900/10 shadow-card">
              <iframe
                src={CALC_EMBED_URL}
                title={t('title')}
                className="h-[80vh] min-h-[560px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-mist-900/20 bg-mist-50 px-8 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                <Calculator size={26} strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-graphite-950">{t('soonTitle')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-700">{t('soonBody')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
