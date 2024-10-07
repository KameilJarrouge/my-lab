"use client";
import React from "react";
import AuthButton from "../../Buttons/AuthButton";

function UrinalysisTemplatePrint({ template }) {
  return (
    <div className="flex flex-col items-end gap-0.5 w-full h-full  border-b border-dashed border-gray-400  ">
      <span className=" border-black border-b w-fit font-semibold">
        تحليل البول URINALYSIS
      </span>
      <div className="flex justify-between items-start  w-full">
        <div className="flex flex-col gap-0.5 w-[30%]">
          <Item1
            arabicName={"مولد اليوروبيلين"}
            englishName={"Urobilinogen"}
            state={template.result}
            row={"Urobilinogen"}
          />
          <Item1
            arabicName={"البليروبين"}
            englishName={"Bilirubin"}
            state={template.result}
            row={"Bilirubin"}
          />
          <Item1
            arabicName={"النتريت"}
            englishName={"Nitrite"}
            state={template.result}
            row={"Nitrite"}
          />
          <Item1
            arabicName={"الكيتون"}
            englishName={"Ketone"}
            state={template.result}
            row={"Ketone"}
          />
        </div>
        <div className="flex flex-col gap-0.5 w-[30%]">
          <Item1
            arabicName={"الغلوكوز"}
            englishName={"Glucose"}
            state={template.result}
            row={"Glucose"}
          />
          <Item1
            arabicName={"البروتين"}
            englishName={"Protein"}
            state={template.result}
            row={"Protein"}
          />
          <Item1
            arabicName={"الخضاب"}
            englishName={"Hemoglobin"}
            state={template.result}
            row={"Hemoglobin"}
          />
        </div>
        <div className="flex flex-col gap-0.5 w-[30%] h-full">
          <Item1
            arabicName={"اللون"}
            englishName={"Color"}
            state={template.result}
            row={"Color"}
          />
          <Item1
            arabicName={"المظهر"}
            englishName={"Appearance"}
            state={template.result}
            row={"Appearance"}
          />
          <Item2
            arabicName={"النقل النوعي"}
            englishName={"Specific Gravity"}
            state={template.result}
            row={"Specific Gravity"}
          />
          <Item2
            arabicName={"الحموضىة"}
            englishName={"pH"}
            state={template.result}
            row={"pH"}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <span className=" border-black border-b w-fit text-sm font-semibold">
          الفحص المجهري Microscopic Examination
        </span>
        <div className="w-full flex justify-between items-start ">
          <div className="flex flex-col gap-5  w-[30%] mt-[0.75rem]">
            {(template.result.Dynamic || []).map((dField, index) => {
              if (index >= 4) return;
              return (
                <Item1
                  key={index}
                  state={dField}
                  row={"value"}
                  englishName={dField.name}
                />
              );
            })}
          </div>
          <div className="flex flex-col  w-[30%] h-full ">
            <Item4
              state={template.result}
              row={"Ca. Oxalate"}
              arabicName={"اكسالات الكالسيوم"}
              englishName={"Ca. Oxalate"}
            />
            <Item4
              state={template.result}
              row={"Urate"}
              arabicName={"اليورات"}
              englishName={"Urate"}
            />
            <Item4
              state={template.result}
              row={"Uric Acid"}
              arabicName={"اليوريك اسيد"}
              englishName={"Uric Acid"}
            />
            <Item4
              state={template.result}
              row={"Phosphate"}
              arabicName={"الفوسفات"}
              englishName={"Phosphate"}
            />
          </div>
          <div className="flex flex-col  w-[30%]">
            <Item3
              state={template.result}
              row={"Leucocytes"}
              arabicName={"الكريات البيض"}
              englishName={"Leucocytes"}
            />
            <Item3
              state={template.result}
              row={"Erythrocytes"}
              arabicName={"الكريات الحمر"}
              englishName={"Erythrocytes"}
            />
            <Item3
              state={template.result}
              row={"Epithelial Cells"}
              arabicName={"الخلايا الظهارية"}
              englishName={"Epithelial Cells"}
            />
            <Item3
              state={template.result}
              row={"Cylinders"}
              arabicName={"الاسطوانات"}
              englishName={"Cylinders"}
            />
          </div>
        </div>
      </div>
      <div
        className="w-full flex justify-between flex-wrap gap-x-8 pt-1 pb-1 gap-y-3"
        dir="ltr"
      >
        {(template.result.Dynamic || []).map((dField, index, arr) => {
          if (index < 4) return;
          let length = arr.length - 4;
          if (length % 3 === 2 && index === arr.length - 1) {
            return (
              <>
                <div key={index} className="w-[30%] " dir="rtl">
                  <Item1
                    state={dField}
                    row={"value"}
                    englishName={dField.name}
                  />
                </div>
                <div key={-1 * index} className="w-[30%] invisible " dir="rtl">
                  <Item1
                    state={dField}
                    row={"value"}
                    englishName={dField.name}
                  />
                </div>
              </>
            );
          } else {
            return (
              <div key={index} className="w-[30%] " dir="rtl">
                <Item1 state={dField} row={"value"} englishName={dField.name} />
              </div>
            );
          }
        })}
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
        className="w-[13ch] text-sm shadow-sm shadow-black text-black text-center   h-fit "
        dir="ltr"
      >
        {state[row].trim() !== "" ? state[row] : "-"}
      </span>
      <div className="flex flex-col  text-left text-sm">
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
        className="w-[13ch] text-sm shadow-sm shadow-black text-black text-center   h-fit "
        dir="ltr"
      >
        {state[row].trim() !== "" ? state[row] : "-"}
      </span>
      <div className="flex flex-col  text-left text-sm">
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
        className="w-[13ch] text-sm shadow-sm shadow-black text-black text-center   h-fit flex items-center justify-center gap-2 "
        dir="ltr"
      >
        {state[row].trim() !== "" ? state[row] : "-"}
        <span>/field</span>
      </div>
      <div className="flex flex-col  text-left text-sm">
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
        className="w-[13ch] text-sm shadow-sm shadow-black text-black text-center   h-fit flex items-center justify-center gap-2 "
        dir="ltr"
      >
        <span>(</span>
        {state[row].trim() !== "" ? state[row] : "-"}
        <span>)</span>
      </div>
      <div className="flex flex-col  text-left text-sm">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}

export default UrinalysisTemplatePrint;
