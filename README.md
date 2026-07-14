# Şimşek Grup — Kurumsal Web Sitesi

Next.js 14 (App Router) tabanlı, tek sayfa (one-page scroll) kurumsal site.
Şimşek Grup holding kimliği altında dört şirket: **Şimşek Solar**, **Lipus**,
**Şimşek Yenilenebilir**, **SMK Alüminyum**. Üç dil (TR/EN/AR, RTL dahil),
marka paleti (lacivert `#202c5a` + altın `#f6bc32`) ve Josefin Sans ile.

## Çalıştırma

```bash
npm install
npm run dev
```

http://localhost:3000 → `/tr`'ye yönlenir.

`npm run build` ile `npm run dev`'i aynı `.next/` üzerinde aynı anda
çalıştırmayın — dev sunucusunu durdurup `.next/` silerek yeniden başlatın.

## Şimşek.ai — bilgi bankasından beslenen asistan

Chat artık düz bir chatbot değil: **`knowledge/` klasöründeki dosyalardan
beslenen, yalnızca oradaki bilgiye dayanarak yanıt veren** bir RAG asistanı.

- Kılavuz/katalog eklemek için: PDF'i metne çevirip `knowledge/` içine
  `.md` veya `.txt` olarak bırakın. Sunucu yeniden başlatmaya gerek yok;
  dosya değişiklikleri otomatik algılanır.
- Asistan kural gereği: kaynaklarda olmayanı uydurmaz, kaynak dosya adını
  köşeli parantezle belirtir, fiyat vermez, bilmediğinde telefona yönlendirir.
- Retrieval: `src/lib/knowledge.ts` (başlık bazlı parçalama + Türkçe
  farkındalıklı sözcük eşleme). API: `src/app/api/chat/route.ts`.
- Claude yanıtları için `.env.local` içine `ANTHROPIC_API_KEY=sk-ant-...`
  ekleyin; anahtar yokken arayüz zarif bir yedek mesaj gösterir.

## Ana sayfa (one-page) bölümleri

`#top` hero → `#grup` Tek Vizyon Dört Kuvvet → `#anatomi` SolidWorks montaj
animasyonu → `#urunler` ürünler (Akıllı Sistemler dahil) → neden/sertifikalar →
`#referanslar` → `#iletisim` form. Sağ kenarda bölüm nokta navigasyonu (xl+).

- Montaj animasyonu `public/anatomy/stage-1..5.jpeg` gerçek SolidWorks
  render'larını scroll ile aşama aşama geçirir (`AnatomySection.tsx`).
  Daha akıcı animasyon için aynı kamera açısından 20-30 karelik bir dizi
  render alınırsa scroll-scrub video hissine yükseltilebilir.
- Logolar `public/brand/` altında. **Eksik:** Şimşek Yenilenebilir ve SMK
  Alüminyum logo dosyaları (şu an ikon + tipografi ile temsil ediliyor).

## Yapı

- `src/messages/{tr,en,ar}.json` — tüm metinler.
- `src/data/products.ts` — Orion/Aquarious/Helios + Akıllı Sistemler
  (ŞimşekTrack, Akıllı Kontrolör). `/automation` kaldırıldı → `/products`'a
  yönlenir.
- Ayrık sayfalar korunur: `/products(+detay)`, `/resources`, `/projects`,
  `/about`, `/dealers`, `/contact` (menü sadeleştirildi; footer'dan erişilir).

## Bilinen eksikler / sizden beklenenler

- Şimşek Yenilenebilir + SMK Alüminyum logoları (PNG, tercihen şeffaf).
- Gerçek kılavuz/katalog içerikleri (`knowledge/` için) — mevcut dosyalar
  başlangıç içeriğidir, `kurulum-ve-bakim.md` yer tutucudur.
- Ürün fotoğrafları ve teknik föy PDF'leri (kaynak merkezi şu an yer tutucu).
- Form gönderimleri istemci tarafında simüle edilir; e-posta/CRM bağlantısı
  yayına almadan önce eklenmelidir.
