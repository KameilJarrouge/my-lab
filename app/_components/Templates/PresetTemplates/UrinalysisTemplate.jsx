import React from "react";

function UrinalysisTemplate() {
  return (
    <div className="flex flex-col items-end gap-4 w-full h-[80%] px-2 overflow-y-auto overflow-x-hidden">
      <span className="border-b border-text w-fit">تحليل البول URINALYSIS</span>
      <div className="flex justify-between items-start  w-full">
        <div className="flex flex-col gap-4 w-[30%]">
          <Item arabicName={"مولد اليوروبيلين"} englishName={"Urobilinogen"} />
          <Item arabicName={"البليروبين"} englishName={"Bilirubin"} />
          <Item arabicName={"النتريت"} englishName={"Nitrite"} />
          <Item arabicName={"الكيتون"} englishName={"Ketone"} />
        </div>
        <div className="flex flex-col gap-4 w-[30%]">
          <Item arabicName={"الغلوكوز"} englishName={"Glucose"} />
          <Item arabicName={"البروتين"} englishName={"Protein"} />
          <Item arabicName={"الخضاب"} englishName={"Hemoglobin"} />
        </div>
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <Item arabicName={"اللون"} englishName={"Color"} />
          <Item arabicName={"المظهر"} englishName={"Appearance"} />
          <Item arabicName={"النقل النوعي"} englishName={"Specific Gravity"} />
          <Item arabicName={"الحموضىة"} englishName={"pH"} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <span className="border-b border-text w-fit">
          الفحص المجهري Microscopic Examination
        </span>
        <div className="w-full flex justify-between items-start ">
          <div className="flex flex-col gap-4 w-[30%]">
            <Item englishName={"Bacteria"} />
          </div>
          <div className="flex flex-col gap-4 w-[30%] h-full">
            <Item
              arabicName={"اكسالات الكالسيوم"}
              englishName={"Ca. Oxalate"}
            />
            <Item arabicName={"اليورات"} englishName={"Urate"} />
            <Item arabicName={"اليوريك اسيد"} englishName={"Uric Acid"} />
            <Item arabicName={"الفوسفات"} englishName={"Phosphate"} />
          </div>
          <div className="flex flex-col gap-4 w-[30%]">
            <Item arabicName={"الكريات البيض"} englishName={"Leucocytes"} />
            <Item arabicName={"الكريات الحمر"} englishName={"Erythrocytes"} />
            <Item
              arabicName={"الخلايا الظهارية"}
              englishName={"Epithelial Cells"}
            />
            <Item arabicName={"الاسطوانات"} englishName={"Cylinders"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ arabicName, englishName }) {
  return (
    <div className="w-full max-w-[40ch] h-fit flex justify-between items-center">
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
    </div>
  );
}

export default UrinalysisTemplate;
