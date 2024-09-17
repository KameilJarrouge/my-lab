import moment from "moment";
import React from "react";

function ManualTemplatePrint({
  testName,
  result,
  min,
  max,
  referenceRange,
  units,
  lastTestDate,
  lastTestResult,
}) {
  return (
    <div
      className="text-black grid grid-cols-12 w-full h-fit border-b border-dashed border-gray-400 py-[5px]"
      dir="ltr"
    >
      <span className="text-wrap text-start col-span-3">{testName}</span>
      <span className="text-center col-span-2 shadow-sm shadow-black self-start">
        {result + (result > min ? (result < max ? "" : "H") : "L")}
      </span>
      <div className="flex flex-col gap-1 items-center col-span-3">
        {referenceRange
          .split("\n")
          .filter((line) => line !== "")
          .map((line, index) => (
            <span key={index}>{line}</span>
          ))}
      </div>
      <span className="col-span-2 text-center">{units}</span>
      <div className="col-span-2 flex gap-1  justify-center" dir="ltr">
        <span>{lastTestResult}</span>
        <span className="text-sm">
          ({moment(lastTestDate).format("yyyy-MM-DD")})
        </span>{" "}
      </div>
    </div>
  );
}

export default ManualTemplatePrint;
