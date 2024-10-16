import React from "react";

function PregnancyTestTemplatePrint({ template }) {
  return (
    <div
      className={
        "flex w-full items-center gap-10 px-4 border-b border-dashed border-gray-400 pb-1"
      }
      dir="ltr"
    >
      <span className="w-fit">Pregnancy Test</span>
      <span
        className="w-[15ch] text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.pregnancyResult}
      </span>{" "}
    </div>
  );
}

export default PregnancyTestTemplatePrint;
