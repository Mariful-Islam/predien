import React from "react";

function HeadingSection({text}: {text: string}) {
  return (
    <h3
      className="text-black dark:text-white text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter max-w-2xl"
    >
      <div dangerouslySetInnerHTML={{__html: text}}/>
    </h3>
  );
}

export default HeadingSection;
