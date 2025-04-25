import React from "react";
import { GoDash, GoDotFill } from "react-icons/go";

function BloodFilmTemplatePrint({ template }) {
  return (
    <div className="flex flex-col gap-4 w-full border-b border-dashed border-gray-400 pb-1">
      <div className="flex justify-between">
        <span className="font-semibold border-b border-black">
          دراسة لطاخة محيطية
        </span>
        <span className="font-semibold border-b border-black">Blood Film</span>
      </div>
      <div className="flex flex-col gap-2 pr-2">
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-black w-fit" dir="rtl">
            الكريات البيضاء (WBC) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span className="text-justify">{template.result.WBC}</span>
        </div>
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-black w-fit" dir="rtl">
            الكريات الحمراء (RBC) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span className="text-justify">{template.result.RBC}</span>
        </div>
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-black w-fit" dir="rtl">
            الصفيحات الدموية (Platelet) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span className="text-justify">{template.result.Platelet}</span>
        </div>
      </div>
    </div>
  );
}

export default BloodFilmTemplatePrint;
