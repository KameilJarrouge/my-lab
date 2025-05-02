"use client";
import React from "react";

function HematologyCoagulationLeucocytesTemplateResult({ template }) {
  return (
    <div className="flex flex-col gap-1 w-[80vw] h-fit p-2 " dir="ltr">
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
    <div className="grid grid-cols-4 gap-4 w-full h-fit p-2 items-center ">
      <div className="flex justify-between items-center">
        {/* Name */}
        <span>{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <span
          className="w-[20ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <span className="text-start">
        {/* Range */}
        {range}
      </span>
      <span className="border-b border-light_primary text-center">
        القيم المطلقة
      </span>
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
    <div className="grid grid-cols-4 gap-4 w-full h-fit p-2 items-center ">
      <div className="flex  justify-between items-center">
        {/* Name */}
        <span className=" pl-4">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <span
          className="w-[20ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <div className="text-start flex flex-col gap-1">
        {/* Range */}
        {range.map((singleRange, index) => (
          <span key={index}>{singleRange}</span>
        ))}
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <span
          className="w-[20ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {state[row + 1]}
        </span>
        <span>{measureUnit2}</span>
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
    <div className="grid grid-cols-4 gap-4 w-full h-fit p-2 items-center ">
      <div className="flex  justify-between items-center">
        {/* Name */}
        <span className="">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <span
          className="w-[20ch] text-white text-center bg-light_primary rounded h-fit "
          dir="ltr"
        >
          {state[row]}
        </span>
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <div className="flex  gap-2  col-span-2 ">
        <span>{range}</span>
        <span>{measureUnit2}</span>
      </div>
    </div>
  );
}

export default HematologyCoagulationLeucocytesTemplateResult;
