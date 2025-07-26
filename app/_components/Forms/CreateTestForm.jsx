"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import AutoCompleteInput from "../Inputs/AutoCompleteInput";
import ToggleInput from "../Inputs/ToggleInput";
import DropMenu from "../Inputs/DropMenu";
import ManualTemplate from "../Templates/ManualTemplate";
import UrinalysisTemplate from "../Templates/PresetTemplates/UrinalysisTemplate";
import HematologyCoagulationTemplate from "../Templates/PresetTemplates/HematologyCoagulationTemplate";
import CultureAndSensitivityTemplate from "../Templates/PresetTemplates/CultureAndSensitivityTemplate";
import SerologyTemplate from "../Templates/PresetTemplates/SerologyTemplate";
import SemenAnalysisTemplate from "../Templates/PresetTemplates/SemenAnalysisTemplate";
import BloodTypeTemplate from "../Templates/PresetTemplates/BloodTypeTemplate";
import PTTemplate from "../Templates/PresetTemplates/PTTemplate";
import PTTTemplate from "../Templates/PresetTemplates/PTTTemplate";
import PregnancyTestTemplate from "../Templates/PresetTemplates/PregnancyTestTemplate";
import ESRTemplate from "../Templates/PresetTemplates/ESRTemplate";
import BilirubinTemplate from "../Templates/PresetTemplates/BilirubinTemplate";
import ProteinTemplate from "../Templates/PresetTemplates/ProteinTemplate";
import StoolExaminationTemplate from "../Templates/PresetTemplates/StoolExaminationTemplate";
import HemoglobinTemplate from "../Templates/PresetTemplates/HemoglobinTemplate";
import BloodFilmTemplate from "../Templates/PresetTemplates/BloodFilmTemplate";
import HematologyCoagulationLeucocytesTemplate from "../Templates/PresetTemplates/HematologyCoagulationLeucocytesTemplate";
import HematologyCoagulationErythrocytesTemplate from "../Templates/PresetTemplates/HematologyCoagulationErythrocytesTemplate";
import CSFTemplate from "../Templates/PresetTemplates/CSFTemplate";

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
      setTemplate({
        min: "",
        minTitle: "L",
        max: "",
        maxTitle: "H",
        referenceRange: "",
        unit: "",
      });
    else setTemplate({});
  }, [templateType]);

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col items-center gap-8 w-fit min-w-[20rem] py-2 px-4 h-full bg-dark_primary rounded">
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
      <div className="flex flex-col items-center gap-4 w-fit min-w-[60rem] py-2 px-4 h-full bg-dark_primary rounded">
        <Title>قالب التحليل</Title>
        <div className="flex flex-col gap-4 w-full h-[calc(100%-4rem)]">
          <div className="w-full h-[2rem] flex items-start justify-between gap-2">
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
                options={[
                  "تحليل البول Urinalysis",
                  "Hematology - Coagulation",
                  "Hematology - Coagulation - Leucocytes",
                  "Hematology - Coagulation - Erythrocytes",
                  "Culture And Sensitivity",
                  "Serology",
                  "Semen Analysis",
                  "Blood Type",
                  "Prothrombin Time (PT)",
                  "Partial Thromboplastin Time (PTT)",
                  "Pregnancy Test",
                  "ESR",
                  "Bilirubin",
                  "Protein",
                  "Stool Examination",
                  "Hemoglobin",
                  "Blood Film",
                  "CSF",
                ]}
              />
            )}
          </div>
          <div className="w-full h-[calc(100%-2rem)] ">
            {/* Template */}
            {templateType === "قالب يدوي" ? (
              <ManualTemplate
                state={template}
                setState={setTemplate}
                testName={name}
              />
            ) : (
              {
                "تحليل البول Urinalysis": <UrinalysisTemplate />,
                "Hematology - Coagulation": <HematologyCoagulationTemplate />,
                "Hematology - Coagulation - Leucocytes": (
                  <HematologyCoagulationLeucocytesTemplate />
                ),
                "Hematology - Coagulation - Erythrocytes": (
                  <HematologyCoagulationErythrocytesTemplate />
                ),
                "Culture And Sensitivity": <CultureAndSensitivityTemplate />,
                Serology: <SerologyTemplate />,
                "Semen Analysis": <SemenAnalysisTemplate />,
                "Blood Type": <BloodTypeTemplate />,
                "Prothrombin Time (PT)": <PTTemplate />,
                "Partial Thromboplastin Time (PTT)": <PTTTemplate />,
                "Pregnancy Test": <PregnancyTestTemplate />,
                ESR: <ESRTemplate />,
                Bilirubin: <BilirubinTemplate />,
                Protein: <ProteinTemplate />,
                "Stool Examination": <StoolExaminationTemplate />,
                Hemoglobin: <HemoglobinTemplate />,
                "Blood Film": <BloodFilmTemplate />,
                CSF: <CSFTemplate />,
              }[staticTemplate]
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTestForm;
