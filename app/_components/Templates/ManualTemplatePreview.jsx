"use client";
import React from "react";

function ManualTemplatePreview({ template, testName }) {
  return (
    <div className="w-full flex flex-col gap-4 h-[10rem] overflow-y-auto overflow-x-hidden">
      <div className="w-full grid grid-cols-4 items-center gap-5 " dir="ltr">
        <span className="w-full text-center">Test</span>
        <span className="w-full text-center">Result</span>
        <span className="w-full text-center">Reference Range</span>
        <span className="w-full text-center">Units</span>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-5 " dir="ltr">
        <span className="w-full text-center py-1 ">{testName}</span>
        <span className="w-full text-center py-1 bg-light_primary rounded">
          ?
        </span>

        <span className="w-full text-center flex flex-col gap-2 " dir="ltr">
          {template.referenceRange && template.referenceRange !== "" ? (
            template.referenceRange
              .split("\n")
              .filter((line) => line !== "")
              .map((line, index) => <span key={index}>{line}</span>)
          ) : (
            <span>{`${template.min}-${template.max}`}</span>
          )}
        </span>

        <span className="w-full text-center">{template.unit}</span>
      </div>
    </div>
  );
}

export default ManualTemplatePreview;
