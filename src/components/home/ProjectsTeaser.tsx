import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import { Reveal } from '@/components/Reveal';

export function ProjectsTeaser() {
  const t = useTranslations('projectsTeaser');
  const tProjects = useTranslations('projects');
  const featured = projects.slice(0, 3);

  return (
    <section id="referanslar" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-lg text-mist-700">{t('subtitle')}</p>
            </div>
            <Link
              href="/projects"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              {t('cta')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <Link
                href="/projects"
                className={`group relative flex h-80 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-7 text-white transition-transform hover:-translate-y-1`}
              >
                <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, white, transparent 55%)' }} />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <MapPin size={12} />
                    {project.location}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {tProjects(`items.${project.slug}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">{project.metric} · {project.year}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
