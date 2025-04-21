import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Admin() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/project')
  }, [router])

  return null // Or a loading spinner if you want
}
