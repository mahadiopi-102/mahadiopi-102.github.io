'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { MailIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DUR, EASE_OUT, stagger, reveal, ONCE } from '@/lib/motion';
import { SITE } from '@/content/site';
import { WhatsAppIcon, InstagramIcon } from '@/components/BrandIcons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Literal port of the reference's circular arrow button, repeated three
 * times instead of once. The reference has exactly one (a generic "get in
 * touch" arrow); Opi asked specifically that WhatsApp and Instagram read as
 * equally easy to find as email, not a favoured channel with the other two
 * needing a hover or a hunt -- so each circle carries its own icon and a
 * small caption underneath, identifiable without interaction.
 */
function ChannelButton({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group flex flex-col items-center gap-3"
    >
      <span className="glow-breathe flex size-16 items-center justify-center rounded-full border border-amber/30 bg-amber-dim text-ink-2 transition-colors duration-fast group-hover:border-amber/70 group-hover:text-amber">
        {icon}
      </span>
      <span className="font-mono text-label uppercase tracking-wide text-ink-3 transition-colors duration-fast group-hover:text-ink-2">
        {label}
      </span>
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

  /* Shared field styling. Taller and rounder than the previous inputs, with
     label sizing lifted toward heading scale — in the reference the field
     labels read almost as large as body copy, which is what stops the card
     feeling like a dense form. */
  const field =
    'w-full rounded-xl border border-line/50 bg-surface/50 backdrop-blur-md px-5 py-4 text-body text-ink shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 focus:border-amber/70 focus:bg-surface focus:shadow-[0_0_24px_var(--amber-glow-1-hover),inset_0_2px_8px_rgba(0,0,0,0.1)]';
  const label = 'text-lead font-medium text-ink';

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1160px] scroll-mt-28 overflow-hidden border-t border-line px-6 pt-24 pb-24 md:pb-0"
    >
      {/* Ambient wash pushed to the left, behind the portrait. The reference
          turns its whole CTA background blue here; this stays amber, since a
          per-section colour flip is the one thing the project's theme lock
          rules out. */}
      <span
        aria-hidden
        className="section-ambient"
        style={{ '--ambient-x': '22%', '--ambient-y': '68%' } as React.CSSProperties}
      />

      {/* Centered, single column, generous vertical space -- the reference
          reads as spacious rather than dense, which the old two-column
          form-card layout wasn't. */}
      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center py-8 text-center">
        <Reveal>
          {SITE.availableForWork && (
            <p className="glow-breathe mb-8 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber-dim px-3.5 py-1.5 font-mono text-label uppercase text-ink-2">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
              </span>
              Available for work
            </p>
          )}
          {/* Literal port of the reference's weight treatment: light, not
              bold. A deliberate, isolated exception to the site's bold-lock
              -- Opi pointed at this exact image twice, so the thin display
              weight is the point here, not a generic heading. */}
          <h2 className="text-[clamp(2.6rem,5.8vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em]">
            <span className="block text-ink">Tell me</span>
            <span className="relative flex items-center justify-center gap-5 text-ink-4 sm:whitespace-nowrap">
              <span
                aria-hidden
                className="hidden h-px w-10 shrink-0 bg-line sm:block md:w-16"
              />
              what you publish.
              <span
                aria-hidden
                className="hidden h-px w-10 shrink-0 bg-line sm:block md:w-16"
              />
            </span>
          </h2>
        </Reveal>

        {/* Three equally-weighted channels rather than the reference's one
            arrow button -- Opi asked specifically that WhatsApp and
            Instagram be just as easy to find as email, not a favoured
            channel with the others requiring a hover or a hunt. */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={ONCE}
          className="mt-10 flex items-center justify-center gap-8"
        >
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<MailIcon className="size-5" strokeWidth={1.5} />}
              label="Email"
              href={`mailto:${SITE.email}`}
            />
          </motion.div>
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<WhatsAppIcon className="size-5" />}
              label="WhatsApp"
              href={SITE.whatsapp}
            />
          </motion.div>
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<InstagramIcon className="size-5" />}
              label="Instagram"
              href={SITE.instagram}
            />
          </motion.div>
        </motion.div>

        <Reveal className="mt-10 max-w-[42ch]">
          <p className="text-lead text-ink-2">
            You talk to me directly. No handoffs, no account managers.
          </p>
        </Reveal>

        <div className="my-10 flex w-full items-center gap-4 text-label text-ink-4">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono uppercase tracking-wide">
            Or send the details
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <motion.form
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={ONCE}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-2xl border border-line bg-surface/70 p-6 text-left shadow-panel backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" type="text" required className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input id="email" name="email" type="email" required className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={label}>
              What do you publish, and how often?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className={`${field} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 w-fit rounded-xl bg-amber px-8 py-4 text-body font-semibold tracking-wide text-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_var(--amber-glow-1-hover)] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="text-small text-amber"
            >
              Sent. I reply within a day.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="text-small text-destructive"
            >
              Something went wrong. Email me directly at{' '}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
              .
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
