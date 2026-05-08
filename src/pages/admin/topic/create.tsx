import React, { use, useState } from "react";
import AdminLayout from "../_layout";
import Form from "@/components/Form";
import { API_URL } from "@/pages/blog";
import { useRouter } from "next/router";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";


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
          router.push("/admin/topic");
        }
      })
      .catch((e) => console.log(e));
  };

  const fields = ["name", "slug@name" ];

  
  return (
    <AdminLayout>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/admin/topic")}
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
