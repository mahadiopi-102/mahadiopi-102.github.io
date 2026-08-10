'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { XIcon, ArrowUpRightIcon } from 'lucide-react';

type LightboxContext = { open: (youtubeId: string) => void };
const Ctx = createContext<LightboxContext | null>(null);

export function useVideoLightbox() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useVideoLightbox must be used inside VideoLightboxProvider');
  return ctx;
}

/**
 * Videos play inline by default — a click used to send visitors straight to
 * a new YouTube tab, which loses them off-site for no reason. The lightbox
 * keeps them here; the "Open on YouTube" link inside it is the escape hatch
 * for anyone who wants the tab.
 */
export function VideoLightboxProvider({ children }: { children: ReactNode }) {
  const [youtubeId, setYoutubeId] = useState<string | null>(null);

  return (
    <Ctx.Provider value={{ open: setYoutubeId }}>
      {children}
      <Dialog.Root open={!!youtubeId} onOpenChange={(v) => !v && setYoutubeId(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
            <div className="relative w-full max-w-3xl transition-[transform,opacity] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
                {youtubeId && (
                  <iframe
                    key={youtubeId}
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-small text-ink-3 transition-colors duration-fast hover:text-ink"
                >
                  Open on YouTube
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
                <Dialog.Close
                  aria-label="Close"
                  className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors duration-fast hover:text-ink"
                >
                  <XIcon className="size-4" />
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
