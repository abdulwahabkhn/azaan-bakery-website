import type { FaqItem } from '@/types/contact';

export const faqs: readonly FaqItem[] = [
  {
    question: 'How early should I place a custom cake order?',
    answer:
      'For celebration cakes, two to three days is ideal. Wedding and large event orders should be discussed at least two weeks ahead.',
  },
  {
    question: 'Can sweetness levels be adjusted?',
    answer:
      'Yes. The studio can guide you toward lighter, classic, or richer finishes depending on the cake style.',
  },
  {
    question: 'Do you offer delivery?',
    answer:
      'Delivery availability depends on the order size, location, and finishing requirements. Fragile cakes are handled with extra care.',
  },
] as const;
