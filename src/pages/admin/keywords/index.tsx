import React, { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import Table, { ColumnsProps } from "@/components/Table";
import { BASE_URL } from "@/pages/services/custom-software-development";
import { IoEyeOutline } from "react-icons/io5";
import Button from "@/components/Button";
import DeleteConsent from "@/components/admin/deleteConsent";
import BlogForm from "@/components/admin/blog/BlogForm";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import Router, { useRouter } from "next/router";
import View from "../components/view";

export default function Keword() {
  const router = useRouter();
  const [keywords, setKeywords] = useState<any>();
  const [view, setView] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null)
  
  const [isOpenBlogCreateForm, setIsOpenBlogCreateForm] =
    useState<boolean>(false);

  const handleBlogCreateForm = () => {
    router.push('/admin/keyword/create')
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
          {e.name}
        </div>
      )
    },
    {
      label: "Slug",
      accessor: "slug",
      render: (e) => (
        <div>
          {e.slug}
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
            onClick={() => setView(item)}
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
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/keywords`);
      const data = await res.json();
      if (!data) {
        return {
          notFound: true,
        }
      }
      setKeywords(data);
    } catch {
      console.log("Error fetch blogs!");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-6">
        <h2>
          Keyword
        </h2>
        <Button type="Normal" onClick={handleBlogCreateForm}>
          Add 
        </Button>
      </div>
      <Table columns={columns} data={keywords} />

      {view && (
        <View
          isOpen={view ? true : false}
          onClose={() => setView(null)}
          item={view}
          name="keywords"
          keys={["name", "slug", "updatedAt"]}
        />
      )}

      {dlt && (
        <DeleteConsent
          isOpen={dlt ? true : false}
          onClose={()=>setDlt(null)}
          item={dlt}
          name="keyword"
          refresh={fetchKeywords}
        />
      )}



      {isOpenBlogCreateForm && (
        <BlogForm
          isOpen={isOpenBlogCreateForm}
          onClose={handleBlogCreateForm}
          title="Create Blog"
          refresh={fetchKeywords}
        />
      )}
    </AdminLayout>
  );
}
