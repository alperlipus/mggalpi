import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: { items: { name: string }[] }[];
}

const familyIcon: Record<string, typeof Sun> = {
  kolektorler: Sun,
  boylerler: Droplets,
  sehpalar: Layers,
  otomasyon: Cpu,
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
            const Icon = familyIcon[family.id] ?? Sun;
            const count = family.groups.reduce((sum, g) => sum + g.items.length, 0);
            return (
              <Reveal key={family.id} delay={i * 0.08}>
                <Link
                  href={`/products#${family.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-7 transition-all hover:-translate-y-1 hover:border-volt-500/40 hover:bg-white hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <Icon size={21} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-graphite-950">{family.title}</h3>
                  <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500">
                    {count} {tCatalog('seriesLabel')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist-700">{family.desc}</p>
                  <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-600">
                    {t('viewAll')}
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
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
