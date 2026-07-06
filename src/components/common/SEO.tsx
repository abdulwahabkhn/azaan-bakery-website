import { Helmet } from '@dr.pogodin/react-helmet';

import { defaultSeo } from '@/constants/seo';
import { env } from '@/config/env';

import type { SeoPage } from '@/constants/seo';

export interface SEOProps {
  page: SeoPage;
  structuredData?: Record<string, unknown>;
}

export const SEO = ({ page, structuredData }: SEOProps) => {
  const canonicalUrl = `${env.appUrl}${page.path}`;

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={defaultSeo.siteName} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${env.appUrl}${defaultSeo.image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Helmet>
  );
};
