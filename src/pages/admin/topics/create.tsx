import React, { use, useState } from "react";
import AdminLayout from "../_layout";
import Form from "@/components/Form";
import { useRouter } from "next/router";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";


const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"


function Create() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>();


  const handleCreate = (e: any) => {
    e.preventDefault();

    fetch(`${API_URL}/api/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/admin/topics");
        }
      })
      .catch((e) => console.log(e));
  };

  const fields = ["name", "slug@name", "short_description", "meta{title,description,keywords}" ];

  
  return (
    <AdminLayout>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/admin/topics")}
          className="text-blue-500 ring-blue-500 hover:ring-b flex items-center gap-2"
        >
          <FaArrowLeft />


        </button>

        <h3 >Create Topic</h3>
      </div>

      <Form
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={handleCreate}
        submitBtnName="Create"
      />





    </AdminLayout>
  );
}

export default Create;
