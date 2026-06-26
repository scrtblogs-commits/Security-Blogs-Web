export const CONTACT_EMAIL = 'info@securityblogs.com.au'

const FORMSUBMIT_EMAIL = 'scrtblogs@gmail.com'

type SubmitOptions = {
  formData: FormData
  subject: string
  extras?: Record<string, string | number | boolean>
  source?: string
}

export async function submitForm({
  formData,
  subject,
  extras,
  source = 'contact',
}: SubmitOptions): Promise<{ ok: boolean; error?: string; id?: string }> {
  const payload: Record<string, unknown> = {
    _subject: `[SecurityBlogs] ${subject}`,
    _captcha: 'false',
    _template: 'table',
    source,
  }

  formData.forEach((value, key) => {
    if (key === 'company_url') return // honeypot — skip
    if (value instanceof File) {
      payload[key] = value.name ? `[file: ${value.name}]` : '[file]'
      return
    }
    payload[key] = value
  })

  if (extras) for (const [k, v] of Object.entries(extras)) payload[k] = v

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (json?.success === 'true' || json?.success === true) {
      return { ok: true }
    }
    return { ok: false, error: 'Submission failed. Please email us at info@securityblogs.com.au.' }
  } catch {
    return { ok: false, error: 'Network error. Please try again or email us directly.' }
  }
}
