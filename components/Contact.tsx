'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { MailIcon, ArrowUpRightIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/content/site';
import { WhatsAppIcon, InstagramIcon } from '@/components/BrandIcons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * A single reachable channel — email, WhatsApp, Instagram.
 *
 * Four hover/motion techniques below are adapted from a "book a call"
 * component the client sent as visual reference — the expanding icon
 * circle, the sliding arrow, the pulsing status dot, the split-text roll
 * on the heading, and the flanking lines that retreat on hover. None of
 * its content: that component hardcoded someone else's Cal.com link and
 * a placeholder email, neither of which belongs here.
 */
function ContactChannel({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group flex items-center gap-4 rounded-xl border border-line bg-bg-2 p-4 transition-colors duration-fast hover:border-amber/40"
    >
      <span className="relative flex size-11 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-line bg-transparent transition-all duration-base ease-out-token group-hover:scale-110 group-hover:border-amber group-hover:bg-amber" />
        <span className="relative text-ink-2 transition-colors duration-base group-hover:text-bg">
          {icon}
        </span>
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-small font-medium text-ink">{label}</span>
        <span className="block truncate text-label text-ink-4">{value}</span>
      </span>

      <ArrowUpRightIcon className="size-4 shrink-0 text-ink-4 opacity-0 transition-all duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber group-hover:opacity-100" />
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!SITE.formspreeId) {
      const data = new FormData(form);
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Project from ${data.get('name')}`,
      )}&body=${encodeURIComponent(String(data.get('message') ?? ''))}`;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <Reveal>
        <h2 className="group max-w-[24ch] text-section font-bold text-ink">
          <span className="block overflow-hidden">
            <span className="block transition-transform duration-700 ease-out-token group-hover:-translate-y-[8%]">
              Tell me what you publish.
            </span>
          </span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-lead text-ink-2">
          You talk to me directly. No handoffs, no account managers.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-small font-medium text-ink-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-md border border-line bg-bg-2 px-3.5 py-2.5 text-body text-ink outline-none transition-colors duration-fast focus:border-amber"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-small font-medium text-ink-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-md border border-line bg-bg-2 px-3.5 py-2.5 text-body text-ink outline-none transition-colors duration-fast focus:border-amber"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-small font-medium text-ink-2">
              What do you publish, and how often?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="resize-none rounded-md border border-line bg-bg-2 px-3.5 py-2.5 text-body text-ink outline-none transition-colors duration-fast focus:border-amber"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="glow-breathe mt-2 rounded-md bg-amber px-6 py-3 text-small font-medium text-bg transition-transform duration-fast hover:-translate-y-px disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p role="status" className="text-small text-amber">
              Sent — I reply within a day.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-small text-destructive">
              Something went wrong. Email me directly at{' '}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
              .
            </p>
          )}
        </form>

        <div className="glow-breathe flex flex-col justify-center gap-4 rounded-2xl border border-amber/30 bg-surface p-8">
          <div className="group flex items-center gap-3">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-amber" />
            </span>
            <span
              aria-hidden
              className="h-px w-4 shrink-0 bg-line transition-all duration-500 ease-out-token group-hover:w-0 group-hover:opacity-0"
            />
            <p className="whitespace-nowrap font-mono text-label uppercase text-ink-4">Reach me directly</p>
            <span
              aria-hidden
              className="h-px flex-1 bg-line transition-all duration-500 ease-out-token group-hover:scale-x-0"
              style={{ transformOrigin: 'right' }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <ContactChannel
              icon={<MailIcon className="size-5" strokeWidth={1.5} />}
              label="Email"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <ContactChannel
              icon={<WhatsAppIcon className="size-5" />}
              label="WhatsApp"
              value="Message me directly"
              href={SITE.whatsapp}
            />
            <ContactChannel
              icon={<InstagramIcon className="size-5" />}
              label="Instagram"
              value={SITE.instagramHandle}
              href={SITE.instagram}
            />
          </div>

          <p className="mt-1 text-small text-ink-4">Fastest reply is the form.</p>
        </div>
      </Reveal>
    </section>
  );
}
