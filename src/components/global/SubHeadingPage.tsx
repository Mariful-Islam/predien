import React from "react";

function SubHeadingPage({ text }: { text: string }) {
  return (
    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-md font-extralight max-w-2xl ">
      {text}
    </p>
  );
}

export default SubHeadingPage;
