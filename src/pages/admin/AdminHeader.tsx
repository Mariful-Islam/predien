import Button from '@/components/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function AdminHeader() {
  const handleLogout = () => {
    // Implement logout logic here, e.g., clear session, redirect to login page, etc.]
    signOut({ callbackUrl: "/admin/login" });
  }
  return (
    <div className='py-2 sticky top-0 right-0 flex justify-between items-center border-b border-white'>
      
      <h3>Admin</h3>

      <div className='flex gap-4 items-center'>
        <ThemeToggle/>
        <Button type='DangerOutline' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}
