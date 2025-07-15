import React from "react";

function PregnancyTestTemplatePrint({ template }) {
  return (
    <div
      className={"flex w-full items-center gap-10 px-4 pb-1 text-sm"}
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
