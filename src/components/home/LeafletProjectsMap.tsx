'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, CircleMarker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useTranslations } from 'next-intl';
import {
  specialLocations,
  projectProvinces,
  type ProvinceAggregate,
  type LocationType,
} from '@/data/locations';

const typeColor: Record<LocationType, string> = {
  factory: '#141a2b',
  export: '#10b981',
};

function pinIcon(type: LocationType) {
  const color = typeColor[type];
  const size = type === 'factory' ? 16 : 12;
  return divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="
      display:block;width:${size}px;height:${size}px;border-radius:9999px;
      background:${color};border:2px solid #ffffff;
      box-shadow:0 1px 4px rgba(20,26,43,0.35);
    "></span>`,
  });
}

/* Circle radius grows gently with project count (min 4, max ~18). */
function radiusFor(projects: number) {
  return Math.min(18, 4 + Math.sqrt(projects) * 1.6);
}

export function LeafletProjectsMap() {
  const t = useTranslations('projectsMap');
  const provinces = projectProvinces as ProvinceAggregate[];

  return (
    <MapContainer
      center={[39, 35]}
      zoom={5.4}
      zoomSnap={0.2}
      minZoom={2}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      className="z-0 h-full min-h-[420px] w-full"
      style={{ background: '#f4f6fb' }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

      {provinces.map((p) => (
        <CircleMarker
          key={p.il}
          center={[p.lat, p.lng]}
          radius={radiusFor(p.projects)}
          pathOptions={{
            color: '#d99b1a',
            weight: 1,
            fillColor: '#f6bc32',
            fillOpacity: 0.45,
          }}
        >
          <Tooltip direction="top" offset={[0, -4]}>
            <span style={{ fontWeight: 700 }}>{p.il}</span>
            {' — '}
            {p.projects} {t('tooltip.projects')}
            {p.homes > 0 ? ` · ${p.homes.toLocaleString('tr-TR')} ${t('tooltip.homes')}` : ''}
          </Tooltip>
        </CircleMarker>
      ))}

      {specialLocations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={pinIcon(loc.type)}>
          <Tooltip direction="top" offset={[0, -8]}>
            <span style={{ fontWeight: 700 }}>{loc.name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
