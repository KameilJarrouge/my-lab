import React from "react";

function BloodTypeTemplatePrint({ template }) {
  return (
    <div
      className={"flex w-full gap-5 items-center px-4 pb-1 text-sm"}
      dir="ltr"
    >
      <span className="w-[10ch] text-center">Blood Group</span>
      <span
        className="w-[15ch] text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.bloodGroup}
      </span>
      <span className="w-[10ch] text-center">Rh</span>
      <span
        className="w-[15ch] text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.Rh}
      </span>
    </div>
  );
}

export default BloodTypeTemplatePrint;
