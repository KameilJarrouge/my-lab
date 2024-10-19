import React from "react";

function ProteinTemplatePrint({ template }) {
  return (
    <div
      className="flex flex-col justify-end gap-4 w-full  border-b border-dashed border-gray-400 pb-1"
      dir="ltr"
    >
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Total Protein</span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
          dir="ltr"
        >
          {template.result["Total Protein"]}
        </span>{" "}
        <span className="w-[5rem]">6 - 8.5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Albumin</span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
          dir="ltr"
        >
          {template.result["Albumin"]}
        </span>{" "}
        <span className="w-[5rem]">3.5 - 5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Globulin</span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
          dir="ltr"
        >
          {Number(template.result["Total Protein"]) -
            Number(template.result["Albumin"])}
        </span>{" "}
        <span className="w-[5rem]">2.3 - 3.4</span>
        <span>g/dL</span>
      </div>
    </div>
  );
}

export default ProteinTemplatePrint;
