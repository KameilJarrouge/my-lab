"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";
import AutoCompleteInput from "../Inputs/AutoCompleteInput";
import ToggleInput from "../Inputs/ToggleInput";
import DropMenu from "../Inputs/DropMenu";
import ManualTemplate from "../Templates/ManualTemplate";
import UrinalysisTemplate from "../Templates/PresetTemplates/UrinalysisTemplate";
import HematologyCoagulationTemplate from "../Templates/PresetTemplates/HematologyCoagulationTemplate";

function CreateTestForm({ submit, categories = [] }) {
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [category, setCategory] = useState("");
  const [template, setTemplate] = useState(undefined);
  const [templateType, setTemplateType] = useState("قالب يدوي");
  const [staticTemplate, setStaticTemplate] = useState(
    "تحليل البول Urinalysis"
  );

  const handleSubmit = async () => {
    await submit(name, units, category, template, templateType, staticTemplate);
  };

  useEffect(() => {
    if (templateType === "قالب يدوي")
      setTemplate({ min: "", max: "", referenceRange: "", unit: "" });
    else setTemplate({});
  }, [templateType]);

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col items-center gap-8 w-fit py-2 px-4 h-full bg-dark_primary rounded">
        <Title>تحليل جديد</Title>
        <div className="flex flex-col gap-6 h-full justify-between ">
          <div className="flex flex-col gap-6">
            <TextInput state={name} setState={setName} title={"اسم التحليل"} />
            <div className="w-full flex gap-2 items-center">
              <TextInput
                title={"عدد الوحدات"}
                state={units}
                setState={setUnits}
              />
            </div>
            <AutoCompleteInput
              state={category}
              setState={setCategory}
              title={"التصنيف"}
              options={categories.map((category) => category.name)}
            />
          </div>
          <AuthButton title="إضافة" onClick={handleSubmit} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-fit min-w-[60rem] py-2 px-4 h-full bg-dark_primary rounded">
        <Title>قالب التحليل</Title>
        <div className="w-full h-[15%] flex items-start justify-between gap-2">
          <div className="w-[22ch] h-fit">
            <ToggleInput
              selectedValue={templateType}
              setSelectedValue={setTemplateType}
              value1="قالب يدوي"
              value2="قالب جاهز"
            />
          </div>
          {templateType === "قالب جاهز" && (
            <DropMenu
              state={staticTemplate}
              setState={setStaticTemplate}
              title="القوالب الجاهزة"
              uniqueName="template"
              options={["تحليل البول Urinalysis", "Hematology - Coagulation"]}
            />
          )}
        </div>
        <div className="w-full h-[85%]">
          {/* Template */}
          {templateType === "قالب يدوي" ? (
            <ManualTemplate state={template} setState={setTemplate} />
          ) : (
            {
              "تحليل البول Urinalysis": <UrinalysisTemplate />,
              "Hematology - Coagulation": <HematologyCoagulationTemplate />,
            }[staticTemplate]
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTestForm;
