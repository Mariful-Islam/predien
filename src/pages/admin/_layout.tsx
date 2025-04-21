import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({children}: {children: any}) {
  return (
    <div className='p-0 m-0  bg-gray-200 dark:bg-gray-800 text-slate-800 dark:text-slate-100 w-full'>
      <div className='max-w-[1200px] min-w-0 mx-auto'>
        <div className='flex flex-row'>

          <AdminSidebar/>
     
          <div className='px-6 min-w-0 box-border'>
              <AdminHeader/>
              <div className='mt-4 overflow-auto'>
                <div className='w-full overflow-x-auto'>
                  {children}
                </div>
                  
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
