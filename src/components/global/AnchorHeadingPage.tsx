import React from "react";

function AnchorHeadingPage({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 h-[2px] bg-blue-600 dark:bg-blue-500" />
      <span className="text-blue-600 dark:text-blue-500 font-black tracking-[0.4em] uppercase text-[14px]">
        {text}
      </span>
    </div>
  );
}

export default AnchorHeadingPage;
