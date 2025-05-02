"use client";
import React from "react";
import moment from "moment";

function HematologyCoagulationLeucocytesTemplatePrint({
  template,
  lastTestResult,
  lastTestDate,
}) {
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
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
      />
      <RowB
        englishName={"Neutrophils"}
        arabicName={"العدلات"}
        measureUnit1={"%"}
        range={["Adult: 40-65", "Child: 30-50"]}
        measureUnit2={"/mm³"}
        row={1}
        state={template.result}
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
      />
      <RowB
        englishName={"Lymphocytes"}
        arabicName={"اللمفاويات"}
        measureUnit1={"%"}
        range={["Adult: 25-40", "Child: 30-60"]}
        measureUnit2={"/mm³"}
        row={3}
        state={template.result}
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
      />
      <RowB
        englishName={"Monocytes"}
        arabicName={"الوحيدات"}
        measureUnit1={"%"}
        range={["2 - 8"]}
        measureUnit2={"/mm³"}
        row={5}
        state={template.result}
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
      />
      <RowB
        englishName={"Eosinophils"}
        arabicName={"الحمضات"}
        measureUnit1={"%"}
        range={["0 - 4"]}
        measureUnit2={"/mm³"}
        row={7}
        state={template.result}
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
      />
      <RowB
        englishName={"Basophils"}
        arabicName={"الأسسات"}
        measureUnit1={"%"}
        range={["0 - 1"]}
        measureUnit2={"/mm³"}
        row={9}
        state={template.result}
        lastTestDate={lastTestDate}
        lastTestResult={lastTestResult}
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
  lastTestDate,
  lastTestResult,
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
          {state[row].trim() !== "" ? state[row] : "-"}
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
        <div className="flex flex-col  items-center justify-center text-sm absolute w-[80px] right-[1.4rem] -top-[2.5rem]">
          <span>Last Test</span>
          <span className="">
            {lastTestDate ? moment(lastTestDate).format("yyyy-MM-DD") : "-"}
          </span>
        </div>
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {lastTestDate ? lastTestResult[row] : "-"}
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
  lastTestResult,

  lastTestDate,
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
          {state[row].trim() !== "" ? state[row] : "-"}
        </span>
        <span className="w-[16ch]">{measureUnit1}</span>
      </div>
      <div className="text-start flex flex-col   col-span-2">
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
          {state[row + 1].trim() !== "" ? state[row + 1] : "-"}
        </span>
        <span>{measureUnit2}</span>
      </div>
      <div className="flex  justify-center items-center col-span-2">
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {lastTestDate ? lastTestResult[row] : "-"}
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
  lastTestResult,
  lastTestDate,
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
          {state[row].trim() !== "" ? state[row] : "-"}
        </span>
        <span className="w-[16ch]">{measureUnit1}</span>
      </div>
      <div className="flex  gap-2  col-span-4 ">
        <span>{range}</span>
        <span>{measureUnit2}</span>
      </div>
      <div className="flex  justify-center items-center col-span-2">
        <span className=" w-[10ch] shadow-sm shadow-black text-black text-center bg-white  h-fit">
          {lastTestDate ? lastTestResult[row] : "-"}
        </span>
      </div>
    </div>
  );
}

export default HematologyCoagulationLeucocytesTemplatePrint;
