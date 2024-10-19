import React from "react";

function ProteinTemplate() {
  return (
    <div className="flex flex-col justify-end gap-4 w-full" dir="ltr">
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Total Protein</span>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
        <span className="w-[5rem]">6 - 8.5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Albumin</span>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
        <span className="w-[5rem]">3.5 - 5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Globulin</span>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
        <span className="w-[5rem]">2.3 - 3.4</span>
        <span>g/dL</span>
      </div>
    </div>
  );
}

export default ProteinTemplate;
