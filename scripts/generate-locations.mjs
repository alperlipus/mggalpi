/* Reads the project tracking Excel files in DÖKÜMANLAR/PROJE İSİMLERİ,
   aggregates projects per province and writes src/data/projectProvinces.json.
   Run from web/: node scripts/generate-locations.mjs */
import { createRequire } from 'module';
import { writeFileSync } from 'fs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const PROVINCES = {
  ADANA: [37.0, 35.3213], ADIYAMAN: [37.7648, 38.2786], AFYONKARAHİSAR: [38.7507, 30.5567],
  AĞRI: [39.7191, 43.0503], AKSARAY: [38.3687, 34.037], AMASYA: [40.6499, 35.8353],
  ANKARA: [39.9208, 32.8541], ANTALYA: [36.8969, 30.7133], ARDAHAN: [41.1105, 42.7022],
  ARTVİN: [41.1828, 41.8183], AYDIN: [37.856, 27.8416], BALIKESİR: [39.6484, 27.8826],
  BARTIN: [41.6344, 32.3375], BATMAN: [37.8812, 41.1351], BAYBURT: [40.2552, 40.2249],
  BİLECİK: [40.1501, 29.9831], BİNGÖL: [38.8854, 40.4966], BİTLİS: [38.4006, 42.1095],
  BOLU: [40.7392, 31.6089], BURDUR: [37.7203, 30.2908], BURSA: [40.1885, 29.061],
  ÇANAKKALE: [40.1553, 26.4142], ÇANKIRI: [40.6013, 33.6134], ÇORUM: [40.5506, 34.9556],
  DENİZLİ: [37.7765, 29.0864], DİYARBAKIR: [37.9144, 40.2306], DÜZCE: [40.8438, 31.1565],
  EDİRNE: [41.6818, 26.5623], ELAZIĞ: [38.681, 39.2264], ERZİNCAN: [39.75, 39.5],
  ERZURUM: [39.9, 41.27], ESKİŞEHİR: [39.7767, 30.5206], GAZİANTEP: [37.0662, 37.3833],
  GİRESUN: [40.9128, 38.3895], GÜMÜŞHANE: [40.4386, 39.5086], HAKKARİ: [37.5833, 43.7333],
  HATAY: [36.4018, 36.3498], IĞDIR: [39.9167, 44.0333], ISPARTA: [37.7648, 30.5566],
  İSTANBUL: [41.0082, 28.9784], İZMİR: [38.4192, 27.1287], KAHRAMANMARAŞ: [37.5858, 36.9371],
  KARABÜK: [41.2061, 32.6204], KARAMAN: [37.1759, 33.2287], KARS: [40.6013, 43.0975],
  KASTAMONU: [41.3887, 33.7827], KAYSERİ: [38.7312, 35.4787], KIRIKKALE: [39.8468, 33.5153],
  KIRKLARELİ: [41.7333, 27.2167], KIRŞEHİR: [39.1425, 34.1709], KİLİS: [36.7184, 37.1212],
  KOCAELİ: [40.8533, 29.8815], KONYA: [37.8667, 32.4833], KÜTAHYA: [39.4167, 29.9833],
  MALATYA: [38.3552, 38.3095], MANİSA: [38.6191, 27.4289], MARDİN: [37.3212, 40.7245],
  MERSİN: [36.8, 34.6333], MUĞLA: [37.2153, 28.3636], MUŞ: [38.9462, 41.7539],
  NEVŞEHİR: [38.6939, 34.6857], NİĞDE: [37.9667, 34.6833], ORDU: [40.9839, 37.8764],
  OSMANİYE: [37.213, 36.1763], RİZE: [41.0201, 40.5234], SAKARYA: [40.6940, 30.4358],
  SAMSUN: [41.2928, 36.3313], SİİRT: [37.9333, 41.95], SİNOP: [42.0231, 35.1531],
  SİVAS: [39.7477, 37.0179], ŞANLIURFA: [37.1591, 38.7969], ŞIRNAK: [37.4187, 42.4918],
  TEKİRDAĞ: [40.9833, 27.5167], TOKAT: [40.3167, 36.5500], TRABZON: [41.0015, 39.7178],
  TUNCELİ: [39.3074, 39.4388], UŞAK: [38.6823, 29.4082], VAN: [38.4891, 43.4089],
  YALOVA: [40.65, 29.2667], YOZGAT: [39.8181, 34.8147], ZONGULDAK: [41.4564, 31.7987],
};

function normalizeIl(raw) {
  if (typeof raw !== 'string') return null;
  let s = raw.trim().toLocaleUpperCase('tr-TR');
  s = s.replace(/\s+/g, ' ');
  // common variants
  if (s === 'AFYON') s = 'AFYONKARAHİSAR';
  if (s === 'MARAŞ' || s === 'K.MARAŞ') s = 'KAHRAMANMARAŞ';
  if (s === 'URFA') s = 'ŞANLIURFA';
  if (s === 'ANTEP' || s === 'G.ANTEP') s = 'GAZİANTEP';
  if (s === 'İÇEL') s = 'MERSİN';
  return PROVINCES[s] ? s : null;
}

const files = [
  'DÖKÜMANLAR/PROJE İSİMLERİ/PROJE TAKİP TAMAMLANDI.xlsx',
  'DÖKÜMANLAR/PROJE İSİMLERİ/28062026 GÜNCEL TOKİ TAKİP - Kopya.xlsx',
];

const seen = new Set();
const agg = {}; // il -> { projects, homes }
let skipped = 0;

for (const f of files) {
  const wb = XLSX.readFile(f);
  for (const name of wb.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
    const header = rows[0] ?? [];
    const ilIdx = header.findIndex((h) => typeof h === 'string' && h.trim().toLocaleUpperCase('tr-TR') === 'İL');
    const isIdx = header.findIndex((h) => typeof h === 'string' && h.trim().toLocaleUpperCase('tr-TR').startsWith('İŞ ADI'));
    const konutIdx = header.findIndex((h) => typeof h === 'string' && h.trim().toLocaleUpperCase('tr-TR').startsWith('KONUT'));
    if (ilIdx < 0) continue;
    for (const row of rows.slice(1)) {
      const il = normalizeIl(row[ilIdx]);
      if (!il) { if (row[ilIdx]) skipped++; continue; }
      const isAdi = typeof row[isIdx] === 'string' ? row[isIdx].replace(/\s+/g, ' ').trim().toLocaleUpperCase('tr-TR') : null;
      const key = isAdi ? `${il}|${isAdi}` : `${il}|${JSON.stringify(row).slice(0, 120)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const homes = typeof row[konutIdx] === 'number' ? row[konutIdx] : 0;
      agg[il] ??= { projects: 0, homes: 0 };
      agg[il].projects += 1;
      agg[il].homes += homes;
    }
  }
}

const out = Object.entries(agg)
  .map(([il, v]) => ({ il, lat: PROVINCES[il][0], lng: PROVINCES[il][1], projects: v.projects, homes: v.homes }))
  .sort((a, b) => b.projects - a.projects);

writeFileSync('src/data/projectProvinces.json', JSON.stringify(out, null, 2), 'utf8');
console.log(`İl sayısı: ${out.length}, toplam proje: ${out.reduce((s, x) => s + x.projects, 0)}, toplam konut: ${out.reduce((s, x) => s + x.homes, 0)}, atlanan satır: ${skipped}`);
console.log(out.slice(0, 10));
