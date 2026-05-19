import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnchorHeadingSection({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 h-[1px] bg-blue-500" />
      <span className="text-blue-500 font-medium text-[13px] uppercase tracking-[3px]">
        {text}
      </span>
    </div>
  );
}

export default AnchorHeadingSection;
