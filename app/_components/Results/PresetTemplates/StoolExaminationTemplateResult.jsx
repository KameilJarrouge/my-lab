"use client";
import React from "react";

const templateArr = [
  {
    englishName: "Color",
    valueName: "Color",
    arabicName: "اللون",
    type: "field",
  },
  {
    englishName: "Consistency",
    valueName: "Consistency",
    arabicName: "القوام",
    type: "field",
  },
  {
    type: "empty",
  },
  {
    englishName: "Ova",
    valueName: "Ova",
    arabicName: "البيوض",
    type: "title",
  },
  {
    englishName: "Cysts",
    valueName: "Cysts",
    arabicName: "الكيسات",
    type: "title",
  },
  {
    englishName: "Trophozoites",
    valueName: "Trophozoites",
    arabicName: "الأتاريف",
    type: "title",
  },
  {
    englishName: "Ascaris Lumbricoides",
    valueName: "Ascaris Lumbricoides",
    arabicName: "الصفر الخراطيني",
    type: "field",
  },
  {
    englishName: "Entamoeba Histolytica",
    valueName: "Entamoeba Histolytica C",
    arabicName: "المتحولة الحالة للنسج",
    type: "field",
  },
  {
    englishName: "Entamoeba Histolytica",
    valueName: "Entamoeba Histolytica T",
    arabicName: "المتحولة الحالة للنسج",
    type: "field",
  },
  {
    englishName: "Trichocephalus",
    valueName: "Trichocephalus",
    arabicName: "شعرية الرأس",
    type: "field",
  },
  {
    englishName: "Giardia Lamblia",
    valueName: "Giardia Lamblia C",
    arabicName: "الاجياردية اللمبلية",
    type: "field",
  },
  {
    englishName: "Giardia Lamblia",
    valueName: "Giardia Lamblia T",
    arabicName: "الاجياردية اللمبلية",
    type: "field",
  },
  {
    englishName: "Hymenolepis Nana",
    valueName: "Hymenolepis Nana",
    arabicName: "المحرشفة القزمة",
    type: "field",
  },
  {
    englishName: "Entamoeba Coli",
    valueName: "Entamoeba Coli C",
    arabicName: "المتحولة القولونية",
    type: "field",
  },
  {
    englishName: "Entamoeba Coli",
    valueName: "Entamoeba Coli T",
    arabicName: "المتحولة القولونية",
    type: "field",
  },
  {
    englishName: "Taenia",
    valueName: "Taenia",
    arabicName: "الشريطية",
    type: "field",
  },
  {
    type: "empty",
  },
  {
    type: "empty",
  },
  {
    type: "empty",
  },
  {
    type: "line",
  },
  {
    type: "empty",
  },
  {
    englishName: "Leucocytes",
    valueName: "Leucocytes",
    arabicName: "الكريات البيض",
    type: "field",
  },
  {
    englishName: "Starch Granules",
    valueName: "Starch Granules",
    arabicName: "حبيبات النشا",
    type: "field",
  },
  {
    englishName: "Mucus",
    valueName: "Mucus",
    arabicName: "المخاط",
    type: "field",
  },
  {
    englishName: "Erythrocytes",
    valueName: "Erythrocytes",
    arabicName: "الكريات الحمر",
    type: "field",
  },
  {
    englishName: "Fat Globules",
    valueName: "Fat Globules",
    arabicName: "الدسم",
    type: "field",
  },
  {
    type: "empty",
  },
  {
    englishName: "Fungi",
    valueName: "Fungi",
    arabicName: "الفطور",
    type: "field",
  },
  {
    englishName: "Meat fibers",
    valueName: "Meat fibers",
    arabicName: "ألياف لحمية غير مهضومة",
    type: "field",
  },
  {
    type: "empty",
  },
];

function StoolExaminationTemplateResult({ template }) {
  return (
    <div className="flex flex-col w-full gap-4 h-full px-2 " dir="ltr">
      <div className="border-b border-b-light_primary w-fit">
        STOOL EXAMINATION تحليل البراز
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {templateArr.map((item, index) => {
          switch (item.type) {
            case "field":
              return (
                <Field
                  key={index}
                  arabicName={item.arabicName}
                  englishName={item.englishName}
                  value={template.result[item.valueName]}
                />
              );
            case "title":
              return (
                <Title
                  key={index}
                  arabicName={item.arabicName}
                  englishName={item.englishName}
                />
              );
            case "empty":
              return <div />;

            case "line":
              return (
                <div className="w-full border-b border-double border-b-light_primary" />
              );
          }
        })}
      </div>
    </div>
  );
}

function Field({ englishName, arabicName, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <span
        className="w-[20ch] text-white text-center rounded bg-light_primary h-fit "
        dir="ltr"
      >
        {value}
      </span>
    </div>
  );
}

function Title({ englishName, arabicName }) {
  return (
    <div className="flex gap-5 w-fit items-center border-b border-light_primary">
      <span>{englishName}</span>
      <span>{arabicName}</span>
    </div>
  );
}

export default StoolExaminationTemplateResult;
