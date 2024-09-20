"use client";
import React from "react";
import TextInput from "../../Inputs/TextInput";
import { MdChevronRight } from "react-icons/md";
import AuthButton from "../../Buttons/AuthButton";
import moment from "moment";

function HematologyCoagulationTemplatePrint({ template }) {
  return (
    <div
      className="flex flex-col w-full h-fit gap-2 relative  border-b border-dashed border-gray-400 pb-1 "
      dir="ltr"
    >
      <RowA
        englishName={"Leucocytes"}
        arabicName={"البيض"}
        measureUnit1={"/mm³"}
        range={"4500 - 10200"}
        row={0}
        state={template.result}
      />
      <RowB
        englishName={"Neutrophils"}
        arabicName={"العدلات"}
        measureUnit1={"%"}
        range={["Adult: 40-65", "Child: 30-50"]}
        measureUnit2={"/mm³"}
        row={1}
        state={template.result}
      />
      <RowB
        englishName={"Lymphocytes"}
        arabicName={"اللمفاويات"}
        measureUnit1={"%"}
        range={["Adult: 25-40", "Child: 30-60"]}
        measureUnit2={"/mm³"}
        row={3}
        state={template.result}
      />
      <RowB
        englishName={"Monocytes"}
        arabicName={"الوحيدات"}
        measureUnit1={"%"}
        range={["2 - 8"]}
        measureUnit2={"/mm³"}
        row={5}
        state={template.result}
      />
      <RowB
        englishName={"Eosinophils"}
        arabicName={"الحمضات"}
        measureUnit1={"%"}
        range={["0 - 4"]}
        measureUnit2={"/mm³"}
        row={7}
        state={template.result}
      />
      <RowB
        englishName={"Basophils"}
        arabicName={"الأسسات"}
        measureUnit1={"%"}
        range={["0 - 1"]}
        measureUnit2={"/mm³"}
        row={9}
        state={template.result}
      />
      <RowC
        row={11}
        state={template.result}
        englishName={"Erythrocytes"}
        arabicName={"الحمر"}
        measureUnit1={"x10⁶ / mm³"}
        range={"Men: 4.5 - 6.5 Women: 4 - 4.5"}
        measureUnit2={"x10⁶ / mm³"}
      />
      <RowC
        row={12}
        state={template.result}
        englishName={"Hemoglobin"}
        arabicName={"الخضاب"}
        measureUnit1={"g/dl"}
        range={`Men: 13 - 18  Women: 12 - 16`}
        measureUnit2={"g/dl"}
      />
      <RowC
        row={13}
        state={template.result}
        englishName={"Hematocrite"}
        arabicName={"الرسابة"}
        measureUnit1={"%"}
        range={"Men: 40 - 54 Women: 35 - 47"}
        measureUnit2={"%"}
      />
      <RowC
        row={14}
        state={template.result}
        englishName={"MCHC"}
        measureUnit1={"%"}
        range={"32 - 36"}
        measureUnit2={"%"}
      />
      <RowC
        row={15}
        state={template.result}
        englishName={"MCV"}
        measureUnit1={"fl"}
        range={"78 - 94"}
        measureUnit2={"fl"}
      />
      <RowC
        row={16}
        state={template.result}
        englishName={"MCH"}
        measureUnit1={"pg"}
        range={"27 - 31"}
        measureUnit2={"pg"}
      />
      <RowC
        row={17}
        state={template.result}
        englishName={"Platelets"}
        measureUnit1={"x10³ / mm³"}
        range={"150 - 450"}
        measureUnit2={"x10³ / mm³"}
      />
    </div>
  );
}

function RowA({
  englishName,
  arabicName,
  measureUnit1,
  range,
  state,

  row,
}) {
  return (
    <div className="grid grid-cols-11 text-sm  gap-2 w-full h-fit  items-center ">
      <div className="flex justify-between items-center col-span-3">
        {/* Name */}
        <span className="font-semibold">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-1 items-center col-span-2">
        {/* Input + Units */}
        <span
          className="w-[12ch] shadow-sm shadow-black text-black text-center bg-white  h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[16ch]">{measureUnit1}</span>
      </div>
      <span className="text-start col-span-2">
        {/* Range */}
        {range}
      </span>
      <span className="border-b border-black text-center col-span-2">
        القيم المطلقة
      </span>
      <div className="flex  justify-center items-center col-span-2">
        <div className="flex flex-col  items-center justify-center text-sm absolute right-[1.9rem] -top-[2.5rem]">
          <span>Last Test</span>
          <span className="">
            {true ? moment(new Date()).format("yyyy-MM-DD") : "-"}
          </span>
        </div>
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {true ? "1300" : "-"}
        </span>
      </div>
    </div>
  );
}
function RowB({
  englishName,
  arabicName,
  measureUnit1,
  range,
  measureUnit2,
  state,

  row,
}) {
  return (
    <div className="grid grid-cols-11 text-sm  gap-2 w-full h-fit  items-center ">
      <div className="flex  justify-between items-center col-span-3">
        {/* Name */}
        <span className=" pl-4">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-1 items-center col-span-2">
        {/* Input + Units */}
        <span
          className="w-[12ch] shadow-sm shadow-black text-black text-center bg-white  h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[16ch]">{measureUnit1}</span>
      </div>
      <div className="text-start flex flex-col  col-span-2">
        {/* Range */}
        {range.map((singleRange, index) => (
          <span key={index}>{singleRange}</span>
        ))}
      </div>
      <div className="flex gap-1 items-center col-span-2">
        {/* Input + Units */}
        <span
          className="w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit "
          dir="ltr"
        >
          {state[row + 1]}
        </span>
        <span>{measureUnit2}</span>
      </div>
      <div className="flex  justify-center items-center col-span-2">
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {true ? "1300" : "-"}
        </span>
      </div>
    </div>
  );
}
function RowC({
  arabicName,
  englishName,
  range,
  measureUnit1,
  measureUnit2,
  state,

  row,
}) {
  return (
    <div className="grid grid-cols-11 text-sm  gap-2 w-full h-fit  items-center ">
      <div className="flex  justify-between items-center  col-span-3">
        {/* Name */}
        <span className="font-semibold">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-1 items-center col-span-2">
        {/* Input + Units */}
        <span
          className="w-[12ch] shadow-sm shadow-black text-black text-center bg-white  h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[16ch]">{measureUnit1}</span>
      </div>
      <div className="flex  gap-2  col-span-4 ">
        <span>{range}</span>
        <span>{measureUnit2}</span>
      </div>
      <div className="flex  justify-center items-center col-span-2">
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {true ? "1300" : "-"}
        </span>
      </div>
    </div>
  );
}

export default HematologyCoagulationTemplatePrint;
