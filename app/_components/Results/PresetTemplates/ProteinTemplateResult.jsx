import React from "react";

function ProteinTemplateResult({ template }) {
  return (
    <div className="flex flex-col justify-end gap-4 w-full" dir="ltr">
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Total Protein</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
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
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
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
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
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

export default ProteinTemplateResult;