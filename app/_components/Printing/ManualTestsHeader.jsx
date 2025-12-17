import React from "react";

function ManualTestsHeader({ categoryName = "Test", id }) {
  return (
    <div
      className="flex flex-col  w-full items-center pt-[4mm] "
      id={"manual-test-header-" + id}
    >
      {/* Category Title */}
      <div className="w-fit min-w-[50%] flex flex-col gap-0.5 border-b text-center font-bold text-lg shadow shadow-black mb-[0.5rem] px-1">
        {categoryName
          .split("\n")
          .filter((line) => line !== "")
          .map((line, index) => (
            <span key={index}>{line}</span>
          ))}
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Table headers */}
        <div
          className="text-black grid grid-cols-12 gap-1 w-full h-fit"
          dir="ltr"
        >
          <span className="border-b font-semibold border-b-gray-500 text-wrap text-start col-span-3">
            Tests
          </span>
          <span className="border-b font-semibold border-b-gray-500 text-center col-span-2">
            Result
          </span>
          <span className="border-b font-semibold border-b-gray-500 col-span-3 text-center">
            Reference Range
          </span>
          <span className="border-b font-semibold border-b-gray-500 text-center col-span-2">
            Units
          </span>
          <span className="border-b font-semibold border-b-gray-500 col-span-2 text-center">
            Last Test
          </span>
        </div>
      </div>
    </div>
  );
}

export default ManualTestsHeader;
