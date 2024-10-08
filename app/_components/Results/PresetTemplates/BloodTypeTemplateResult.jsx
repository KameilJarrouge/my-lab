import React from "react";

function BloodTypeTemplateResult({ template }) {
  return (
    <div className={"flex w-full gap-5 items-center px-4"} dir="ltr">
      <span className="w-[10ch] text-center">Blood Group</span>
      <span
        className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
        dir="ltr"
      >
        {template.result.bloodGroup}
      </span>
      <span className="w-[10ch] text-center">Rh</span>
      <span
        className="w-[15ch] text-white text-center bg-light_primary rounded h-fit "
        dir="ltr"
      >
        {template.result.Rh}
      </span>
    </div>
  );
}

export default BloodTypeTemplateResult;
