import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

/** Required under output: 'export' — this route has no request-time
 *  data, so it can (and must) be resolved once at build time. */
export const dynamic = 'force-static';

/** Single-page site — one URL entry is correct, not a placeholder. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
