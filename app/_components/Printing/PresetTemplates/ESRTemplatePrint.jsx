import React from "react";

function ESRTemplatePrint({ template }) {
  return (
    <div
      className="flex items-center gap-20 w-full  border-b border-dashed border-gray-400 pb-1"
      dir="ltr"
    >
      <span>ESR</span>
      <div className="flex items-center gap-2">
        <span>1hr.</span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center rounded h-fit "
          dir="ltr"
        >
          {template.result["1hr."]}
        </span>{" "}
      </div>
      <div className="flex items-center gap-2">
        <span>2hr.</span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center rounded h-fit "
          dir="ltr"
        >
          {template.result["2hr."]}
        </span>{" "}
      </div>
    </div>
  );
}

export default ESRTemplatePrint;
