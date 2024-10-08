import React from "react";

function BloodTypeTemplate() {
  return (
    <div className={"flex w-full gap-10 items-center px-4"} dir="ltr">
      <span className="w-[10ch]">Blood Group</span>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
      <span className="w-[10ch]">Rh</span>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
    </div>
  );
}

export default BloodTypeTemplate;
