'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import { Reveal } from '@/components/Reveal';

const LeafletProjectsMap = dynamic(
  () => import('./LeafletProjectsMap').then((m) => m.LeafletProjectsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[420px] w-full animate-pulse rounded-2xl bg-mist-100" aria-hidden />
    ),
  }
);

export function ReferencesMapSection() {
  const t = useTranslations('projectsMap');
  const tTeaser = useTranslations('projectsTeaser');
  const tProjects = useTranslations('projects');

  return (
    <section id="referanslar" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {tTeaser('eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-lg text-mist-700">{t('subtitle')}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {/* Featured references — quiet, editorial list */}
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col">
              <ul className="divide-y divide-mist-900/10 border-y border-mist-900/10">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href="/projects"
                      className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:bg-white"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                          {tProjects(`items.${project.slug}.title`)}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-xs text-mist-600">
                          <MapPin size={11} className="shrink-0" />
                          {project.location} · {project.metric}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-mist-500">{project.year}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/projects"
                className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-graphite-950 transition-colors hover:text-volt-700"
              >
                {tTeaser('cta')}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>

              <div className="mt-auto flex flex-wrap gap-2.5 pt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-600">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white px-3 py-1.5">
                  <i className="h-2 w-2 rounded-full bg-graphite-950" aria-hidden />
                  {t('legend.factory')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white px-3 py-1.5">
                  <i className="h-2 w-2 rounded-full bg-volt-500" aria-hidden />
                  {t('legend.project')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white px-3 py-1.5">
                  <i className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  {t('legend.export')}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Map — light, blends with the page */}
          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-mist-900/10 bg-white shadow-card">
              <LeafletProjectsMap />
              <span className="pointer-events-none absolute bottom-3 start-3 z-[500] rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-600 shadow-sm backdrop-blur-sm">
                {t('note')}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
