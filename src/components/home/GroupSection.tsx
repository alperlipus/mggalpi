'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sun, BatteryCharging, Wind, Layers } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface Company {
  id: string;
  name: string;
  tag: string;
  desc: string;
}

const companyVisual: Record<string, { logo?: string; icon: typeof Sun; accent: string }> = {
  solar: { logo: '/brand/simsek-solar.png', icon: Sun, accent: 'bg-volt-100 text-volt-700' },
  lipus: { logo: '/brand/lipus.png', icon: BatteryCharging, accent: 'bg-emerald-50 text-emerald-600' },
  yenilenebilir: { icon: Wind, accent: 'bg-sky-50 text-sky-600' },
  smk: { icon: Layers, accent: 'bg-mist-100 text-mist-600' },
};

export function GroupSection() {
  const t = useTranslations('group');
  const companies = t.raw('companies') as Company[];

  return (
    <section id="grup" className="section-pad relative overflow-hidden bg-white scroll-mt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-graphite-700/20 to-transparent" aria-hidden />
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('eyebrow')}
              <span className="h-px w-8 bg-volt-500" aria-hidden />
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-graphite-700 sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-5 text-balance leading-relaxed text-mist-600">{t('body')}</p>
          </div>
        </Reveal>

        {/* Parent company */}
        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-col items-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              {t('parentLabel')}
            </span>
            <div className="mt-3 rounded-2xl border border-graphite-700/10 bg-mist-50 px-12 py-6 shadow-card">
              <Image
                src="/brand/simsek-grup.png"
                alt="Şimşek Grup"
                width={1000}
                height={1000}
                className="h-32 w-auto object-contain sm:h-40"
              />
            </div>
          </div>
        </Reveal>

        {/* Holding → subsidiaries connector */}
        <Reveal delay={0.1}>
          <div className="hidden justify-center lg:flex" aria-hidden>
            <svg viewBox="0 0 1000 70" className="h-16 w-full max-w-5xl text-graphite-700/25">
              <line x1="500" y1="0" x2="500" y2="28" stroke="currentColor" strokeWidth="1.5" />
              <line x1="125" y1="28" x2="875" y2="28" stroke="currentColor" strokeWidth="1.5" />
              {[125, 375, 625, 875].map((x) => (
                <line key={x} x1={x} y1="28" x2={x} y2="70" stroke="currentColor" strokeWidth="1.5" />
              ))}
              <circle cx="500" cy="0" r="3.5" fill="#f6bc32" />
            </svg>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
          {companies.map((c, i) => {
            const visual = companyVisual[c.id] ?? companyVisual.smk;
            const Icon = visual.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col rounded-2xl border border-graphite-700/10 bg-mist-50 p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-volt-500/50 hover:bg-white"
              >
                <div className="flex h-14 items-center">
                  {visual.logo ? (
                    <Image
                      src={visual.logo}
                      alt={c.name}
                      width={400}
                      height={120}
                      className="h-10 w-auto object-contain object-left rtl:object-right"
                    />
                  ) : (
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${visual.accent}`}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-graphite-700">{c.name}</h3>
                <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                  {c.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-600">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
