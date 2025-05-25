import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { FaProductHunt } from 'react-icons/fa6';
import { GoProject, GoTasklist } from 'react-icons/go';
import { GrBlog } from 'react-icons/gr';
import { MdOutlineRateReview } from 'react-icons/md';

interface menuItemsType {
    label: string;
    url: string;
    icon: any;
}

const menuItems: menuItemsType[] = [
    {
        label: 'Project', url: '/admin/project', icon: <GoProject />
    },
    {
        label: 'Product', url: '/admin/product', icon: <FaProductHunt />
    },
    {
        label: 'Blog', url: '/admin/blog', icon: <GrBlog />
    },
    {
        label: 'Career', url: '/admin/career', icon: <GoTasklist />
    },
    {
        label: 'Client', url: '/admin/client', icon: <MdOutlineRateReview />
    }
]


export default function AdminSidebar() {
    const router = useRouter()
    const isActive = (url: string) => {
        return router.pathname === url ? 'bg-blue-500 text-white' : ''
    }
  return (
    <div className='w-[200px] min-w-[200px] max-w-[200px] p-6 border-r border-white h-screen sticky left-0 top-0'>
        <h1 className='text-2xl font-bold py-4'>Predien</h1>
        <nav>
            <ul className='list-none flex flex-col gap-2'>
                {menuItems.map((item, index)=>(
                    <li key={index}>
                        <Link 
                            href={`${item.url}`} 
                            className={` ${isActive(item.url)} duration-200 hover:bg-blue-500 hover:text-white px-4 py-1 flex gap-2 items-center`}
                        >
                            {item.icon}    {item.label}
                        </Link>
                    </li>
                ))}
                
               
            </ul>
        </nav>
    </div>
  )
}
