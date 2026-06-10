/** Shared page shell used by all CMS admin pages */
import React from 'react'

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4, margin: '4px 0 0' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2',
      padding: '22px 26px', ...style,
    }}>
      {children}
    </div>
  )
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 18px' }}>
      {children}
    </h2>
  )
}

export const FIELD_STYLE: React.CSSProperties = {
  width: '100%', padding: '9px 13px', border: '1px solid #d1d5db', borderRadius: 8,
  fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff',
}

export const LABEL_STYLE: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280',
  marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em',
}

export const BTN_PRIMARY: React.CSSProperties = {
  padding: '10px 22px', borderRadius: 8, border: 'none',
  background: '#1e5fe0', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
}

export const BTN_DANGER: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 7, border: '1px solid #fecaca',
  background: '#fef2f2', color: '#b91c1c', fontWeight: 600, fontSize: 13, cursor: 'pointer',
}

export const BTN_GHOST: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 7, border: '1px solid #e5e7eb',
  background: '#fff', color: '#374151', fontWeight: 500, fontSize: 13, cursor: 'pointer',
}
