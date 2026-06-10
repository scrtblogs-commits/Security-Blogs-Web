'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router   = useRouter()
  const [user,   setUser]    = useState('')
  const [pass,   setPass]    = useState('')
  const [error,  setError]   = useState('')
  const [loading,setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res  = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    })
    const json = await res.json()
    setLoading(false)
    if (json.ok) router.push('/admin')
    else setError(json.error ?? 'Login failed')
  }

  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -150, left: -100, width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 420, position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '40px 36px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-header.webp" alt="SecurityBlogs" style={{ height: 44, width: 'auto', filter: 'brightness(10)' }} />
          <div style={{
            marginTop: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          }}>
            Admin Panel
          </div>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', textAlign: 'center' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '0 0 28px' }}>
          Sign in to manage your website
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Username
            </label>
            <input
              type="text" value={user} onChange={e => setUser(e.target.value)}
              required autoComplete="username" placeholder="admin"
              style={INPUT}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              required autoComplete="current-password" placeholder="••••••••"
              style={INPUT}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)',
              borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              marginTop: 4, padding: '13px 0', borderRadius: 12, border: 'none',
              background: loading
                ? 'rgba(30,95,224,0.5)'
                : 'linear-gradient(135deg,#1e5fe0,#3b82f6)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              cursor: loading ? 'default' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(30,95,224,0.4)',
              transition: 'all 0.15s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ marginTop: 22, fontSize: 11.5, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6 }}>
          Set <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, color: 'rgba(255,255,255,0.4)' }}>ADMIN_PASSWORD</code> in{' '}
          <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, color: 'rgba(255,255,255,0.4)' }}>.env.local</code>
        </p>
      </div>
    </div>
  )
}

const INPUT: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,0.07)',
  border: '1.5px solid rgba(255,255,255,0.12)',
  borderRadius: 10, fontSize: 14, color: '#fff',
  outline: 'none', boxSizing: 'border-box',
}
