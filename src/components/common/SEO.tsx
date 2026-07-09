import { Helmet } from '@dr.pogodin/react-helmet';

import { siteConfig } from '@/data/siteConfig';

type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
};

export function SEO({
  title = `${siteConfig.seoName} | Cakes, Bakery Items & Fast Food`,
  description = siteConfig.description,
  canonicalPath = '/',
  image = '/social-preview.jpg',
}: SEOProps) {
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteConfig.keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteConfig.url}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteConfig.url}${image}`} />
    </Helmet>
  );
}
