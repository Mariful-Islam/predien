import React, { useState } from "react";
import Form from "../Form";
import Modal from "../Modal";

interface CreateFormProps {
  isOpen: boolean;
  onClose: VoidFunction;
  title: string;
}

export default function CreateForm({
  isOpen,
  onClose,
  title,
}: CreateFormProps) {
  const [formData, setFormData] = useState<any>();
  const fields = [
    "project_name",
    "slug",
    "brief",
    "descroption",
    "type*select>web,gis,desktop,mobile,data,wordpress,uiux",
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Create ${title}`}>
      <Form
        onClose={onClose}
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={()=>console.log('ffffffff')}
        submitBtnName="vfbg"
      />
    </Modal>
  );
}
