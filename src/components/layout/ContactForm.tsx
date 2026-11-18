"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: ContactState = {
  status: "idle",
  message: "",
  value: "",
  note: "",
};

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const error = state.status === "error";

  return (
    <form
      action={action}
      noValidate
      className="col-span-full self-start lg:col-span-5"
    >
      <label htmlFor="contact" className="label text-night-ink/60">
        Leave your email or phone
      </label>
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px]"
      />
      <input
        id="contact"
        name="contact"
        type="text"
        inputMode="email"
        autoComplete="email"
        // keyed so a failed submit restores what was typed
        key={`contact-${state.status}-${state.value}`}
        defaultValue={state.value}
        placeholder="you@email.com / 0912 345 678"
        aria-invalid={error}
        aria-describedby="contact-status"
        className="mt-3 block w-full border-b border-line bg-transparent py-4 text-lead font-medium transition-colors outline-none placeholder:text-night-ink/30 focus:border-accent aria-invalid:border-[#ff8a80]"
      />
      <p
        id="contact-status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-5 text-sm",
          error ? "text-[#ff8a80]" : "text-accent",
        )}
      >
        {state.message}
      </p>
      <label htmlFor="note" className="mt-4 block label text-night-ink/60">
        Message <span className="text-night-ink/40">(optional)</span>
      </label>
      <textarea
        id="note"
        name="note"
        key={`note-${state.status}-${state.note}`}
        defaultValue={state.note}
        rows={3}
        maxLength={500}
        placeholder="What's it about?"
        className="mt-3 block w-full resize-none border-b border-line bg-transparent py-3 text-body transition-colors outline-none placeholder:text-night-ink/30 focus:border-accent"
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-6 rounded-full bg-paper px-7 py-3.5 label text-night transition-colors hover:bg-accent hover:text-paper disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send ↗"}
      </button>
    </form>
  );
}
