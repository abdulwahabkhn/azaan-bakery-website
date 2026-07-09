export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const timelineEvents: readonly TimelineEvent[] = [
  {
    year: '2016',
    title: 'A family recipe becomes a ritual',
    description:
      'The first three milk cakes were baked in small batches for close friends and weekend gatherings.',
  },
  {
    year: '2019',
    title: 'A private bakery studio opens',
    description:
      'Azaan Bakers moved into a dedicated studio built around slow baking, custom finishes, and careful packaging.',
  },
  {
    year: '2024',
    title: 'Celebration work expands',
    description:
      'Wedding, birthday, and corporate collections were refined for clients who expect precision and warmth.',
  },
] as const;

export const craftValues = [
  'Fresh dairy and balanced sweetness',
  'Small-batch finishing for texture control',
  'Tailored celebration details',
  'Gift-ready packaging and careful delivery prep',
] as const;
