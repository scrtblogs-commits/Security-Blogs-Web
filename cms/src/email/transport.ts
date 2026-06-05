import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

// Hostinger SMTP transport.
// Configured via env vars (see cms/.env.example):
//   SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASSWORD
//   EMAIL_FROM_NAME / EMAIL_FROM_ADDRESS
//
// In development, the docker-compose.yml spins up MailHog on localhost:1025
// to catch all outbound mail so we never actually send during local dev.
// Set SMTP_HOST=localhost / SMTP_PORT=1025 / SMTP_SECURE=false in .env to use it.

const isDev = process.env.NODE_ENV !== 'production'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? (isDev ? 'localhost' : 'smtp.hostinger.com'),
  port: Number(process.env.SMTP_PORT ?? (isDev ? 1025 : 465)),
  secure: process.env.SMTP_SECURE === 'true' || (!isDev && !process.env.SMTP_SECURE),
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD ?? '' }
    : undefined,
})

export const emailAdapter = nodemailerAdapter({
  defaultFromName:    process.env.EMAIL_FROM_NAME    ?? 'SecurityBlogs',
  defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? 'info@securityblogs.com.au',
  transport: transporter,
})
