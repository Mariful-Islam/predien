import React, { use, useState } from "react";
import AdminLayout from "../_layout";
import Form from "@/components/Form";
import { API_URL } from "@/pages/blog";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";
import SlateEditor from "@/components/SlateEditor";

function Create() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>();

  const handleBlogCreate = (e: any) => {
    e.preventDefault();

    fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          router.push("/admin/blog");
        }
      })
      .catch((e) => console.log(e));
  };

  const fields = ["title", "slug", "description"];
  return (
    <AdminLayout>
      <button
        onClick={() => router.push("/admin/blog")}
        className="text-blue-500 ring-blue-500 hover:ring-b flex items-center gap-2 mb-4"
      >
        <FaChevronLeft /> Back
      </button>
      <form onSubmit={handleBlogCreate}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`title`}
            className="text-sm font-medium text-slate-500 dark:text-slate-300"
          >
            Title
          </label>
          <input
            id={`title`}
            type="text"
            name="title"
            placeholder={`Type title`}
            value={formData?.["title"] || ""}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="bg-white dark:bg-gray-700 block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label
            htmlFor={`slug`}
            className="text-sm font-medium text-slate-500 dark:text-slate-300"
          >
            Slug
          </label>
          <input
            id={`slug`}
            type="text"
            name="slug"
            placeholder={`Type slug`}
            value={formData?.title?.toLowerCase().split(" ").join("-") || ""}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                slug: formData?.title?.toLowerCase().split(" ").join("-") || "",
              }))
            }
            className="bg-white dark:bg-gray-700 block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label
            htmlFor={`description`}
            className="text-sm font-medium text-slate-500 dark:text-slate-300"
          >
            Description
          </label>

          <div className="border border-gray-300 rounded-md bg-white dark:bg-gray-700 w-full">
            <SlateEditor
              onChange={(value: any) => {
                setFormData((prev: any) => ({
                  ...prev,
                  description: JSON.stringify(value),
                }));
              }}
            />
          </div>
        </div>

        <div className="mt-4 mb-[1000px] flex gap-4 justify-end ">
          <button
            type="button"
            onClick={() => (window.location.href = "/admin/blog")}
            className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-200"
          >
            Create
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default Create;
