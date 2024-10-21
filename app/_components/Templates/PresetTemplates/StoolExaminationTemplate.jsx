import React from "react";

const template = [
  {
    englishName: "Color",
    arabicName: "اللون",
    type: "field",
  },
  {
    englishName: "Consistency",
    arabicName: "القوام",
    type: "field",
  },
  {
    type: "empty",
  },
  {
    englishName: "Ova",
    arabicName: "البيوض",
    type: "title",
  },
  {
    englishName: "Cysts",
    arabicName: "الكيسات",
    type: "title",
  },
  {
    englishName: "Trophozoites",
    arabicName: "الأتاريف",
    type: "title",
  },
  {
    englishName: "Ascaris Lumbricoides",
    arabicName: "الصفر الخراطيني",
    type: "field",
  },
  {
    englishName: "Entamoeba Histolytica",
    arabicName: "المتحولة الحالة للنسج",
    type: "field",
  },
  {
    englishName: "Entamoeba Histolytica",
    arabicName: "المتحولة الحالة للنسج",
    type: "field",
  },
  {
    englishName: "Trichocephalus",
    arabicName: "شعرية الرأس",
    type: "field",
  },
  {
    englishName: "Giardia Lamblia",
    arabicName: "الاجياردية اللمبلية",
    type: "field",
  },
  {
    englishName: "Giardia Lamblia",
    arabicName: "الاجياردية اللمبلية",
    type: "field",
  },
  {
    englishName: "Hymenolepis Nana",
    arabicName: "المحرشفة القزمة",
    type: "field",
  },
  {
    englishName: "Entamoeba Coli",
    arabicName: "المتحولة القولونية",
    type: "field",
  },
  {
    englishName: "Entamoeba Coli",
    arabicName: "المتحولة القولونية",
    type: "field",
  },
  {
    englishName: "Taenia",
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
    arabicName: "الكريات البيض",
    type: "field",
  },
  {
    englishName: "Starch Granules",
    arabicName: "حبيبات النشا",
    type: "field",
  },
  {
    englishName: "Mucus",
    arabicName: "المخاط",
    type: "field",
  },
  {
    englishName: "Erythrocytes",
    arabicName: "الكريات الحمر",
    type: "field",
  },
  {
    englishName: "Fat Globules",
    arabicName: "الدسم",
    type: "field",
  },
  {
    type: "empty",
  },
  {
    englishName: "Fungi",
    arabicName: "الفطور",
    type: "field",
  },
  {
    englishName: "Meat fibers",
    arabicName: "ألياف لحمية غير مهضومة",
    type: "field",
  },
  {
    type: "empty",
  },
];

function StoolExaminationTemplate() {
  return (
    <div
      className="flex flex-col w-full gap-4 h-full px-2 overflow-y-auto overflow-x-hidden"
      dir="ltr"
    >
      <div className="border-b border-b-light_primary w-fit">
        STOOL EXAMINATION تحليل البراز
      </div>
      <div className="grid grid-cols-3 gap-4">
        {template.map((item, index) => {
          switch (item.type) {
            case "field":
              return (
                <Field
                  key={index}
                  arabicName={item.arabicName}
                  englishName={item.englishName}
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

function Field({ englishName, arabicName }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <span className="px-12 py-1 bg-light_primary rounded">?</span>
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

export default StoolExaminationTemplate;
