'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

/*
 * Self-designed premium isometric collector model (no raster renders).
 * Fine-line technical-illustration style: tinted glass with sheen, gold copper
 * harp tubes, rockwool hatching, metallic anodized frame, floating fasteners.
 *
 * Isometric axes: r = (0.866, 0.5) — width, l = (-0.866, 0.5) — depth.
 */
const RX = 268;
const RY = 154.7;
const LX = -170;
const LY = 98.1;

function top(y: number) {
  return `M0,${y} L${RX},${y + RY} L${RX + LX},${y + RY + LY} L${LX},${y + LY} Z`;
}
function right(y: number, t: number) {
  return `M${RX},${y + RY} L${RX + LX},${y + RY + LY} L${RX + LX},${y + RY + LY + t} L${RX},${y + RY + t} Z`;
}
function left(y: number, t: number) {
  return `M${LX},${y + LY} L${RX + LX},${y + RY + LY} L${RX + LX},${y + RY + LY + t} L${LX},${y + LY + t} Z`;
}
/* Inset top face (margin m along both axes). */
function topInset(y: number, m: number) {
  const rx = RX * (1 - (2 * m));
  const ry = RY * (1 - (2 * m));
  const sx = RX * m + LX * m;
  const sy = RY * m + LY * m;
  const lx = LX * (1 - (2 * m));
  const ly = LY * (1 - (2 * m));
  return `M${sx},${y + sy} l${rx},${ry} l${lx},${ly} l${-rx},${-ry} Z`;
}

/* Assembled y-offsets and explode deltas per layer. */
const L = {
  screws: { y: -6, d: -196 },
  glass: { y: 0, t: 8, d: -132 },
  absorber: { y: 15, t: 6, d: -48 },
  insulation: { y: 27, t: 24, d: 46 },
  frame: { y: 56, t: 26, d: 138 },
};

const STROKE = '#2a3a76';
const HAIR = 1.1;

