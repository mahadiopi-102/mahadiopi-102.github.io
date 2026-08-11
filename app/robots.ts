import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

/** Required under output: 'export' — this route has no request-time
 *  data, so it can (and must) be resolved once at build time. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
