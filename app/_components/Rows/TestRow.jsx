"use client";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import ViewResultsModal from "../Modals/ViewResultsModal";

function TestRow({ test, index, date }) {
  const [isViewResultOpen, setIsViewResultOpen] = useState(false);
  return (
    <div className="w-full h-fit">
      <div className={`flex items-center justify-between w-full `}>
        {/* info */}
        <div className="flex gap-3 items-center">
          <span>{index + 1})</span>
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"التحليل : " + test.Test.name}
            className="max-w-[20ch] truncate text-start group-hover:font-semibold"
          >
            {test.Test.name}
          </span>{" "}
          <span className="text-dark_text/60">•</span>
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"التصنيف : " + test.Test.category.name}
            className="max-w-[20ch] truncate "
          >
            {test.Test.category.name}
          </span>{" "}
          <span className="text-dark_text/60">•</span>
          <div className="flex gap-1 items-center">
            <MdChevronRight />
            <span
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"عدد الوحدات"}
            >
              {test.Test.units}
            </span>
            <MdChevronLeft />
          </div>
          <span className="text-dark_text/60">•</span>
          <span
            className="text-text "
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"سعر الوحدة : " + test.price}
          >
            التكلفة: {numberWithCommas(test.price * test.units)} ل.س
          </span>
        </div>
        <div className="flex gap-3 items-center justify-end">
          <AuthButton
            title="نتائج التحليل"
            onClick={() => setIsViewResultOpen(true)}
          />
        </div>
      </div>
      <ViewResultsModal
        test={test}
        date={date}
        isOpen={isViewResultOpen}
        setIsOpen={setIsViewResultOpen}
      />
    </div>
  );
}

export default TestRow;
