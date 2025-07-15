import React from "react";

function PTTTemplatePrint({ template }) {
  // partial thromboplastin time
  return (
    <div
      className={
        "grid grid-cols-6 w-full  items-center gap-2   px-4 pb-1 text-sm"
      }
      dir="ltr"
    >
      <span className="col-span-1">PTT</span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.ptt}
      </span>{" "}
      <span>sec</span>
      <span className="col-span-1">Control</span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.control}
      </span>{" "}
      <span>sec</span>
      {/* <span className="col-span-1"></span> */}
    </div>
  );
}

export default PTTTemplatePrint;
