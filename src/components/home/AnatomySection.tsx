'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CollectorModel } from './CollectorModel';

/* Explode → hold → reassemble, mirroring the reference camera animation. */
const EXPLODE_MAP: [number[], number[]] = [
  [0.12, 0.48, 0.72, 0.95],
  [0, 1, 1, 0],
];

/* BOM rows light up as their part separates; row 05 at full explode. */
const ROW_WINDOWS: [number, number][] = [
  [0.14, 0.2],
  [0.22, 0.28],
  [0.3, 0.36],
  [0.38, 0.44],
  [0.46, 0.52],
];

export function AnatomySection() {
  const t = useTranslations('anatomy');
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const layers = t.raw('layers') as { no: string; name: string; spec: string }[];
  const tb = t.raw('titleBlock') as Record<string, string>;

  const explodeScroll = useTransform(scrollYProgress, EXPLODE_MAP[0], EXPLODE_MAP[1]);
  const explodeStatic = useMotionValue(1);
  const explode = reduce ? explodeStatic : explodeScroll;

  const r0 = useTransform(scrollYProgress, ROW_WINDOWS[0], [0.35, 1]);
  const r1 = useTransform(scrollYProgress, ROW_WINDOWS[1], [0.35, 1]);
  const r2 = useTransform(scrollYProgress, ROW_WINDOWS[2], [0.35, 1]);
  const r3 = useTransform(scrollYProgress, ROW_WINDOWS[3], [0.35, 1]);
  const r4 = useTransform(scrollYProgress, ROW_WINDOWS[4], [0.35, 1]);
  const rows = [r0, r1, r2, r3, r4];

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="anatomi" ref={sectionRef} className="relative h-[300vh] bg-graphite-900">
      <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-20 sm:items-center sm:pt-0">
        <div className="container-page w-full py-2 sm:py-8">
          {/* Drawing sheet */}
          <div className="relative border border-white/15 bg-graphite-900">
            <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-60" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{ backgroundImage: 'radial-gradient(60% 60% at 72% 30%, rgba(246,188,50,0.12), transparent 70%)' }}
              aria-hidden
            />
            {(['top-2 start-2', 'top-2 end-2', 'bottom-2 start-2', 'bottom-2 end-2'] as const).map((pos) => (
              <span key={pos} className={`absolute ${pos} font-mono text-xs leading-none text-volt-500/70`} aria-hidden>
                +
              </span>
            ))}

            <div className="relative grid gap-5 px-5 py-6 sm:gap-8 sm:px-10 sm:py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
              {/* BOM column */}
              <div>
                <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
                  <span className="h-px w-8 bg-volt-500" aria-hidden />
                  {t('eyebrow')}
                </p>
                <h2 className="mt-3 max-w-md text-balance font-display text-2xl font-bold tracking-tight text-white sm:mt-4 sm:text-4xl">
                  {t('title')}
                </h2>
                <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-graphite-300 sm:mt-4 sm:block sm:text-base">
                  {t('body')}
                </p>

                <ul className="mt-5 space-y-0 border-t border-white/10 sm:mt-8">
                  {layers.map((layer, i) => (
                    <motion.li
                      key={layer.no}
                      style={{ opacity: reduce ? 1 : rows[i] }}
                      className="flex items-baseline gap-4 border-b border-white/10 py-2 sm:py-2.5"
                    >
                      <span className="font-mono text-xs font-bold text-volt-400">{layer.no}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">{layer.name}</span>
                        <span className="mt-0.5 block font-mono text-[11px] tracking-wide text-graphite-300/80">
                          {layer.spec}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Digital twin viewer */}
              <div className="relative overflow-hidden rounded-xl bg-white shadow-card">
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-graphite-700/10 bg-mist-100/90 px-4 py-2.5">
                  <span className="flex items-center gap-1.5" aria-hidden>
                    <i className="h-2.5 w-2.5 rounded-full bg-mist-300" />
                    <i className="h-2.5 w-2.5 rounded-full bg-volt-400" />
                    <i className="h-2.5 w-2.5 rounded-full bg-graphite-300" />
                  </span>
                  <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-graphite-600">
                    ORION-500 · {t('viewerLabel')}
                  </span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500 sm:block">
                    ISO 30°
                  </span>
                </div>

                <div
                  className="relative aspect-[10/9] w-full sm:aspect-[7/6]"
                  style={{ background: 'radial-gradient(85% 85% at 50% 32%, #ffffff 0%, #eef1f8 78%, #e4e9f4 100%)' }}
                >
                  {(['top-2 start-2', 'top-2 end-2', 'bottom-2 start-2', 'bottom-2 end-2'] as const).map((pos) => (
                    <span key={pos} className={`absolute ${pos} z-10 font-mono text-[10px] leading-none text-volt-600/70`} aria-hidden>
                      +
                    </span>
                  ))}

                  <CollectorModel explode={explode} className="absolute inset-0 h-full w-full" />

                  {/* Progress rail */}
                  <div className="absolute inset-x-4 bottom-3 z-10 h-1 overflow-hidden rounded-full bg-graphite-700/15">
                    <motion.div
                      style={{ scaleX: reduce ? 1 : scrollYProgress }}
                      className="h-full w-full origin-left bg-volt-500 rtl:origin-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering title block */}
            <div className="relative hidden border-t border-white/15 font-mono md:grid md:grid-cols-6" aria-hidden>
              {[tb.model, tb.scale, tb.dims, tb.code, tb.rev, tb.sheet].map((cell, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.16em] ${
                    i > 0 ? 'border-s border-white/15' : ''
                  } ${i === 0 ? 'font-bold text-volt-400' : 'text-graphite-300'}`}
                >
                  {cell}
                </div>
              ))}
            </div>
            <div className="relative flex justify-between border-t border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] md:hidden" aria-hidden>
              <span className="font-bold text-volt-400">{tb.model}</span>
              <span className="text-graphite-300">{tb.dims}</span>
            </div>
          </div>

          <motion.p
            style={{ opacity: reduce ? 0 : hintOpacity }}
            className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-graphite-300/70"
          >
            <ChevronDown size={12} className="animate-bounce" />
            {t('hint')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
