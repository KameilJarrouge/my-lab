"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import { GoDash, GoDotFill } from "react-icons/go";
import TextAreaInput from "../../Inputs/TextAreaInput";
import { MdRestore } from "react-icons/md";

function BloodFilmTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div className="flex flex-col gap-2" dir="rtl">
      <div className="flex flex-col gap-4 px-8">
        <div className="flex justify-between">
          <span className="font-semibold border-b border-text">
            دراسة لطاخة محيطية
          </span>
          <span className="font-semibold border-b border-text">Blood Film</span>
        </div>
        <div className="flex flex-col gap-2 pr-2">
          <div className="flex gap-2 items-center">
            <GoDotFill className="w-[0.5rem] h-fit" />
            <span className="border-b-[1px] border-text w-fit" dir="rtl">
              الكريات البيضاء (WBC) :
            </span>
          </div>
          <div
            className={`flex gap-2 items-center border-b ${
              shouldWarn && !result["WBC"]
                ? "border-b-warning"
                : "border-b-transparent"
            }`}
          >
            <GoDash className="w-[0.5rem] h-fit" />
            <TextAreaInput
              state={result["WBC"]}
              setState={(value) => setResult("WBC", value, false)}
              rows={4}
            />
            <button
              className="text-dark_text hover:text-text"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="استعادة الافتراضي"
              onClick={() =>
                setResult(
                  "WBC",
                  "طبيعية العدد والشكل والتفصص ولا يوجد أشكال شاذة.",
                  false
                )
              }
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <GoDotFill className="w-[0.5rem] h-fit" />
            <span className="border-b-[1px] border-text w-fit" dir="rtl">
              الكريات الحمراء (RBC) :
            </span>
          </div>
          <div
            className={`flex gap-2 items-center border-b ${
              shouldWarn && !result["RBC"]
                ? "border-b-warning"
                : "border-b-transparent"
            }`}
          >
            <GoDash className="w-[0.5rem] h-fit" />
            <TextAreaInput
              state={result["RBC"]}
              setState={(value) => setResult("RBC", value, false)}
              rows={4}
            />
            <button
              className="text-dark_text hover:text-text"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="استعادة الافتراضي"
              onClick={() =>
                setResult("RBC", "طبيعية الشكل والصباغ والحجم.", false)
              }
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <GoDotFill className="w-[0.5rem] h-fit" />
            <span className="border-b-[1px] border-text w-fit" dir="rtl">
              الصفيحات الدموية (Platelet) :
            </span>
          </div>
          <div
            className={`flex gap-2 items-center border-b ${
              shouldWarn && !result["Platelet"]
                ? "border-b-warning"
                : "border-b-transparent"
            }`}
          >
            <GoDash className="w-[0.5rem] h-fit" />
            <TextAreaInput
              state={result["Platelet"]}
              setState={(value) => setResult("Platelet", value, false)}
              rows={4}
            />
            <button
              className="text-dark_text hover:text-text"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="استعادة الافتراضي"
              onClick={() =>
                setResult("Platelet", "طبيعية الشكل والعدد والحجم.", false)
              }
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4" dir="ltr">
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

export default BloodFilmTemplateInput;
