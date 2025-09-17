import React, { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import Table, { ColumnsProps } from "@/components/Table";
import { BASE_URL } from "@/pages/services/custom-software-development";
import { IoEyeOutline } from "react-icons/io5";
import ContentView from "@/components/admin/contentView";
import Button from "@/components/Button";
import DeleteConsent from "@/components/admin/deleteConsent";
import BlogForm from "@/components/admin/blog/BlogForm";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import Router, { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();
  const [blogs, setblogs] = useState<any>();
  const [View, setView] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null)
  
  const [isOpenBlogCreateForm, setIsOpenBlogCreateForm] =
    useState<boolean>(false);

  const handleBlogCreateForm = () => {
    router.push('/admin/blog/create')
  };

  const columns: ColumnsProps[] = [
    // {
    //   label: "ID",
    //   accessor: "_id",
    //   render: (item) => <div>{item._id}</div>,
    // },
    {
      label: "Title",
      accessor: "title",
      render: (e) => (
        <div>
          {e.title.split(" ").slice(0, 5).join(" ")}
        </div>
      )
    },
    // {
    //   label: "slug",
    //   accessor: "slug",
    // },
    {
      label: "date",
      accessor: "date",
      render: (e) => (
        <div>
          {moment(e.date).format('HH MM A, DD MMM YYYY')}
        </div>
      )
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
          <button
            className=" hover:text-blue-500"
            onClick={() => setDlt(item)}
          >
            <MdDelete className="text-red-500"/>
          </button>
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
      <div className="flex justify-between mb-6">
        <h2>
          Blog
        </h2>
        <Button type="Normal" onClick={handleBlogCreateForm}>
          Write Blog
        </Button>
      </div>
      <Table columns={columns} data={blogs} />

      {View && (
        <ContentView
          isOpen={View ? true : false}
          onClose={() => setView(null)}
          id={View}
          name="blogs"
          keys={["title", "description", "slug"]}
        />
      )}

      {dlt && (
        <DeleteConsent
          isOpen={dlt ? true : false}
          onClose={()=>setDlt(null)}
          item={dlt}
          name="blog"
          refresh={fetchblogs}
        />
      )}



      {isOpenBlogCreateForm && (
        <BlogForm
          isOpen={isOpenBlogCreateForm}
          onClose={handleBlogCreateForm}
          title="Create Blog"
          refresh={fetchblogs}
        />
      )}
    </AdminLayout>
  );
}
