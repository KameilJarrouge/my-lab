import React from "react";
import { GoDash, GoDotFill } from "react-icons/go";
function BloodFilmTemplate() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="flex justify-between">
        <span className="font-semibold border-b border-text">
          دراسة لطاخة محيطية
        </span>
        <span className="font-semibold border-b border-text">Blood Film</span>
      </div>
      <div className="flex flex-col gap-2 pr-2">
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-text w-fit" dir="rtl">
            الكريات البيضاء (WBC) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span>طبيعية العدد والشكل والتفصص ولا يوجد أشكال شاذة.</span>
        </div>
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-text w-fit" dir="rtl">
            الكريات الحمراء (RBC) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span>طبيعية الشكل والصباغ والحجم.</span>
        </div>
        <div className="flex gap-2 items-center">
          <GoDotFill className="w-[0.5rem] h-fit" />
          <span className="border-b-[1px] border-text w-fit" dir="rtl">
            الصفيحات الدموية (Platelet) :
          </span>
        </div>
        <div className="flex gap-2 items-center ">
          <GoDash className="w-[0.5rem] h-fit" />
          <span>طبيعية الشكل والعدد والحجم.</span>
        </div>
      </div>
    </div>
  );
}

export default BloodFilmTemplate;
