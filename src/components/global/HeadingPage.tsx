import React from "react";

function HeadingPage({ firstText, secondText }: { firstText: string; secondText: string }) {
  return (
    <h1 className="text-7xl md:text-[120px] font-black text-slate-950 dark:text-white tracking-tighter leading-[0.8] mb-6">
      {firstText} <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
        {secondText}
      </span>
    </h1>
  );
}

export default HeadingPage;
