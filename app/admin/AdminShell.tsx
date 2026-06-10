import React from 'react'

/* ─── Page wrapper ───────────────────────────────────────────────────────── */
export function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '32px 36px', maxWidth: 1060, width: '100%' }}>
      {children}
    </div>
  )
}

/* ─── Page header ────────────────────────────────────────────────────────── */
export function PageHeader({
  title, subtitle, action, icon,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
  icon?: string
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16, marginBottom: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {icon && (
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg,#1e5fe0,#3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
            boxShadow: '0 4px 12px rgba(30,95,224,0.25)',
          }}>
            {icon}
          </div>
        )}
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 14, color: '#64748b', marginTop: 4, margin: '4px 0 0' }}>{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0',
      padding: '24px 28px',
      boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── Card section title ─────────────────────────────────────────────────── */
export function CardTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <h2 style={{
        fontSize: 12, fontWeight: 700, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.09em', margin: 0,
      }}>
        {children}
      </h2>
      {action}
    </div>
  )
}

/* ─── Field ──────────────────────────────────────────────────────────────── */
export const FIELD_STYLE: React.CSSProperties = {
  width: '100%', padding: '9px 13px',
  border: '1.5px solid #e2e8f0', borderRadius: 9,
  fontSize: 14, color: '#0f172a', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
  background: '#fff',
  transition: 'border-color 0.15s',
}

export const LABEL_STYLE: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#475569',
  marginBottom: 6, letterSpacing: '0.01em',
}

/* ─── Buttons ────────────────────────────────────────────────────────────── */
export const BTN_PRIMARY: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '10px 22px', borderRadius: 9, border: 'none',
  background: 'linear-gradient(135deg,#1e5fe0,#2563eb)',
  color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(30,95,224,0.3)',
  transition: 'opacity 0.15s',
}

export const BTN_DANGER: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '8px 14px', borderRadius: 8, border: '1.5px solid #fecaca',
  background: '#fef2f2', color: '#dc2626', fontWeight: 600, fontSize: 13, cursor: 'pointer',
}

export const BTN_GHOST: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '9px 16px', borderRadius: 9, border: '1.5px solid #e2e8f0',
  background: '#fff', color: '#475569', fontWeight: 600, fontSize: 13, cursor: 'pointer',
  transition: 'border-color 0.15s',
}

export const BTN_SUCCESS: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '10px 22px', borderRadius: 9, border: 'none',
  background: 'linear-gradient(135deg,#059669,#10b981)',
  color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(5,150,105,0.25)',
}

/* ─── Saved banner ───────────────────────────────────────────────────────── */
export function SavedBanner({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      marginLeft: 12, fontSize: 13, color: '#059669', fontWeight: 600,
    }}>
      <span style={{ fontSize: 16 }}>✓</span> Saved successfully
    </div>
  )
}

/* ─── Error banner ───────────────────────────────────────────────────────── */
export function ErrorBanner({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div style={{
      background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 10,
      padding: '10px 16px', fontSize: 13, color: '#dc2626', fontWeight: 500,
    }}>
      {msg}
    </div>
  )
}

/* ─── Field component (convenience) ─────────────────────────────────────── */
export function Field({
  label, value, onChange, placeholder, textarea, rows, type,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  textarea?: boolean
  rows?: number
  type?: string
}) {
  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
    style: textarea ? { ...FIELD_STYLE, resize: 'vertical' as const } : FIELD_STYLE,
  }
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {textarea
        ? <textarea {...common} rows={rows ?? 3} />
        : <input {...common} type={type ?? 'text'} />
      }
    </div>
  )
}
