'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// This page is no longer part of the access flow.
// Redirect anyone who lands here back to the directory.
export default function VerifyDirectoryPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/security-directory/') }, [router])
  return null
}
