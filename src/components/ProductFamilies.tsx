import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Sun, Droplets, Layers, Cpu, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { catalogImages } from '@/data/catalogImages';

interface CatalogItem {
  name: string;
  note?: string;
  new?: boolean;
}

interface CatalogGroup {
  title?: string;
  items: CatalogItem[];
}

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: CatalogGroup[];
}

const familyIcon: Record<string, typeof Sun> = {
  kolektorler: Sun,
  boylerler: Droplets,
  sehpalar: Layers,
  otomasyon: Cpu,
};

export function ProductFamilies() {
  const t = useTranslations('catalog');
  const families = t.raw('families') as CatalogFamily[];

  return (
    <div className="space-y-20">
      {families.map((family) => {
        const Icon = familyIcon[family.id] ?? Sun;
        return (
          <section key={family.id} id={family.id} className="scroll-mt-28">
            <Reveal>
              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <Icon size={27} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-5xl">
                    {family.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist-700 sm:text-base">
                    {family.desc}
                  </p>
                </div>
              </div>
            </Reveal>

            {family.groups.map((group, gi) => {
              const images = catalogImages[`${family.id}-${gi}`] ?? [];
              return (
                <div key={group.title ?? gi} className="mt-8">
                  {group.title && (
                    <Reveal>
                      <h3 className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-700">
                        <span className="h-px w-6 bg-volt-500" aria-hidden />
                        {group.title}
                      </h3>
                    </Reveal>
                  )}
                  <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${group.title ? 'mt-5' : ''}`}>
                    {group.items.map((item, ii) => {
                      const img = images[ii] ?? null;
                      return (
                        <Reveal key={`${item.name}-${ii}`} delay={Math.min(ii * 0.04, 0.3)}>
                          <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-mist-900/10 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-volt-500/40 hover:shadow-md">
                            {img && (
                              <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-mist-900/8 bg-white p-4">
                                <Image
                                  src={img}
                                  alt={item.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                                />
                              </div>
                            )}
                            <div className="flex flex-1 flex-col p-5">
                              {item.new && (
                                <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-solar-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-graphite-900">
                                  <Sparkles size={10} />
                                  {t('newBadge')}
                                </span>
                              )}
                              <h4 className="font-display text-base font-bold text-graphite-950">{item.name}</h4>
                              {item.note && (
                                <p className="mt-1.5 font-mono text-[11px] leading-relaxed tracking-wide text-mist-600">
                                  {item.note}
                                </p>
                              )}
                              <p className="mt-auto pt-3 text-xs font-medium text-mist-500">{t('detailSoon')}</p>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
