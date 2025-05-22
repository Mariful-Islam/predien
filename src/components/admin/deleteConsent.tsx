import React from "react";
import Modal from "../Modal";
import axios from "axios";
import { API_URL } from "@/pages/career/create";
import { toast } from "react-toastify";
import Button from "../Button";
import { MdDelete } from "react-icons/md";

interface DeleteConsentProps {
  isOpen: boolean;
  onClose: VoidFunction;
  item: any;
  name: string;
  refresh: VoidFunction;
}

export default function DeleteConsent({
  isOpen,
  onClose,
  item,
  name,
  refresh
}: DeleteConsentProps) {
  const deleteItem = () => {
    axios
      .delete(`${API_URL}/api/${name}s/${item?.slug}`)
      .then(() => {
        onClose()
        refresh()
        toast.success(`Deleted ${name} !`);
      })
      .catch(() => {
        toast.error(`Error deleting ${name} !!`);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Consent">
      <div className="h-[300px] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-2xl font-bold">Are you delete <span className="text-red-500">{item?.slug}</span> {name} ?</h1>
        <MdDelete  className="w-10 h-10 text-red-500"/>
      </div>
      <div className="flex gap-6 justify-end">
        <Button type="Outline" onClick={onClose}>Cancel</Button>
        <Button type="Danger" onClick={deleteItem}>Delete</Button>
      </div>
    </Modal>
  );
}
