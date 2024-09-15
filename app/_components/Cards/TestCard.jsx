import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";

function TestCard({ test }) {
  return (
    <div className="bg-dark_primary hover:text-light_text group border border-transparent hover:border-text/30 shadow shadow-black h-fit w-[calc(50%-0.5rem)] px-2 py-[0.375rem] rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* info */}
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"التحليل : " + test.name}
          className="w-[20ch] truncate text-start group-hover:font-semibold"
        >
          {test.name}
        </span>
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"التصنيف : " + test.category.name}
          className="w-[15ch] truncate "
        >
          {test.category.name}
        </span>
        <div className="flex gap-1 items-center">
          <MdChevronRight />
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"عدد الوحدات"}
          >
            {test.units}
          </span>
          <MdChevronLeft />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {/* actions and links */}

        <Link href={`/tests/${test.id}/update`}>
          <AuthButton title="تعديل" />
        </Link>
      </div>
    </div>
  );
}

export default TestCard;
