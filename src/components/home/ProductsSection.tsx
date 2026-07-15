import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: { items: { name: string }[] }[];
}

const familyVisual: Record<string, { icon: typeof Sun; image: string }> = {
  kolektorler: { icon: Sun, image: '/products/orion-300.jpg' },
  boylerler: { icon: Droplets, image: '/products/aquarious-540.jpg' },
  sehpalar: { icon: Layers, image: '/products/sehpa-merkezi-3lu.jpg' },
  otomasyon: { icon: Cpu, image: '/products/solar-vana.jpg' },
};

export function ProductsSection() {
  const t = useTranslations('productsSection');
  const tCatalog = useTranslations('catalog');
  const families = tCatalog.raw('families') as CatalogFamily[];

  return (
    <section id="urunler" className="section-pad scroll-mt-20 bg-white">
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
              href="/products"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              {t('viewAll')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            const count = family.groups.reduce((sum, g) => sum + g.items.length, 0);
            return (
              <Reveal key={family.id} delay={i * 0.08}>
                <Link
                  href={`/products#${family.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
                >
                  {/* Ürün görseli */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist-50">
                    <Image
                      src={visual.image}
                      alt={family.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-transparent" aria-hidden />
                    <span className="absolute bottom-3 start-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-volt-700 shadow-sm backdrop-blur-sm">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>
                    <span className="absolute bottom-3 end-3 rounded-full bg-graphite-950/70 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      {count} {tCatalog('seriesLabel')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-graphite-950 transition-colors group-hover:text-volt-700">
                      {family.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist-700">{family.desc}</p>
                    <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-600">
                      {t('viewAll')}
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
