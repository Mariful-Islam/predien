import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "../Button";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi"; // Cleaner, modern icons
import { API_URL } from "@/pages/blog";

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
  refresh,
}: DeleteConsentProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/api/${name}s/${item?.slug || item?._id}`);
      toast.success(`${name} deleted successfully!`);
      onClose();
      refresh();
    } catch (error) {
      toast.error(`Failed to delete ${name}. Please try again.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <AnimatePresence>
        {isOpen && (
          <div className="p-2 sm:p-4">
            {/* Icon Aesthetic Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shadow-sm"
              >
                <FiTrash2 className="w-6 h-6 animate-pulse" />
              </motion.div>

              {/* Typography Improvements */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
                  Delete {name}?
                </h2>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 break-all">
                    {item?.slug || "this item"}
                  </span>
                  ? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            {/* Premium Informational Alert */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5 mb-8 text-amber-800 text-xs"
            >
              <FiAlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>Deleting this will remove all associated data from the production servers immediately.</p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-2">
              <Button
                type="Outline"
                onClick={onClose}
                disabled={isDeleting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm"
              >
                Cancel
              </Button>
              <Button
                type="Danger"
                onClick={deleteItem}
                disabled={isDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all shadow-sm shadow-red-200 hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete permanent"
                )}
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Modal>
  );
}