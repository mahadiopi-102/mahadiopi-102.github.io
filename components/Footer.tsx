import { SITE } from '@/content/site';
import { NAV_LINKS } from '@/content/nav';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">

      {/* ── Existing footer links ── */}
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-small text-ink-3">
            Opi<span className="text-amber">.</span>recut
          </p>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-small text-ink-4 transition-colors duration-fast hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-small text-ink-4">
            &copy; {new Date().getFullYear()} Mahadi Hasan Opi &middot;{' '}
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

