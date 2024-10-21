import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

function PTTemplatePrint({ template }) {
  // Prothrombin Time
  return (
    <div
      className={
        "grid grid-cols-7 w-full items-center gap-2 px-4 border-b border-dashed border-gray-400 pb-1 text-sm"
      }
      dir="ltr"
    >
      {/* First Row */}
      <span className="col-span-2"> Prothrombin Time (PT)</span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.pt1}
      </span>{" "}
      <span>sec</span>
      <span>
        <MdArrowRightAlt className="w-[1.5rem] h-fit text-black" />
      </span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.pt2}
      </span>{" "}
      <span>%</span>
      {/* Second Row */}
      <span className="col-span-2"> Control</span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.control1}
      </span>{" "}
      <span>sec</span>
      <span>
        <MdArrowRightAlt className="w-[1.5rem] h-fit text-black" />
      </span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.control2}
      </span>{" "}
      <span>%</span>
      {/* Third Row */}
      <span className="col-span-2"> INR</span>
      <span
        className="w-full text-black text-center shadow shadow-black rounded h-fit "
        dir="ltr"
      >
        {template.result.INR}
      </span>{" "}
      <span className="col-span-4"></span>
    </div>
  );
}

export default PTTemplatePrint;
