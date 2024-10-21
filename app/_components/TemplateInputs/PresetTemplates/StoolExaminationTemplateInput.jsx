"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";

const template = [
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

function StoolExaminationTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  const [options, setOptions] = useState({});

  const getOptions = async () => {
    const result = await api.get("/arbitrary/stool/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching options for stool examination in Input"
      );
      return;
    }
    console.log(
      "result.data.result.StoolExamination",
      result.data.result.StoolExamination
    );
    setOptions(JSON.parse(result.data.result.StoolExamination));
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 h-full px-2 " dir="ltr">
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
                  valueName={item.valueName}
                  result={result}
                  setResult={setResult}
                  shouldWarn={shouldWarn}
                  options={options[item.valueName]}
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
      <div className="w-full flex justify-center items-center gap-4">
        <AuthButton
          title={`${isDirty ? "*" : ""} ${saveButtonTitle}`}
          onClick={() => {
            setShouldWarn(true);
            handleSave();
          }}
        />
        {isDirty && (
          <AuthButton
            title="استعادة"
            onClick={() => {
              handleRestore();
              setShouldWarn(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Field({
  englishName,
  arabicName,
  valueName,
  result,
  setResult,
  shouldWarn,
  options = [],
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <div
        className={`w-[20ch] border-b ${
          shouldWarn && !result[valueName]
            ? " border-b-warning"
            : " border-transparent"
        }`}
      >
        <AutoCompleteInput
          title={"Result"}
          options={options}
          state={result[valueName] || ""}
          setState={(value) => setResult(valueName, value, false)}
          id={valueName}
          withHoveringTitle={false}
        />{" "}
      </div>
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

export default StoolExaminationTemplateInput;
