import React from "react";

function SubHeadingPage({ text }: { text: string }) {
  return (
    <p className="text-slate-600 dark:text-slate-400 text-xl md:text-3xl font-extralight max-w-2xl ">
      {text}
    </p>
  );
}

export default SubHeadingPage;
