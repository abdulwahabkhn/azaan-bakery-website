export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  occasion: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 'sana-anniversary',
    quote:
      'The mango three milk cake felt tailored for our table. It was soft, balanced, and quietly beautiful.',
    author: 'Sana R.',
    occasion: 'Anniversary dinner',
  },
  {
    id: 'hamza-wedding',
    quote:
      'Azaan Bakery handled our wedding cake with the discipline of a design studio and the warmth of family.',
    author: 'Hamza A.',
    occasion: 'Wedding reception',
  },
  {
    id: 'maryam-corporate',
    quote:
      'Every box arrived immaculate. The flavors were polished without feeling heavy or overly sweet.',
    author: 'Maryam K.',
    occasion: 'Corporate gifting',
  },
] as const;
