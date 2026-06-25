'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function VerifyContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = params.get('token')
    if (!token) { setStatus('error'); return }

    fetch(`/api/directory-access/verify?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          localStorage.setItem('sg-dir-verified', 'true')
          localStorage.setItem('sg-dir-email', data.email || '')
          setEmail(data.email || '')
          setStatus('success')
          setTimeout(() => router.push('/security-directory/'), 3500)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [params, router])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f8fafc', padding: 24,
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '56px 48px',
        maxWidth: 480, width: '100%',
        boxShadow: '0 16px 64px rgba(0,0,0,0.08)',
        textAlign: 'center',
      }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              Activating your access...
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.6 }}>Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: 36, color: '#fff', fontWeight: 900,
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>
              Access Granted!
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.65, marginBottom: 28 }}>
              Your access to the Australian Security Company Directory is now active.
              Full contact details, phone numbers and company profiles are unlocked.
            </p>
            {email && (
              <div style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 12, padding: '12px 20px',
                fontSize: 14, color: '#166534', fontWeight: 600, marginBottom: 24,
              }}>
                Logged in as {email}
              </div>
            )}
            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>
              Redirecting you to the directory...
            </div>
            <Link
              href="/security-directory/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#3b82f6', color: '#fff',
                fontWeight: 700, fontSize: 15,
                padding: '14px 28px', borderRadius: 12,
                textDecoration: 'none',
              }}
            >
              Go to Directory Now →
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: 56, marginBottom: 20 }}>⚠️</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              This link is invalid or expired
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.65, marginBottom: 28 }}>
              Access links expire after 30 days. If your request was approved but the link is not working,
              please contact us and we will send a new one.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#3b82f6', color: '#fff',
                  fontWeight: 700, fontSize: 14,
                  padding: '12px 24px', borderRadius: 12,
                  textDecoration: 'none',
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/security-directory/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#f1f5f9', color: '#0f172a',
                  fontWeight: 700, fontSize: 14,
                  padding: '12px 24px', borderRadius: 12,
                  textDecoration: 'none',
                }}
              >
                Back to Directory
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function VerifyDirectoryPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ fontSize: 48 }}>⏳</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
