import { useTranslations } from 'next-intl';
import { Sun, Droplets, Layers, Cpu } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductShelf } from '@/components/ProductShelf';
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

/* Aile başına raf vurgu rengi — mevcut Tailwind paletinden. */
const familyAccent: Record<string, string> = {
  kolektorler: '#f6bc32', // volt-500
  boylerler: '#02b7d4', // aqua-500
  sehpalar: '#2da8ff', // spark-500
  otomasyon: '#3a4d97', // graphite-500
};

export function ProductFamilies() {
  const t = useTranslations('catalog');
  const families = t.raw('families') as CatalogFamily[];

  return (
    <div className="space-y-20">
      {families.map((family) => {
        const Icon = familyIcon[family.id] ?? Sun;
        const accent = familyAccent[family.id] ?? '#f6bc32';
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
              const shelfItems = group.items.map((item, ii) => ({
                name: item.name,
                note: item.note,
                isNew: item.new,
                image: images[ii] ?? null,
              }));
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
                  <Reveal delay={0.05} className={group.title ? 'mt-5 block' : 'block'}>
                    <ProductShelf
                      items={shelfItems}
                      accent={accent}
                      fallbackIcon={<Icon size={56} strokeWidth={1.25} className="text-white/25" />}
                      groupLabel={group.title ?? family.title}
                      detailSoonLabel={t('detailSoon')}
                      newLabel={t('newBadge')}
                    />
                  </Reveal>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
