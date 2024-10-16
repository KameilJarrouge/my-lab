import React from "react";

function PTTTemplateResult({ template }) {
  // partial thromboplastin time
  return (
    <div
      className={
        "grid grid-cols-6 w-fit  items-center gap-2 max-w-[80ch]  px-4"
      }
      dir="ltr"
    >
      <span className="col-span-1">PTT</span>
      <span
        className="w-[10ch] text-white text-center bg-light_primary rounded h-fit "
        dir="ltr"
      >
        {template.result.ptt}
      </span>{" "}
      <span>sec</span>
      <span className="col-span-1">Control</span>
      <span
        className="w-[10ch] text-white text-center bg-light_primary rounded h-fit "
        dir="ltr"
      >
        {template.result.control}
      </span>{" "}
      <span>sec</span>
      {/* <span className="col-span-1"></span> */}
    </div>
  );
}

export default PTTTemplateResult;
