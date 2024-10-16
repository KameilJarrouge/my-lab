import React from "react";

function PregnancyTestTemplateResult({ template }) {
  return (
    <div className={"flex items-center gap-10 px-4"} dir="ltr">
      <span className="w-fit">Pregnancy Test</span>
      <span
        className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
        dir="ltr"
      >
        {template.result.pregnancyResult}
      </span>{" "}
    </div>
  );
}

export default PregnancyTestTemplateResult;
