// ─────────────────────────────────────────────────────────────────────
// Phase C — Frontend Rewire
//
// Was: Web3Forms (3rd-party form-to-email service).
// Now: POST /api/leads (own endpoint backed by the Payload CMS Leads
//      collection).
//
// The function signature is unchanged so every existing form
// (ContactForm, AIVisibilityChallenge, VisibilityChecker,
// ApplicationForm, GuestPostForm) keeps working with zero changes.
// Only the wire format is different: we now post JSON instead of
// FormData and include the Cloudflare Turnstile token if one was
// rendered into the form.
//
// To wire Turnstile into a form, render <Turnstile /> from
// components/Turnstile.tsx anywhere inside the <form> element. The
// widget injects a hidden input named `cf-turnstile-response`, which
// FormData picks up automatically.
// ─────────────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = 'info@securityblogs.com.au'

type SubmitOptions = {
  formData: FormData
  // The `subject` argument is kept for backwards compatibility with the
  // existing 5 form components, but is now stored on the Lead's `meta`
  // field rather than used as an email subject — Payload renders the
  // assigned-to email itself.
  subject: string
  extras?: Record<string, string | number | boolean>
  // Optional source tag — describes which form this came from. Defaults
  // to 'contact'. Other values: 'challenge', 'checker', 'careers',
  // 'guest-post'.
  source?: string
}

export async function submitForm({
  formData,
  subject,
  extras,
  source = 'contact',
}: SubmitOptions): Promise<{ ok: boolean; error?: string; id?: string }> {
  // FormData → plain object so we can JSON-encode it.
  const payload: Record<string, unknown> = { source, subject }
  formData.forEach((value, key) => {
    // Skip File values (e.g. ApplicationForm CV uploads) — handled by a
    // separate multipart endpoint in Phase C.1. Falls back to filename
    // string so the lead record still notes that a file was attached.
    if (value instanceof File) {
      payload[key] = value.name ? `[file: ${value.name}]` : '[file]'
      return
    }
    payload[key] = value
  })
  if (extras) for (const [k, v] of Object.entries(extras)) payload[k] = v

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json?.ok === false) {
      return { ok: false, error: json?.error || 'Submission failed. Please try again or email us directly.' }
    }
    return { ok: true, id: json?.id }
  } catch {
    return { ok: false, error: 'Network error. Please try again or email us directly.' }
  }
}
