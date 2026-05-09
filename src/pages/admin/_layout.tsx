import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session is loaded and no user is found, kick them to login
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Show a loading state or nothing while checking
  if (status === "loading" || status === "unauthenticated") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className='p-0 m-0 bg-gray-200 dark:bg-gray-800 text-slate-800 dark:text-slate-100 w-full'>
      <div className='max-w-[1200px] min-w-0 mx-auto'>
        <div className='flex flex-row w-full'>
          <AdminSidebar />
          <div className='px-6 min-w-0 box-border w-full'>
            <AdminHeader />
            <div className='mt-4 overflow-auto w-full'>
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