'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Hotel,
  Factory,
  Users,
  Activity,
  ArrowLeft,
  ArrowUpRight,
  RotateCcw,
  Package,
  Cpu,
  Sun,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

type Segment = 'home' | 'commercial' | 'industrial';
type Size = 's' | 'm' | 'l';

interface Option {
  id: string;
  title: string;
  desc: string;
}

const segmentIcons = { home: Home, commercial: Hotel, industrial: Factory } as const;

/* Recommendation matrix: household small/medium → Helios 200L, large → 300L,
   everything commercial/industrial → engineered central system. */
function recommend(segment: Segment, size: Size): { slug: string | null; key: string } {
  if (segment === 'home') {
    if (size === 'l') return { slug: 'helios-300l', key: 'helios-300l' };
    return { slug: 'helios-200l', key: 'helios-200l' };
  }
  return { slug: null, key: 'central' };
}

export function SystemWizard() {
  const t = useTranslations('wizard');
  const tProducts = useTranslations('products');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [smart, setSmart] = useState<boolean | null>(null);

  const step = segment === null ? 0 : size === null ? 1 : smart === null ? 2 : 3;

  const segments = t.raw('segments') as Record<Segment, Option>;
  const sizes = segment ? (t.raw(`sizes.${segment}`) as Option[]) : [];
  const smartOptions = t.raw('smartOptions') as Record<'yes' | 'no', Option>;

  function reset() {
    setSegment(null);
    setSize(null);
    setSmart(null);
  }

  function back() {
    if (smart !== null) setSmart(null);
    else if (size !== null) setSize(null);
    else setSegment(null);
  }

  const rec = segment && size ? recommend(segment, size) : null;

  return (
    <section id="sihirbaz" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
            <span className="h-px w-8 bg-volt-500" aria-hidden />
            {t('eyebrow')}
            <span className="h-px w-8 bg-volt-500" aria-hidden />
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-graphite-700 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-balance text-mist-600">{t('body')}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Step indicator */}
          <div className="mb-6 flex items-center justify-center gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step > i ? 'w-8 bg-volt-500' : step === i ? 'w-8 bg-graphite-700' : 'w-4 bg-graphite-700/20'
                }`}
              />
            ))}
          </div>

          <div className="relative rounded-3xl border border-graphite-700/10 bg-white p-6 shadow-card sm:p-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <WizardStep key="segment" title={t('steps.segment')}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {(Object.keys(segments) as Segment[]).map((key) => {
                      const Icon = segmentIcons[key];
                      return (
                        <OptionCard
                          key={key}
                          icon={<Icon size={26} strokeWidth={1.6} />}
                          title={segments[key].title}
                          desc={segments[key].desc}
                          onClick={() => setSegment(key)}
                        />
                      );
                    })}
                  </div>
                </WizardStep>
              )}

              {step === 1 && segment && (
                <WizardStep key="size" title={t('steps.size')}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {sizes.map((opt) => (
                      <OptionCard
                        key={opt.id}
                        icon={<Users size={26} strokeWidth={1.6} />}
                        title={opt.title}
                        desc={opt.desc}
                        onClick={() => setSize(opt.id as Size)}
                      />
                    ))}
                  </div>
                </WizardStep>
              )}

              {step === 2 && (
                <WizardStep key="smart" title={t('steps.smart')}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <OptionCard
                      icon={<Activity size={26} strokeWidth={1.6} />}
                      title={smartOptions.yes.title}
                      desc={smartOptions.yes.desc}
                      onClick={() => setSmart(true)}
                    />
                    <OptionCard
                      icon={<Sun size={26} strokeWidth={1.6} />}
                      title={smartOptions.no.title}
                      desc={smartOptions.no.desc}
                      onClick={() => setSmart(false)}
                    />
                  </div>
                </WizardStep>
              )}

              {step === 3 && rec && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-700">
                    {t('resultEyebrow')}
                  </p>
                  <div className="mt-5 rounded-2xl bg-graphite-gradient p-7 text-white sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-400">
                          {rec.slug
                            ? (tProducts(`items.${rec.slug}.name`) as string)
                            : t('centralTitle')}
                        </p>
                        <h3 className="mt-2 max-w-md font-display text-2xl font-bold sm:text-3xl">
                          {rec.slug ? tProducts(`items.${rec.slug}.tagline`) : t('centralModel')}
                        </h3>
                      </div>
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <Package size={26} strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite-200">
                      {t(`results.${rec.key}`)}
                    </p>

                    {smart && (
                      <div className="mt-5 flex items-center gap-3 rounded-xl border border-volt-500/40 bg-volt-500/10 px-4 py-3">
                        <Cpu size={18} className="shrink-0 text-volt-400" />
                        <p className="text-sm">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-400">
                            {t('addonLabel')}:
                          </span>{' '}
                          {tProducts('items.simsek-track.name')}
                        </p>
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href="/#iletisim"
                        className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                      >
                        {t('resultCta')}
                        <ArrowUpRight size={15} />
                      </Link>
                      {rec.slug && (
                        <Link
                          href={`/products/${rec.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          {t('resultDetail')}
                          <ArrowUpRight size={15} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist-600 transition-colors hover:text-graphite-700"
                >
                  <ArrowLeft size={15} className="rtl:rotate-180" />
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist-600 transition-colors hover:text-graphite-700"
                >
                  <RotateCcw size={14} />
                  {t('restart')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WizardStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-center font-display text-xl font-bold text-graphite-700 sm:text-2xl">{title}</h3>
      <div className="mt-7">{children}</div>
    </motion.div>
  );
}

function OptionCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center rounded-2xl border border-graphite-700/12 bg-mist-50 px-5 py-7 text-center transition-all hover:-translate-y-1 hover:border-volt-500 hover:bg-white hover:shadow-card"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-900">
        {icon}
      </span>
      <span className="mt-4 font-display text-base font-bold text-graphite-700">{title}</span>
      <span className="mt-1 text-xs text-mist-500">{desc}</span>
    </button>
  );
}
