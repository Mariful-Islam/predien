import React from "react";

function HeadingPage({ firstText, secondText }: { firstText: string; secondText: string }) {
  return (
    <h1 className="flex flex-col gap-4 text-center md:text-start leading-snug text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter  mb-6">
      {firstText} <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
        {secondText}
      </span>
    </h1>
  );
}

export default HeadingPage;
