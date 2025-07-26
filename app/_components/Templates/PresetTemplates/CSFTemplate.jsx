import React from "react";
function CSFTemplate() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="flex gap-2 border-b border-text w-fit">
        <span className="font-semibold ">سائل دماغي شوكي :</span>
        <span className="font-semibold " dir="ltr">
          C.S.F.
        </span>
      </div>
      <div className="flex flex-col gap-2 pr-2">
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">Color:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">Appearance:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">WBC:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
          <span>up to 20 / mm³</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">RBC:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
          <span>0 / mm³</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">Glucose:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
          <div className="flex flex-col">
            <span>45-80 mg/dl</span>
            <span className="text-sm">(less than 20 mg of F.B.S)</span>
          </div>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">Protein:</span>
          <span className="px-12 py-1 bg-light_primary rounded">?</span>
          <span>15 - 45 mg/dl</span>
        </div>
      </div>
    </div>
  );
}

export default CSFTemplate;
