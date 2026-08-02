import type { NextConfig } from 'next';

/**
 * GitHub Pages needs a fully static build: no server, no API routes, no
 * on-demand image optimization.
 *
 * basePath / assetPrefix are env-driven rather than hardcoded, because the
 * right value depends on where this lands:
 *   username.github.io/opi-site  ->  NEXT_PUBLIC_BASE_PATH=/opi-site
 *   custom domain at the root    ->  leave unset
 * Hardcoding it means remembering to delete two lines the day the domain
 * is pointed at the repo; an env var is one line in the workflow instead.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
