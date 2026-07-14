'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('done'), 900);
  }

  return (
    <div className="relative rounded-2xl border border-mist-900/8 bg-white p-8 shadow-sm sm:p-10">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <CheckCircle2 size={44} className="text-volt-600" />
            <p className="mt-5 max-w-sm text-balance text-mist-800">{t('success')}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <h2 className="font-display text-xl font-bold text-graphite-950 sm:col-span-2">{t('title')}</h2>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{t('name')}</span>
              <input
                name="name"
                type="text"
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-950">{t('phone')}</span>
              <input
                name="phone"
                type="tel"
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('email')}</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('subject')}</span>
              <input
                name="subject"
                type="text"
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-graphite-950">{t('message')}</span>
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-xl border border-mist-900/15 bg-mist-50 px-4 py-3 text-sm outline-none focus:border-volt-500"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-graphite-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 sm:col-span-2"
            >
              {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {t('submit')}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
