import React from "react";

const macros = [
  { arabicName: "الحموضة", englishName: "PH" },
  { arabicName: "اللزوجة", englishName: "Viscosity" },
  { arabicName: "الحجم", englishName: "Volume", unit: "ml" },
  { arabicName: "اللون", englishName: "Color" },
];

const micros1 = [
  { arabicName: "الأشكال الشاذة", englishName: "Abnormal Forms", unit: "%" },
  { arabicName: "الأشكال الطبيعية", englishName: "Normal Forms", unit: "%" },
  { arabicName: "التعداد", englishName: "Sperm Count", unit: "/ml" },
  {
    arabicName: "طلائع النطاف",
    englishName: "Spermatogenic Cells",
    unit: "/HPF",
  },
  { arabicName: "الكريات الحمر", englishName: "Erythrocytes", unit: "/HPF" },
  { arabicName: "الكريات البيض", englishName: "Leucocytes", unit: "/HPF" },
];

const micros2 = [
  { arabicName: "الحركة المباشرة", englishName: "Directl Motility" },
  { arabicName: "الحركة بعد ساعة", englishName: "Motility After 1 hr" },
  { arabicName: "الحركة بعد ساعتين", englishName: "Motility After 2 hr" },
];

function SemenAnalysisTemplatePrint({ template }) {
  return (
    <div
      className="flex flex-col  gap-5 border-b border-dashed border-gray-400 pb-1 w-full h-fit text-sm px-2 overflow-hidden"
      dir="ltr"
    >
      <span className="border-b border-text font-semibold w-fit">
        SEMEN ANALYSIS السائل المنوي
      </span>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="border-b border-text w-fit">
          Macroscopic Examination الفحص العياني
        </span>
        <div className="grid grid-cols-4 w-full ">
          {macros.map((macro, index) => (
            <Field
              key={index}
              arabicName={macro.arabicName}
              englishName={macro.englishName}
              result={template.result}
              unit={macro.unit}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="border-b border-text w-fit">
          Microscopic Examination الفحص المجهري
        </span>
        <div className="grid grid-cols-3 gap-y-4 w-full ">
          {micros1.map((micro, index) => (
            <Field
              key={index}
              arabicName={micro.arabicName}
              englishName={micro.englishName}
              result={template.result}
              unit={micro.unit}
            />
          ))}
        </div>

        <div className="flex gap-8 items-center w-[80%] justify-center ">
          <div className="flex flex-col items-end gap-0.5">
            <span className="invisible">{"hold"}</span>
            <span className="invisible">{"hold"} </span>
            <span className="w-[10ch] text-end py-1 rounded">Very Active</span>
            <span className="w-[10ch] text-end py-1 rounded">Active</span>
            <span className="w-[10ch] text-end py-1 rounded">Inactive</span>
          </div>
          {micros2.map((micro, index) => (
            <Field2
              key={index}
              arabicName={micro.arabicName}
              englishName={micro.englishName}
              result={template.result}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ arabicName, englishName, unit, result }) {
  return (
    <div className="flex gap-1 items-start justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <span>{arabicName}</span>
        <span>{englishName} </span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
          dir="ltr"
        >
          {result[englishName] || "-"}
        </span>
      </div>
      <span className="min-w-[5ch] self-end">{unit || ""}</span>
    </div>
  );
}

function Field2({ arabicName, englishName, result }) {
  return (
    <div className="flex gap-1 items-start justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <span>{arabicName}</span>
        <span>{englishName} </span>
        <span
          className="w-[15ch] text-black shadow shadow-black text-center py-1  rounded h-fit "
          dir="ltr"
        >
          {result[`${englishName} Very Active`] || "-"}
        </span>

        <span
          className="w-[15ch] text-black shadow shadow-black text-center py-1  rounded h-fit "
          dir="ltr"
        >
          {result[`${englishName} Active`] || "-"}
        </span>

        <span
          className="w-[15ch] text-black shadow shadow-black text-center py-1  rounded h-fit "
          dir="ltr"
        >
          {result[`${englishName} Inactive`] || "-"}
        </span>
      </div>
      <div className="flex flex-col items-center self-end gap-0.5">
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
      </div>
    </div>
  );
}

export default SemenAnalysisTemplatePrint;
