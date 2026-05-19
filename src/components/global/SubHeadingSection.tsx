import React from "react";

function SubHeadingSection({ text }: { text: string }) {
  return (
    <p
      className="text-slate-600 dark:text-slate-200 text-lg max-w-xl leading-relaxed"
    >
      {text}
    </p>
  );
}

export default SubHeadingSection;
