"use client";
import React from "react";

function ManualTemplateResult({ template, lastTest }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-3 items-center gap-5 " dir="ltr">
        <span className="w-full text-center">Result</span>
        <span className="w-full text-center">Reference Range</span>
        <span className="w-full text-center">Units</span>
        {/* <span className="w-full text-center">Last Test</span> */}
      </div>
      <div className="w-full grid grid-cols-3 items-center gap-5 " dir="ltr">
        <div className="flex gap-2 items-center justify-center rounded bg-light_primary text-white">
          <div
            className="max-w-[10ch] truncate"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={template.result.value}
          >
            <span>{template.result.value}</span>
          </div>
          <span>
            {/* {Number(template.data.min) <= Number(template.result.value)
              ? Number(template.data.max) >= Number(template.result.value)
                ? ""
                : "H"
              : "L"} */}
            {`${
              isNaN(Number(template.data.min)) ||
              template.data.min === "" ||
              isNaN(Number(template.data.max)) ||
              template.data.max === "" ||
              isNaN(Number(template.result.value)) ||
              template.result.value === ""
                ? ``
                : `${
                    Number(template.data.min) <= Number(template.result.value)
                      ? Number(template.data.max) >=
                        Number(template.result.value)
                        ? ""
                        : template.data.maxTitle || ""
                      : template.data.minTitle || ""
                  }`
            }`}
          </span>
        </div>
        <span className="w-full text-center flex flex-col gap-2" dir="ltr">
          {template.data.referenceRange
            .split("\n")
            .filter((line) => line !== "")
            .map((line, index) => (
              <span key={index}>{line}</span>
            ))}
        </span>
        <span className="w-full text-center">{template.data.unit}</span>
        {/* <div className="w-full  text-center relative">
          
          {!!lastTest ? (
            <div className="flex items-center gap-2 justify-center">
              <span>{moment(new Date()).format("yyyy-MM-DD")}</span>
              <MdChevronRight />
              <span>{lasttemplate.result.value}</span>
            </div>
          ) : (
            "-"
          )}
        </div> */}
      </div>
    </div>
  );
}

export default ManualTemplateResult;
