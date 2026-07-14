'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CountUp({
  value,
  suffix = '',
  locale = 'tr-TR',
  className,
}: {
  value: number;
  suffix?: string;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toLocaleString(locale) + suffix;
      return;
    }
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString(locale) + suffix;
      }
    });
  }, [spring, locale, suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value.toLocaleString(locale) + suffix : '0' + suffix}
    </span>
  );
}
