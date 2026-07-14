import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { retrieve } from '@/lib/knowledge';

export const runtime = 'nodejs';

const LANGUAGE_RULE: Record<string, string> = {
  tr: 'Cevaplarını Türkçe ver.',
  en: 'Reply in English.',
  ar: 'أجب بالعربية الفصحى.',
};

function buildSystemPrompt(locale: string, context: string): string {
  const langRule = LANGUAGE_RULE[locale] ?? LANGUAGE_RULE.tr;
  return `Sen Şimşek.ai'sın — Şimşek Grup'un web sitesindeki, şirketin kendi bilgi bankasından beslenen akıllı asistan. Şimşek Grup; Şimşek Solar (güneş enerjisi), Lipus (enerji depolama), Şimşek Yenilenebilir (yenilenebilir enerji) ve SMK Alüminyum (alüminyum profil) şirketlerinden oluşur.

KURALLAR:
1. YALNIZCA aşağıdaki KAYNAKLAR bölümündeki bilgilere dayanarak yanıt ver. Kaynaklarda olmayan bir bilgiyi ASLA uydurma.
2. Sorunun cevabı kaynaklarda yoksa bunu açıkça söyle: bilgi bankasında bu konu henüz yok; +90 324 324 12 35 numarasını veya iletişim formunu öner.
3. Fiyat bilgisi verme; teklif için iletişim formunu veya WhatsApp hattını öner.
4. Kısa, samimi ve teknik olarak doğru yaz; en fazla 4-5 cümle. Teknik değer verirken kaynaklardaki sayıları birebir kullan.
5. Yanıtın sonunda kullandığın kaynağı köşeli parantezle belirt, örn. [urunler.md].
6. ${langRule}

KAYNAKLAR:
${context || '(Bilgi bankası boş — kullanıcıya bilgi bankasının henüz yüklenmediğini söyle ve iletişim kanallarını öner.)'}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = (await req.json()) as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      locale: string;
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'no_api_key' }, { status: 503 });
    }

    // Retrieve knowledge grounded on the latest user message (plus a bit of history).
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
    const prevUser = messages.filter((m) => m.role === 'user').slice(-2, -1)[0]?.content ?? '';
    const chunks = retrieve(`${prevUser} ${lastUser}`.trim(), 6);

    const context = chunks
      .map((c) => `--- Kaynak: ${c.source} — ${c.heading} ---\n${c.text}`)
      .join('\n\n');

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      system: buildSystemPrompt(locale, context),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({ reply: text, sources: chunks.map((c) => c.source) });
  } catch (err) {
    console.error('chat api error', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
