import React from "react";

function HbElectrophoresisResult({ template }) {
  return (
    <div className="flex flex-col gap-4 w-[80ch]">
      <div className="flex gap-2 border-b border-text w-fit">
        <span className="font-semibold ">رحلان الخضاب</span>
        <span className="font-semibold " dir="ltr">
          Hb Electrophoresis
        </span>
      </div>
      <div className="flex flex-col gap-2 pr-2">
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]"></span>
          <span className="px-12 py-1  rounded"></span>
          <span className="border-b border-b-light_primary">
            Expected Values
          </span>
        </div>

        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">HbA1:</span>
          <span className="text-center p-1 bg-light_primary rounded min-w-[12ch] ">
            {" "}
            {template.result.HbA1}
          </span>
          <span>96.7 - 98.5 %</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">HbA2:</span>
          <span className="text-center p-1 bg-light_primary rounded min-w-[12ch] ">
            {" "}
            {template.result.HbA2}
          </span>
          <span>1.5 - 3.5 %</span>
        </div>
        <div className="flex gap-2 items-center" dir="ltr">
          <span className="w-[10ch]">HbF:</span>
          <span className="text-center p-1 bg-light_primary rounded min-w-[12ch] ">
            {" "}
            {template.result.HbF}
          </span>
          <span>0 - %</span>
        </div>
      </div>
    </div>
  );
}

export default HbElectrophoresisResult;
