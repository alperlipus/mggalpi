import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { projects } from '@/data/projects';

export default async function ProjectsPage() {
  const t = await getTranslations('projects');

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <div
                className={`group relative flex h-80 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-7 text-white`}
              >
                <div
                  className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-40"
                  style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, white, transparent 55%)' }}
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <MapPin size={12} />
                    {project.location}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">{t(`items.${project.slug}.title`)}</h3>
                  <p className="mt-2 text-sm text-white/80">{project.metric} · {project.year}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    {t(`items.${project.slug}.description`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
