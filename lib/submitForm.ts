// Web3Forms is a free form-handling service that emails submissions to you.
// One-time setup: sign up at https://web3forms.com using info@securityblogs.com.au,
// then paste the access key you receive into the constant below and rebuild the site.
export const WEB3FORMS_ACCESS_KEY = '9b5ca0e0-e2b2-4572-846e-1133389e8163'

// Inbox that should receive form submissions.
export const CONTACT_EMAIL = 'info@securityblogs.com.au'

type SubmitOptions = {
  formData: FormData
  subject: string
  extras?: Record<string, string | number | boolean>
}

export async function submitForm({ formData, subject, extras }: SubmitOptions): Promise<{ ok: boolean; error?: string }> {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith('PASTE_')) {
    return { ok: false, error: 'Form is not configured yet. Please contact the site owner.' }
  }

  formData.set('access_key', WEB3FORMS_ACCESS_KEY)
  formData.set('subject', subject)
  formData.set('from_name', 'Security Blogs Website')
  if (extras) {
    for (const [k, v] of Object.entries(extras)) formData.set(k, String(v))
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json?.success === false) {
      return { ok: false, error: json?.message || 'Submission failed. Please try again or email us directly.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Please try again or email us directly.' }
  }
}
