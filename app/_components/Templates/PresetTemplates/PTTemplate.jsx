import React from "react";
import { MdArrowRight, MdArrowRightAlt } from "react-icons/md";

function PTTemplate() {
  // Prothrombin Time
  return (
    <div
      className={"grid grid-cols-7 w-full items-center gap-2 px-4"}
      dir="ltr"
    >
      {/* First Row */}
      <span className="col-span-2"> Prothrombin Time (PT)</span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>sec</span>
      <span>
        <MdArrowRightAlt className="w-[1.5rem] h-fit text-text" />
      </span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>%</span>
      {/* Second Row */}
      <span className="col-span-2"> Control</span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>sec</span>
      <span>
        <MdArrowRightAlt className="w-[1.5rem] h-fit text-text" />
      </span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span>%</span>
      {/* Third Row */}
      <span className="col-span-2"> INR</span>
      <span className="px-12 py-1 bg-light_primary rounded text-center">?</span>
      <span className="col-span-4"></span>
    </div>
  );
}

export default PTTemplate;
