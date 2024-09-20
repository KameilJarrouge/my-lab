import moment from "moment";
import React from "react";

function ManualTemplatePrint({ id, catId, visitTest }) {
  return (
    <div
      id={"manual-template-print-cat-" + catId + "-test-" + id}
      className="text-black grid grid-cols-12 w-full text-sm h-fit border-b border-dashed border-gray-400 pb-1 pt-[5px]"
      dir="ltr"
    >
      <span className="text-wrap text-start col-span-3 font-semibold">
        {visitTest.Test.name}
      </span>
      <span className="text-center col-span-2 shadow-sm shadow-black self-start">
        {Number(visitTest.template.result.value) +
          (Number(visitTest.template.result.value) > visitTest.template.data.min
            ? Number(visitTest.template.result.value) <
              visitTest.template.data.max
              ? ""
              : " H"
            : " L")}
      </span>
      <div className="flex flex-col gap-1 items-center col-span-3">
        {visitTest.template.data.referenceRange
          .split("\n")
          .filter((line) => line !== "")
          .map((line, index) => (
            <span key={index}>{line}</span>
          ))}
      </div>
      <span className="col-span-2 text-center">
        {visitTest.template.data.unit}
      </span>
      <div className="col-span-2 flex gap-1  justify-center" dir="ltr">
        <span>{visitTest.lastTestResult || "-"}</span>
        <span className="text-sm">
          ({moment(visitTest.lastTestDate || new Date()).format("yyyy-MM-DD")})
        </span>{" "}
      </div>
    </div>
  );
}

export default ManualTemplatePrint;
