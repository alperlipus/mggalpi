'use client';

import { FileText, FileCode2, Box, Download, CheckSquare, Square } from 'lucide-react';

export interface DocRowData {
  id: string;
  label: string;
  format: string;
}

function formatIcon(format: string) {
  if (format === 'DWG' || format === 'DXF') return FileCode2;
  if (format === 'STEP') return Box;
  return FileText;
}

export function DocRow({
  row,
  checked,
  onToggle,
  compact = false,
}: {
  row: DocRowData;
  checked: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  const Icon = formatIcon(row.format);
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-mist-50">
      <button type="button" onClick={onToggle} className="text-graphite-400 hover:text-volt-600" aria-label="select">
        {checked ? <CheckSquare size={18} className="text-volt-600" /> : <Square size={18} />}
      </button>
      <Icon size={17} className="shrink-0 text-graphite-400" />
      <span className={`flex-1 truncate ${compact ? 'text-sm' : 'text-sm font-medium'} text-graphite-900`}>
        {row.label}
      </span>
      <span className="rounded-md bg-mist-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-graphite-600">
        {row.format}
      </span>
      <button type="button" className="text-graphite-400 hover:text-volt-600" aria-label="download">
        <Download size={16} />
      </button>
    </div>
  );
}
