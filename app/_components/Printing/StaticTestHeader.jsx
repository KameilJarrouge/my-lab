import React from "react";

function StaticTestHeader({ id, categoryName = "Test" }) {
  return (
    <div
      className="flex flex-col w-full items-center pt-[4mm]"
      id={"static-test-header-" + id}
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
    </div>
  );
}

export default StaticTestHeader;
