import React from "react";

function TestsHeader({ categoryName = "Test", children }) {
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      {/* Category Title */}
      <span className="w-fit min-w-[50%] border-b text-center font-bold text-lg shadow shadow-black">
        {categoryName}
      </span>

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
        {/* Test Rows */}
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

export default TestsHeader;
