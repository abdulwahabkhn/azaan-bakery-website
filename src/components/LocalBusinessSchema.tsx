import { Helmet } from '@dr.pogodin/react-helmet';

import { siteConfig } from '@/data/siteConfig';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: siteConfig.name,
    alternateName: siteConfig.seoName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.logo}`,
    telephone: siteConfig.phoneTel,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    sameAs: [siteConfig.instagram, siteConfig.facebook],
    servesCuisine: ['Bakery', 'Cakes', 'Fast Food', 'Pizza', 'Desserts'],
    priceRange: 'Rs',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '01:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Jaranwala',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
