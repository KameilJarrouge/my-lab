import React from "react";

function BilirubinTemplateResult({ template }) {
  return (
    <div className="flex flex-col justify-end gap-4 w-full" dir="ltr">
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Total Bilirubin</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {template.result["Total Bilirubin"]}
        </span>{" "}
        <span>up to 1.2</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Direct Bilirubin</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {template.result["Direct Bilirubin"]}
        </span>{" "}
        <span>up to 0.25</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Indirect Bilirubin</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {template.result["Indirect Bilirubin"]}
        </span>{" "}
        <span>up to 1</span>
      </div>
    </div>
  );
}

export default BilirubinTemplateResult;
