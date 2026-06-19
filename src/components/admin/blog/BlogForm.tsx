import React, { useState } from "react";
import Form from "../../Form";
import Modal from "../../Modal";
import AdminLayout from "@/pages/admin/_layout";


const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"



interface BlogForm {
  isOpen: boolean;
  onClose: VoidFunction;
  title: string;
  refresh: VoidFunction;
}

export default function BlogForm({
  isOpen,
  onClose,
  title,
  refresh,
}: BlogForm) {
  
  const [formData, setFormData] = useState<any>();


  const handleBlogCreate = (e:any) => {
    e.preventDefault()

    fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: 'no-cache'
    }).then((res)=>{
      onClose()
      refresh()
    }).catch((e)=>console.log(e))

  };

  const fields = [
    "title",
    "slug",
    "description",
  ];
  return (
    <AdminLayout>
      <Form
        onClose={onClose}
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={handleBlogCreate}
        submitBtnName="Create"
      />
    </AdminLayout>
  );
}
