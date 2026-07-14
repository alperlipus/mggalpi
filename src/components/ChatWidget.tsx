'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, X, Send } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const t = useTranslations('chat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    t('quickSuggestions.dealer'),
    t('quickSuggestions.products'),
    t('quickSuggestions.quote'),
  ];

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-simsek-ai', handler);
    return () => window.removeEventListener('open-simsek-ai', handler);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('greeting') }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(overrideText?: string) {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, locale }),
      });

      if (!res.ok) throw new Error('request_failed');

      const data = await res.json();
      setMessages((cur) => [...cur, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((cur) => [...cur, { role: 'assistant', content: t('errorFallback') }]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('launcherLabel')}
        className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-solar-gradient text-graphite-950 shadow-glow transition-transform hover:scale-110"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Zap size={24} fill="currentColor" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 end-6 z-40 flex h-[34rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-graphite-gradient px-5 py-4 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-volt-500 text-graphite-950">
                <Zap size={17} fill="currentColor" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono text-sm font-semibold tracking-tight">{t('title')}</p>
                <p className="truncate text-xs text-graphite-300">{t('subtitle')}</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-mist-50 px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ms-auto rounded-ee-sm bg-graphite-950 text-white'
                      : 'me-auto rounded-ss-sm bg-white text-mist-900 shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-volt-600/40 bg-volt-100 px-3.5 py-2 text-xs font-semibold text-graphite-900 transition-colors hover:bg-volt-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {loading && (
                <div className="me-auto flex max-w-[85%] items-center gap-1 rounded-2xl rounded-ss-sm bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-mist-500"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-mist-900/10 bg-white p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={t('placeholder')}
                  className="max-h-24 flex-1 resize-none rounded-xl border border-mist-900/15 bg-mist-50 px-3 py-2.5 text-sm outline-none focus:border-volt-500"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  aria-label={t('send')}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950 transition-opacity disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-mist-500">{t('poweredBy')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
