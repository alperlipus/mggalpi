import { useTranslations } from 'next-intl';
import { Sun, Droplets, Package as PackageIcon, Cpu, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/data/products';

const categoryIcon = {
  collector: Sun,
  boiler: Droplets,
  package: PackageIcon,
  smart: Cpu,
};

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('products');
  const Icon = categoryIcon[product.category];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-mist-900/8 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient}`}>
        <div className="absolute inset-0 bg-blueprint opacity-30" aria-hidden />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
        <Icon size={56} strokeWidth={1.25} className="relative text-white/90" />
        <span className="absolute end-4 top-4 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {t(`categoryLabels.${product.category}`)}
        </span>
        <span className="absolute bottom-3 start-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
          {product.model}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-700">{product.model}</p>
        <h3 className="mt-1.5 font-display text-lg font-bold text-graphite-950">
          {t(`items.${product.slug}.name`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mist-700">{t(`items.${product.slug}.tagline`)}</p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-600">
          {t('viewDetails')}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
