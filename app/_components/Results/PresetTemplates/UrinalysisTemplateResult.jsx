"use client";
import React from "react";
import AuthButton from "../../Buttons/AuthButton";

function UrinalysisTemplateResult({ template }) {
  return (
    <div className="flex flex-col items-end gap-4 w-[80vw] h-full px-2 ">
      <span className=" border-text w-fit">تحليل البول URINALYSIS</span>
      <div className="flex justify-between items-start  w-full">
        <div className="flex flex-col gap-4 w-[30%]">
          <Item1
            arabicName={"مولد اليوروبيلين"}
            englishName={"Urobilinogen"}
            state={template.result}
            row={7}
          />
          <Item1
            arabicName={"البليروبين"}
            englishName={"Bilirubin"}
            state={template.result}
            row={8}
          />
          <Item1
            arabicName={"النتريت"}
            englishName={"Nitrite"}
            state={template.result}
            row={9}
          />
          <Item1
            arabicName={"الكيتون"}
            englishName={"Ketone"}
            state={template.result}
            row={10}
          />
        </div>
        <div className="flex flex-col gap-4 w-[30%]">
          <Item1
            arabicName={"الغلوكوز"}
            englishName={"Glucose"}
            state={template.result}
            row={4}
          />
          <Item1
            arabicName={"البروتين"}
            englishName={"Protein"}
            state={template.result}
            row={5}
          />
          <Item1
            arabicName={"الخضاب"}
            englishName={"Hemoglobin"}
            state={template.result}
            row={6}
          />
        </div>
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <Item1
            arabicName={"اللون"}
            englishName={"Color"}
            state={template.result}
            row={0}
          />
          <Item1
            arabicName={"المظهر"}
            englishName={"Appearance"}
            state={template.result}
            row={1}
          />
          <Item2
            arabicName={"النقل النوعي"}
            englishName={"Specific Gravity"}
            state={template.result}
            row={2}
          />
          <Item2
            arabicName={"الحموضىة"}
            englishName={"pH"}
            state={template.result}
            row={3}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <span className=" border-text w-fit">
          الفحص المجهري Microscopic Examination
        </span>
        <div className="w-full flex justify-between items-start ">
          <div className="flex flex-col gap-4 w-[30%]">
            <Item4 state={template.result} row={19} englishName={"Bacteria"} />
          </div>
          <div className="flex flex-col gap-4 w-[30%] h-full">
            <Item4
              state={template.result}
              row={15}
              arabicName={"اكسالات الكالسيوم"}
              englishName={"Ca. Oxalate"}
            />
            <Item4
              state={template.result}
              row={16}
              arabicName={"اليورات"}
              englishName={"Urate"}
            />
            <Item4
              state={template.result}
              row={17}
              arabicName={"اليوريك اسيد"}
              englishName={"Uric Acid"}
            />
            <Item4
              state={template.result}
              row={18}
              arabicName={"الفوسفات"}
              englishName={"Phosphate"}
            />
          </div>
          <div className="flex flex-col gap-4 w-[30%]">
            <Item3
              state={template.result}
              row={11}
              arabicName={"الكريات البيض"}
              englishName={"Leucocytes"}
            />
            <Item3
              state={template.result}
              row={12}
              arabicName={"الكريات الحمر"}
              englishName={"Erythrocytes"}
            />
            <Item3
              state={template.result}
              row={13}
              arabicName={"الخلايا الظهارية"}
              englishName={"Epithelial Cells"}
            />
            <Item3
              state={template.result}
              row={14}
              arabicName={"الاسطوانات"}
              englishName={"Cylinders"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Item1({ arabicName, englishName, state, row }) {
  return (
    <div
      key={row}
      className={`w-full  h-fit flex justify-between items-center `}
    >
      <span
        className="w-[20ch] text-white text-center rounded bg-light_primary h-fit "
        dir="ltr"
      >
        {state[row]}
      </span>
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}
function Item2({ arabicName, englishName, state, row }) {
  return (
    <div className={`w-full  h-fit flex justify-between items-center `}>
      <span
        className="w-[20ch] text-white text-center rounded bg-light_primary h-fit "
        dir="ltr"
      >
        {state[row]}
      </span>
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}
function Item3({ arabicName, englishName, state, row }) {
  return (
    <div className={`w-full  h-fit flex justify-between items-center `}>
      <div
        className="w-[20ch] text-white text-center rounded bg-light_primary h-fit flex items-center justify-center gap-2 "
        dir="ltr"
      >
        {state[row]}
        <span>/field</span>
      </div>
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}
function Item4({ arabicName, englishName, state, row }) {
  return (
    <div className={`w-full  h-fit flex justify-between items-center  `}>
      <div
        className="w-[20ch] text-white text-center rounded bg-light_primary h-fit flex items-center justify-center gap-2 "
        dir="ltr"
      >
        <span>(</span>
        {state[row]}
        <span>)</span>
      </div>
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}

export default UrinalysisTemplateResult;
