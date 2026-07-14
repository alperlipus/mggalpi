import { useTranslations } from 'next-intl';
import { ShieldCheck, Award, FileCheck2, BadgeCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const icons = [ShieldCheck, Award, FileCheck2, BadgeCheck];

export function Certs() {
  const t = useTranslations('certs');
  const items = t.raw('items') as string[];

  return (
    <section className="border-y border-mist-900/8 bg-white py-16">
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
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-mist-900/10 bg-mist-50 px-4 py-3.5 transition-colors hover:border-volt-500/40 hover:bg-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-volt-100 text-volt-700">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-graphite-950">{item}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
