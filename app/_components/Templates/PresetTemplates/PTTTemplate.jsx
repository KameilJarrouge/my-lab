import React from "react";

function PTTTemplate() {
  // partial thromboplastin time
  return (
    <div
      className={"grid grid-cols-9 w-full items-center gap-2  px-4"}
      dir="ltr"
    >
      <span className="col-span-2">PTT</span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>sec</span>
      <span className="col-span-2">Control</span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>sec</span>
      <span className="col-span-1"></span>
    </div>
  );
}

export default PTTTemplate;
