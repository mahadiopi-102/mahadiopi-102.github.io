import type { ProcessVisual } from '@/content/process';

/**
 * Small, honest CSS diagrams — ported from the vanilla build's per-step
 * illustrations. They describe the actual step rather than standing in as
 * decoration, which is why there's one per `visual` key instead of a shared
 * generic icon.
 */
export function ProcessVisualPanel({ kind }: { kind: ProcessVisual }) {
  switch (kind) {
    case 'checklist':
      return (
        <div className="flex flex-col gap-2.5">
          {['Line by line vs. script', 'Spellcheck pass', 'Fresh-eyes final watch'].map((row) => (
            <div key={row} className="flex items-center gap-2.5">
              <span className="flex size-4 items-center justify-center rounded-[4px] border border-amber bg-amber-dim text-[10px] text-amber">
                ✓
              </span>
              <span className="text-small text-ink-2">{row}</span>
            </div>
          ))}
        </div>
      );
    case 'file-tree':
      return (
        <div className="w-full min-w-0 font-mono text-label text-ink-2">
          <p className="truncate">Client_042/</p>
          <p className="truncate pl-4">├─ drafts/</p>
          <p className="truncate pl-8 text-ink-4">Client_042_v1.mp4</p>
          <p className="truncate pl-4">└─ final/</p>
          <p className="truncate pl-8 text-amber">Client_042_v3_FINAL.mp4</p>
        </div>
      );
    case 'branches':
      return (
        <div className="flex w-full min-w-0 items-center gap-3">
          <div className="flex h-16 w-2 shrink-0 flex-col justify-between rounded-full bg-line">
            <span className="block h-2 w-2 rounded-full bg-amber" />
            <span className="block h-2 w-2 rounded-full bg-amber" />
            <span className="block h-2 w-2 rounded-full bg-amber" />
          </div>
          <div className="flex min-w-0 flex-col gap-2 text-label text-ink-2">
            <span className="truncate">Hook A — curiosity</span>
            <span className="truncate">Hook B — bold claim</span>
            <span className="truncate">Hook C — pattern break</span>
          </div>
        </div>
      );
    case 'frames':
      return (
        <div className="flex items-end gap-3">
          <div className="h-20 w-[45px] rounded-md border border-amber bg-amber-dim" title="9:16" />
          <div className="h-14 w-14 rounded-md border border-line bg-bg-2" title="1:1" />
          <div className="h-[70px] w-14 rounded-md border border-line bg-bg-2" title="4:5" />
        </div>
      );
    case 'comment':
      return (
        <div className="rounded-lg border border-line bg-bg-2 p-3">
          <p className="font-mono text-label text-amber">00:14</p>
          <p className="mt-1 text-small text-ink-2">&ldquo;Trim two frames off this cut.&rdquo;</p>
        </div>
      );
    case 'ai-table':
      return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-2 text-label">
          <p className="truncate font-mono uppercase text-ink-4">Used</p>
          <p className="truncate font-mono uppercase text-ink-4">Skipped</p>
          <p className="truncate text-ink-2">Captions, cleanup</p>
          <p className="truncate text-ink-4">Your face or voice</p>
          <p className="truncate text-ink-2">Upscaling</p>
          <p className="truncate text-ink-4">Real results</p>
        </div>
      );
  }
}
