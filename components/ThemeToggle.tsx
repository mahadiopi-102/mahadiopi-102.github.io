'use client';

import { useEffect, useState } from 'react';

/**
 * Persists to the same 'opi-theme' key the no-flash script in layout.tsx
 * reads before first paint. Toggles the .dark class directly rather than
 * going through a context — there is exactly one place in the tree that
 * needs to know the theme (this button), so a provider would be overhead
 * with nothing consuming it.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('opi-theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch theme"
      aria-pressed={!isDark}
      className="relative h-6 w-11 shrink-0 rounded-full border border-line bg-bg-2 transition-colors duration-fast"
    >
      <span
        className="absolute top-0.5 left-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[10px] transition-transform duration-fast ease-out-token"
        style={{ transform: isDark ? 'translateX(0)' : 'translateX(20px)' }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
