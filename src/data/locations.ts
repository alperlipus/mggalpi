export type LocationType = 'factory' | 'export';

export interface SpecialLocation {
  id: string;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
}

export const specialLocations: SpecialLocation[] = [
  { id: 'mersin-fabrika', name: 'Şimşek Solar — Mersin 2. OSB', type: 'factory', lat: 36.9152, lng: 34.773 },
  { id: 'kahire', name: 'Mısır — Kahire', type: 'export', lat: 30.0444, lng: 31.2357 },
  { id: 'mogadisu', name: 'Somali — Mogadişu', type: 'export', lat: 2.0469, lng: 45.3182 },
];

export interface ProvinceAggregate {
  il: string;
  lat: number;
  lng: number;
  projects: number;
  homes: number;
}

/* Generated from DÖKÜMANLAR/PROJE İSİMLERİ by scripts/generate-locations.mjs */
export { default as projectProvinces } from './projectProvinces.json';
