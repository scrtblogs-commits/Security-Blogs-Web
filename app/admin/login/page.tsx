'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res  = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const json = await res.json()
    setLoading(false)
    if (json.ok) router.push('/admin')
    else setError(json.error ?? 'Login failed')
  }

  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: '#f4f6f9',
    }}>
      <div style={{
        width: '100%', maxWidth: 400,
        background: '#fff', borderRadius: 16,
        padding: '36px 32px',
        boxShadow: '0 4px 24px rgba(18,42,86,0.09)',
        border: '1px solid #e8ecf2',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-header.webp" alt="SecurityBlogs" style={{ height: 42, width: 'auto' }} />
          <p style={{ marginTop: 8, fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Admin Panel</p>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 24, textAlign: 'center' }}>
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="admin"
              style={INPUT_STYLE}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={INPUT_STYLE}
            />
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#b91c1c' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 0', borderRadius: 10, border: 'none',
              background: loading ? '#93aff7' : '#1e5fe0',
              color: '#fff', fontWeight: 700, fontSize: 15,
              cursor: loading ? 'default' : 'pointer',
              marginTop: 4,
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
          Set <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 4 }}>ADMIN_PASSWORD</code> in your <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 4 }}>.env.local</code>
        </p>
      </div>
    </div>
  )
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', padding: '10px 13px',
  border: '1px solid #d1d5db', borderRadius: 8,
  fontSize: 14, color: '#111827', outline: 'none',
  boxSizing: 'border-box',
  background: '#fafafa',
}
