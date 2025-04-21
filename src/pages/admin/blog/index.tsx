import React, { useEffect, useState } from 'react'
import AdminLayout from '../_layout'
import Table, { ColumnsProps } from '@/components/Table'
import { BASE_URL } from '@/pages/services/custom-software-development';
import { IoEyeOutline } from 'react-icons/io5';
import ContentView from '@/components/admin/contentView';

export default function Blog() {
    const [blogs, setblogs] = useState<any>();
    const [View, setView] = useState<any>(null);
  
  
    const columns: ColumnsProps[] = [
      {
        label: "ID",
        accessor: "_id",
        render: (item) => <div>{item._id}</div>,
      },
      {
        label: "Title",
        accessor: "title",
      },
      {
        label: "slug",
        accessor: "slug",
      },
      {
        label: "date",
        accessor: "date",
      },
      {
        label: "",
        accessor: "",
        render: (item: any) => (
          <div className="flex justify-center items-center gap-2">
            <button
              className=" hover:text-blue-500"
              onClick={() => setView(item.slug)}
            >
              <IoEyeOutline />
            </button>
            {/* <button
              className=" hover:text-blue-500"
              // onClick={() => setEdit("ygyug")}
            >
              <CiEdit />
            </button> */}
          </div>
        ),
      },
    ];
  
    useEffect(() => {
      fetchblogs();
    }, []);
  
    const fetchblogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs`);
        const data = await res.json();
        setblogs(data);
      } catch {
        console.log("Error fetch blogs!");
      }
    };

  return (
    <AdminLayout>
        <Table columns={columns} data={blogs}/>

        {View && 
          <ContentView 
            isOpen={View ? true : false}
            onClose={()=>setView(null)}
            id={View}
            name='blogs'
            keys={['title', 'description', 'slug']}
          />
        }
    </AdminLayout>
  )
}
