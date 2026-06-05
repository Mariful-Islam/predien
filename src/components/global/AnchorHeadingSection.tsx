import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnchorHeadingSection({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-10 h-[1px] bg-blue-400" />
      <span className="text-blue-400 font-black text-[14px] uppercase tracking-[0.2em]">
        {text}
      </span>
    </div>
  );
}

export default AnchorHeadingSection;
