import React from "react";

function HematologyCoagulationErythrocytesTemplate() {
  return (
    <div className="flex flex-col gap-4 w-full h-full px-2 overflow-y-auto overflow-x-hidden">
      <RowB
        englishName={"Erythrocytes"}
        arabicName={"الحمر"}
        measureUnit1={"x10⁶ / mm³"}
        range={"Men: 4.5 - 6.5 Women: 4 - 4.5"}
        measureUnit2={"x10⁶ / mm³"}
      />
      <RowB
        englishName={"Hemoglobin"}
        arabicName={"الخضاب"}
        measureUnit1={"g/dl"}
        range={"Men: 13 - 18 Women: 12 - 16"}
        measureUnit2={"g/dl"}
      />
      <RowB
        englishName={"Hematocrite"}
        arabicName={"الرسابة"}
        measureUnit1={"%"}
        range={"Men: 40 - 54 Women: 35 - 47"}
        measureUnit2={"%"}
      />
      <RowB
        englishName={"MCHC"}
        measureUnit1={"%"}
        range={"32 - 36"}
        measureUnit2={"%"}
      />
      <RowB
        englishName={"MCV"}
        measureUnit1={"fl"}
        range={"78 - 94"}
        measureUnit2={"fl"}
      />
      <RowB
        englishName={"MCH"}
        measureUnit1={"pg"}
        range={"27 - 31"}
        measureUnit2={"pg"}
      />
    </div>
  );
}

function RowA({ arabicName, englishName, measureUnit1, range, measureUnit2 }) {
  return (
    <div className="w-full  h-fit flex flex-row-reverse justify-between  items-center">
      <span className="w-[15ch] text-end pl-8">{englishName}</span>
      <span className="w-[10ch] text-center">{arabicName}</span>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
      <span className="w-[10ch] text-center">{measureUnit1}</span>
      <div className="flex flex-col w-[15ch] text-center">
        {range.map((singleRange, index) => (
          <span key={index}>{singleRange}</span>
        ))}
      </div>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
      <span className="w-[4ch] ">{measureUnit2}</span>
    </div>
  );
}

function RowB({ arabicName, englishName, range, measureUnit1, measureUnit2 }) {
  return (
    <div className="w-full  h-fit flex flex-row-reverse justify-between  items-center">
      <span className="w-[15ch] text-end ">{englishName}</span>
      <span className="w-[10ch] text-center">{arabicName}</span>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
      <div className="w-[10ch] text-nowrap text-center">{measureUnit1}</div>
      <div className="flex  gap-2 w-[38ch] justify-end text-end">
        <span>{measureUnit2}</span>
        <span>{range}</span>
      </div>
    </div>
  );
}

export default HematologyCoagulationErythrocytesTemplate;
