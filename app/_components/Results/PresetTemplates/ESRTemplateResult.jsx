import React from "react";

function ESRTemplateResult({ template }) {
  return (
    <div className="flex items-center gap-10 " dir="ltr">
      <span>ESR</span>
      <div className="flex items-center gap-2">
        <span>1hr.</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {template.result["1hr."]}
        </span>{" "}
      </div>
      <div className="flex items-center gap-2">
        <span>2hr.</span>
        <span
          className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {template.result["2hr."]}
        </span>{" "}
      </div>
    </div>
  );
}

export default ESRTemplateResult;
