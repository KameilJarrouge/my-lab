"use client";
import React from "react";

function HematologyCoagulationErythrocytesTemplateResult({ template }) {
  return (
    <div className="flex flex-col gap-1 w-[80vw] h-fit p-2 " dir="ltr">
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
        range={"Men: 13 - 18 Women: 12 - 16"}
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

export default HematologyCoagulationErythrocytesTemplateResult;
