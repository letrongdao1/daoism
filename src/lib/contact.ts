export type Contact =
  { kind: "email"; value: string } | { kind: "phone"; value: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// VN local (0 + 9 digits) or international (+ then 8–15 digits)
const PHONE = /^(0\d{9}|\+\d{8,15})$/;

export function parseContact(raw: string): Contact | { error: string } {
  const input = raw.trim();
  if (!input) return { error: "Please enter your email or phone number." };

  if (input.includes("@")) {
    return input.length <= 254 && EMAIL.test(input)
      ? { kind: "email", value: input.toLowerCase() }
      : { error: "That email address doesn't look right." };
  }

  const phone = input.replace(/[\s.\-()]/g, "");
  return PHONE.test(phone)
    ? { kind: "phone", value: phone }
    : {
        error:
          "Enter a valid email, or a phone number like 0912 345 678 or +84 912 345 678.",
      };
}
