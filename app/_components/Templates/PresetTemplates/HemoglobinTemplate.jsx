import React from "react";

function HemoglobinTemplate() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-8" dir="ltr">
        <div className="w-[25ch] flex justify-between">
          <span>Hemoglobin</span>
          <span>الخضاب</span>
        </div>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
        <div className="flex flex-col">
          <span>Female: 12 - 16</span>
          <span>Male: 13 - 18</span>
        </div>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-8" dir="ltr">
        <div className="w-[25ch] flex justify-between">
          <span>Hematocrit</span>
          <span>الرسابة</span>
        </div>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
        <div className="flex flex-col">
          <span>Female: 35 - 47</span>
          <span>Male: 40 - 55</span>
        </div>
        <span>%</span>
      </div>
    </div>
  );
}

export default HemoglobinTemplate;
