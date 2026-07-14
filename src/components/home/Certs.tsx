import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function Certs() {
  const t = useTranslations('certs');
  const items = t.raw('items') as string[];

  return (
    <section className="border-y border-mist-900/8 bg-white py-14">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('eyebrow')}
              <span className="h-px w-8 bg-volt-500" aria-hidden />
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-graphite-950 sm:text-3xl">{t('title')}</h2>
            <p className="mt-3 text-sm text-mist-700">{t('subtitle')}</p>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <div className="flex items-center gap-2 rounded-full border border-mist-900/10 bg-mist-50 px-5 py-2.5 text-sm font-semibold text-graphite-950">
                <ShieldCheck size={16} className="text-volt-600" />
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
