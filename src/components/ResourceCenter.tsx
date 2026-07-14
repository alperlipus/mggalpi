'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { products, getProductDocuments, type ProductDocument } from '@/data/products';
import { DocRow } from '@/components/DocRow';

type DocType = ProductDocument['type'] | 'catalog';

const filterTypes: (DocType | 'all')[] = [
  'all',
  'catalog',
  'datasheet',
  'manual',
  'certificate',
  'drawing',
  'cad',
];

interface Row {
  id: string;
  label: string;
  type: DocType;
  format: string;
}

export function ResourceCenter() {
  const t = useTranslations('resources');
  const tProducts = useTranslations('products');
  const [active, setActive] = useState<DocType | 'all'>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const generalDocs = t.raw('generalDocs') as { name: string; type: string }[];

  const generalRows: Row[] = generalDocs.map((d, i) => ({
    id: `general-${i}`,
    label: d.name,
    type: d.type as DocType,
    format: 'PDF',
  }));

  const productGroups = useMemo(
    () =>
      products.map((p) => ({
        product: p,
        rows: getProductDocuments(p.slug).map<Row>((d) => ({
          id: d.id,
          label: `${tProducts(`items.${p.slug}.name`)} — ${t(`filters.${d.type}`)} (${d.format})`,
          type: d.type,
          format: d.format,
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function toggle(id: string) {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function filterRows(rows: Row[]) {
    return active === 'all' ? rows : rows.filter((r) => r.type === active);
  }

  const filteredGeneral = filterRows(generalRows);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filterTypes.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === f ? 'bg-graphite-950 text-white' : 'bg-mist-100 text-graphite-950 hover:bg-mist-200'
              }`}
            >
              {f === 'all' ? t('filters.all') : t(`filters.${f}`)}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={selected.size === 0}
          className="inline-flex items-center gap-2 rounded-full bg-volt-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-opacity disabled:opacity-40"
        >
          <Download size={15} />
          {t('downloadSelected')} {selected.size > 0 && `(${selected.size})`}
        </button>
      </div>

      {filteredGeneral.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-graphite-950">{t('generalDocsTitle')}</h2>
          <div className="mt-4 divide-y divide-mist-900/8 overflow-hidden rounded-2xl border border-mist-900/8 bg-white">
            {filteredGeneral.map((row) => (
              <DocRow key={row.id} row={row} checked={selected.has(row.id)} onToggle={() => toggle(row.id)} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="font-display text-lg font-bold text-graphite-950">{t('productDocsTitle')}</h2>
        <div className="mt-4 space-y-6">
          {productGroups.map(({ product, rows }) => {
            const filtered = filterRows(rows);
            if (filtered.length === 0) return null;
            return (
              <div key={product.slug} className="overflow-hidden rounded-2xl border border-mist-900/8 bg-white">
                <div className="flex items-center justify-between bg-mist-50 px-5 py-3">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-graphite-600">
                    {product.model}
                  </p>
                  <p className="text-sm font-semibold text-graphite-950">{tProducts(`items.${product.slug}.name`)}</p>
                </div>
                <div className="divide-y divide-mist-900/8">
                  {filtered.map((row) => (
                    <DocRow key={row.id} row={row} checked={selected.has(row.id)} onToggle={() => toggle(row.id)} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
