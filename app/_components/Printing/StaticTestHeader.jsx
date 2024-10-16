import React from "react";

function StaticTestHeader({ id, categoryName = "Test" }) {
  return (
    <div
      className="flex flex-col w-full items-center pt-[4mm]"
      id={"static-test-header-" + id}
    >
      {/* Category Title */}
      <span className="w-fit min-w-[50%] border-b text-center font-bold text-lg shadow shadow-black mb-[0.5rem] px-1">
        {categoryName}
      </span>
    </div>
  );
}

export default StaticTestHeader;
