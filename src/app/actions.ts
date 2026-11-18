"use server";

import { headers } from "next/headers";
import { parseContact } from "@/lib/contact";
import { allow } from "@/lib/limit";

const MINUTE = 60_000;

export type ContactState = {
  status: "idle" | "error" | "sent";
  message: string;
  value: string;
  note: string;
};

async function notifyTelegram(text: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
    },
  );
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

async function sendEmail(to: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    // TODO: final email format
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to,
      subject: "Thanks for reaching out",
      html: "<p>Hi, thanks for getting in touch. I'll get back to you soon.</p>",
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = String(formData.get("contact") ?? "");
  const note = String(formData.get("note") ?? "")
    .trim()
    .slice(0, 500);
  // honeypot: bots fill every field
  if (formData.get("company"))
    return { status: "sent", message: "", value: "", note: "" };

  const contact = parseContact(raw);
  if ("error" in contact)
    return { status: "error", message: contact.error, value: raw, note };

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const ok =
    (await allow(`ip:${ip}`, 5, 10 * MINUTE)) &&
    (await allow(`to:${contact.value}`, 1, 60 * MINUTE)) &&
    (await allow("all", 50, 60 * MINUTE));
  if (!ok)
    return {
      status: "error",
      message: "Too many requests. Please try again later.",
      value: raw,
      note,
    };

  try {
    if (contact.kind === "email") await sendEmail(contact.value);
    const icon = contact.kind === "phone" ? "📞" : "✉️";
    await notifyTelegram(
      `${icon} New contact (${contact.kind}): ${contact.value}` +
        (note ? `\n\n${note}` : ""),
    );
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
      value: raw,
      note,
    };
  }

  return {
    status: "sent",
    message:
      contact.kind === "email"
        ? "Sent — check your inbox."
        : "Got it — I'll reach out soon.",
    value: "",
    note: "",
  };
}
