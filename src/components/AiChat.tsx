'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, Send, Sparkles, Store, Package, FileText, RotateCcw } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* Boş ekranda gösterilen başlangıç önerileri (şimdilik Türkçe). */
const starterPrompts = [
  { icon: Package, title: 'Ürün önerisi', prompt: '4 kişilik bir aile için hangi paket sistemi önerirsiniz?' },
  { icon: Store, title: 'Bayilik', prompt: 'Bayi olmak istiyorum, süreç nasıl işliyor?' },
  { icon: FileText, title: 'Teknik bilgi', prompt: 'Orion kolektörlerin selektif kaplaması ne avantaj sağlıyor?' },
  { icon: Sparkles, title: 'Proje teklifi', prompt: '100 dairelik bir site için merkezi sistem teklifi almak istiyorum.' },
];

export function AiChat() {
  const t = useTranslations('chat');
  const locale = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      inputRef.current?.focus();
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-graphite-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-20" aria-hidden />

      {/* Mesaj akışı */}
      <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
        <div className="container-page mx-auto max-w-3xl py-10">
          {empty ? (
            <div className="flex flex-col items-center pt-14 text-center sm:pt-24">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-solar-gradient text-graphite-950 shadow-glow">
                <Zap size={30} fill="currentColor" />
              </span>
              <h1 className="mt-7 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                şimşek<span className="text-volt-500">.ai</span>
              </h1>
              <p className="mt-3 max-w-md text-balance text-sm leading-relaxed text-graphite-300">
                {t('subtitle')}. Ürünler, projelendirme, bayilik ve teknik konularda sorularınızı yanıtlar.
              </p>

              <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
                {starterPrompts.map((s) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => sendMessage(s.prompt)}
                    className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-start backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-volt-500/50 hover:bg-white/[0.08]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <s.icon size={18} strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-400">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-graphite-200">{s.prompt}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3.5 ${m.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {m.role === 'assistant' && (
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-solar-gradient text-graphite-950">
                        <Zap size={14} fill="currentColor" />
                      </span>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4.5 py-3 text-sm leading-relaxed sm:max-w-[75%] sm:px-5 ${
                        m.role === 'user'
                          ? 'rounded-ee-md bg-volt-500 text-graphite-950'
                          : 'rounded-ss-md border border-white/10 bg-white/[0.06] text-graphite-100 backdrop-blur-sm'
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-solar-gradient text-graphite-950">
                    <Zap size={14} fill="currentColor" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-ss-md border border-white/10 bg-white/[0.06] px-5 py-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-volt-400"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Giriş alanı */}
      <div className="relative border-t border-white/10 bg-graphite-950/80 backdrop-blur-md">
        <div className="container-page mx-auto max-w-3xl py-4">
          <div className="flex items-end gap-2.5 rounded-2xl border border-white/15 bg-white/[0.05] p-2.5 transition-colors focus-within:border-volt-500/60">
            <textarea
              ref={inputRef}
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
              className="max-h-32 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-white outline-none placeholder:text-graphite-400"
            />
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                aria-label="Yeni sohbet"
                title="Yeni sohbet"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-graphite-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label={t('send')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-solar-gradient text-graphite-950 shadow-glow transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-graphite-500">
            {t('poweredBy')}
          </p>
        </div>
      </div>
    </div>
  );
}
