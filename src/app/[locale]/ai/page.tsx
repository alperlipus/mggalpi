import type { Metadata } from 'next';
import { AiChat } from '@/components/AiChat';

export const metadata: Metadata = {
  title: 'şimşek.ai — Akıllı Asistan | Şimşek Solar',
  description:
    'Ürün kılavuzları ve teknik dökümanlardan beslenen yapay zeka asistanı: ürün önerisi, projelendirme, bayilik ve teknik sorularınızı yanıtlar.',
};

export default function AiPage() {
  return <AiChat />;
}
