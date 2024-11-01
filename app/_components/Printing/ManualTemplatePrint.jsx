import moment from "moment";
import React from "react";

function ManualTemplatePrint({
  id,
  catId,
  testName,
  resultValue,
  min,
  minTitle,
  max,
  maxTitle,
  referenceRange,
  unit,
  lastTestResult,
  lastTestDate,
}) {
  return (
    <div
      id={`manual-template-print-cat-${catId}-test-${id}`}
      className="text-black grid grid-cols-12 w-full text-sm h-fit border-b border-dashed border-gray-400 pb-1 pt-[5px]"
      dir="ltr"
    >
      <span className="text-wrap text-start col-span-3 font-semibold">
        {testName}
      </span>
      <span className="text-center col-span-2 shadow-sm shadow-black self-start">
        {/* {Number(resultValue) +
          (Number(resultValue) >= Number(min)
            ? Number(resultValue) <= Number(max)
              ? ""
              : " H"
            : " L")} */}
        {`${resultValue} ${
          isNaN(Number(min)) ||
          min === "" ||
          isNaN(Number(max)) ||
          max === "" ||
          isNaN(Number(resultValue)) ||
          resultValue === ""
            ? ``
            : `${
                Number(min) <= Number(resultValue)
                  ? Number(max) >= Number(resultValue)
                    ? ""
                    : maxTitle || ""
                  : minTitle || ""
              }`
        }`}
      </span>
      <div className="flex flex-col gap-1 items-center col-span-3">
        {referenceRange
          .split("\n")
          .filter((line) => line !== "")
          .map((line, index) => (
            <span key={index}>{line}</span>
          ))}
      </div>
      <span className="col-span-2 text-center">{unit}</span>
      <div
        className="col-span-2 flex gap-1  justify-center flex-wrap-reverse"
        dir="ltr"
      >
        {lastTestDate ? (
          <>
            <span>{lastTestResult}</span>
            <span className="text-sm">
              ({moment(lastTestDate).format("yyyy-MM-DD")})
            </span>{" "}
          </>
        ) : (
          <span>{"-"}</span>
        )}
      </div>
    </div>
  );
}

export default ManualTemplatePrint;