export function CollectorModel({
  explode,
  className,
}: {
  /** 0 = assembled, 1 = fully exploded */
  explode: MotionValue<number>;
  className?: string;
}) {
  const yScrews = useTransform(explode, [0, 1], [0, L.screws.d]);
  const yGlass = useTransform(explode, [0, 1], [0, L.glass.d]);
  const yAbsorber = useTransform(explode, [0, 1], [0, L.absorber.d]);
  const yInsulation = useTransform(explode, [0, 1], [0, L.insulation.d]);
  const yFrame = useTransform(explode, [0, 1], [0, L.frame.d]);
  const screwOpacity = useTransform(explode, [0, 0.25, 0.5], [0, 0, 1]);
  const shadowScale = useTransform(explode, [0, 1], [1, 1.22]);
  const shadowOpacity = useTransform(explode, [0, 1], [0.35, 0.18]);

  return (
    <svg viewBox="0 0 700 700" className={className} role="img" aria-label="ORION-500">
      <defs>
        <linearGradient id="cm-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbe7f7" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#b9cdea" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8fa9d4" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="cm-glass-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c5d6ee" stopOpacity="0.8" />
          <stop offset="1" stopColor="#93abd2" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cm-absorber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22305f" />
          <stop offset="0.55" stopColor="#141d3d" />
          <stop offset="1" stopColor="#0d1329" />
        </linearGradient>
        <linearGradient id="cm-absorber-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1329" />
          <stop offset="1" stopColor="#070b18" />
        </linearGradient>
        <linearGradient id="cm-insul" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2eeda" />
          <stop offset="1" stopColor="#ddd5b8" />
        </linearGradient>
        <linearGradient id="cm-frame-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef1f7" />
          <stop offset="0.5" stopColor="#cfd6e3" />
          <stop offset="1" stopColor="#aeb8ca" />
        </linearGradient>
        <linearGradient id="cm-frame-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b7c1d2" />
          <stop offset="1" stopColor="#8b98ad" />
        </linearGradient>
        <linearGradient id="cm-sheen" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <pattern id="cm-wool" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#b3a87e" strokeWidth="0.9" opacity="0.55" />
        </pattern>
      </defs>

      <g transform="translate(330 210)">
        {/* Ground shadow */}
        <motion.ellipse
          cx={(RX + LX) / 2}
          cy={L.frame.y + RY + LY + 90}
          rx="235"
          ry="42"
          fill="#0d1329"
          style={{ opacity: shadowOpacity, scale: shadowScale }}
        />

        {/* 04 — anodized aluminum frame */}
        <motion.g style={{ y: yFrame }}>
          <path d={top(L.frame.y)} fill="url(#cm-frame-top)" stroke={STROKE} strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={topInset(L.frame.y + 3, 0.045)} fill="#e6eaf2" stroke={STROKE} strokeWidth="0.8" opacity="0.9" />
          <path d={right(L.frame.y, L.frame.t)} fill="url(#cm-frame-side)" stroke={STROKE} strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={left(L.frame.y, L.frame.t)} fill="url(#cm-frame-side)" stroke={STROKE} strokeWidth={HAIR} strokeLinejoin="round" opacity="0.92" />
          {/* extrusion grooves on visible sides */}
          {[0.35, 0.62].map((f) => (
            <g key={f} opacity="0.5">
              <line x1={RX} y1={L.frame.y + RY + L.frame.t * f} x2={RX + LX} y2={L.frame.y + RY + LY + L.frame.t * f} stroke="#5f6c85" strokeWidth="0.9" />
              <line x1={LX} y1={L.frame.y + LY + L.frame.t * f} x2={RX + LX} y2={L.frame.y + RY + LY + L.frame.t * f} stroke="#5f6c85" strokeWidth="0.9" />
            </g>
          ))}
          {/* drain ports */}
          <circle cx={RX * 0.5 + 6} cy={L.frame.y + RY * 0.5 + L.frame.t + 14} r="2.4" fill="#6f7a99" opacity="0.7" />
        </motion.g>

        {/* 03 — rockwool insulation */}
        <motion.g style={{ y: yInsulation }}>
          <path d={top(L.insulation.y)} fill="url(#cm-insul)" stroke="#a99e74" strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={top(L.insulation.y)} fill="url(#cm-wool)" />
          <path d={right(L.insulation.y, L.insulation.t)} fill="#d6cca9" stroke="#a99e74" strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={right(L.insulation.y, L.insulation.t)} fill="url(#cm-wool)" />
          <path d={left(L.insulation.y, L.insulation.t)} fill="#cfc49e" stroke="#a99e74" strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={left(L.insulation.y, L.insulation.t)} fill="url(#cm-wool)" />
        </motion.g>

        {/* 02 — selective absorber with copper harp */}
        <motion.g style={{ y: yAbsorber }}>
          <path d={top(L.absorber.y)} fill="url(#cm-absorber)" stroke="#0a0f22" strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={right(L.absorber.y, L.absorber.t)} fill="url(#cm-absorber-side)" stroke="#0a0f22" strokeWidth={HAIR} />
          <path d={left(L.absorber.y, L.absorber.t)} fill="url(#cm-absorber-side)" stroke="#0a0f22" strokeWidth={HAIR} />
          {/* riser tubes */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => {
            const f = i / 8;
            return (
              <line
                key={i}
                x1={f * RX + LX * 0.06}
                y1={L.absorber.y + f * RY + LY * 0.06}
                x2={f * RX + LX * 0.94}
                y2={L.absorber.y + f * RY + LY * 0.94}
                stroke="#f6bc32"
                strokeWidth="1.7"
                opacity="0.9"
              />
            );
          })}
          {/* header manifolds (copper, thicker with highlight) */}
          {[0.06, 0.94].map((m) => (
            <g key={m}>
              <line
                x1={LX * m + RX * 0.03}
                y1={L.absorber.y + LY * m + RY * 0.03}
                x2={LX * m + RX * 0.97}
                y2={L.absorber.y + LY * m + RY * 0.97}
                stroke="#c98a1b"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1={LX * m + RX * 0.03}
                y1={L.absorber.y + LY * m + RY * 0.03 - 1}
                x2={LX * m + RX * 0.97}
                y2={L.absorber.y + LY * m + RY * 0.97 - 1}
                stroke="#f8ca5c"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          ))}
          {/* pipe stubs */}
          <circle cx={RX * 0.97 + LX * 0.06 + 8} cy={L.absorber.y + RY * 0.97 + LY * 0.06 + 4} r="4.2" fill="#c98a1b" stroke="#8a5e10" strokeWidth="1" />
          <circle cx={LX * 0.94 + RX * 0.03 - 8} cy={L.absorber.y + LY * 0.94 + RY * 0.03 - 4} r="4.2" fill="#c98a1b" stroke="#8a5e10" strokeWidth="1" />
        </motion.g>

        {/* 01 — low-iron tempered glass */}
        <motion.g style={{ y: yGlass }}>
          <path d={top(L.glass.y)} fill="url(#cm-glass)" stroke="#7f97bd" strokeWidth={HAIR} strokeLinejoin="round" />
          <path d={right(L.glass.y, L.glass.t)} fill="url(#cm-glass-side)" stroke="#7f97bd" strokeWidth={HAIR} />
          <path d={left(L.glass.y, L.glass.t)} fill="url(#cm-glass-side)" stroke="#7f97bd" strokeWidth={HAIR} opacity="0.9" />
          {/* edge highlight */}
          <path d={top(L.glass.y)} fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          {/* diagonal sheen band */}
          <path
            d={`M${RX * 0.18},${L.glass.y + RY * 0.18 + LY * 0.1} l${RX * 0.16},${RY * 0.16} l${LX * 0.8},${LY * 0.8} l${-RX * 0.16},${-RY * 0.16} Z`}
            fill="url(#cm-sheen)"
            opacity="0.8"
          />
        </motion.g>

        {/* 00 — fasteners, only visible while exploded */}
        <motion.g style={{ y: yScrews, opacity: screwOpacity }}>
          {[
            [0.12, 0.12],
            [0.88, 0.12],
            [0.12, 0.88],
            [0.88, 0.88],
          ].map(([a, b], i) => {
            const x = a * RX + b * LX;
            const y = L.screws.y + a * RY + b * LY;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5.5" fill="#cfd6e3" stroke={STROKE} strokeWidth="1" />
                <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={STROKE} strokeWidth="1" />
                <line x1={x} y1={y + 14} x2={x} y2={y + 30} stroke="#9aa4c0" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
              </g>
            );
          })}
        </motion.g>
      </g>
    </svg>
  );
}
