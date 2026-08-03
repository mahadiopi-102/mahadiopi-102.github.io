'use client';

import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_LINKS } from '@/content/nav';
import { SITE } from '@/content/site';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div
        className={`mx-auto flex h-14 w-full max-w-[1160px] items-center justify-between rounded-full border px-4 transition-colors duration-base sm:px-6 ${
          scrolled
            ? 'border-line bg-surface/90 shadow-panel backdrop-blur-md'
            : 'border-line/60 bg-surface/55 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="font-mono text-small font-medium text-ink">
          Opi<span className="text-amber">.</span>recut
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-small text-ink-3 transition-all duration-fast hover:-translate-y-px hover:scale-[1.07] hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="hover-magnetic glow-breathe rounded-md bg-amber px-4 py-2 text-small font-medium text-bg"
          >
            Message me
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="size-11"
            >
              <MenuIcon />
            </Button>
            <SheetContent side="right" className="w-4/5 bg-surface px-2">
              <SheetHeader>
                <SheetTitle className="font-mono text-small text-ink">
                  Opi<span className="text-amber">.</span>recut
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        className="border-b border-line py-3 text-lead text-ink-2"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <SheetClose
                  render={
                    <a
                      href="#contact"
                      className="rounded-md bg-amber px-4 py-3 text-center text-small font-medium text-bg"
                    />
                  }
                >
                  Message me
                </SheetClose>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-center text-small text-ink-3"
                >
                  {SITE.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
