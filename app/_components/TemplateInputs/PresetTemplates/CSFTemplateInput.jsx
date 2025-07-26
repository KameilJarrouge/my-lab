"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import TextInput from "../../Inputs/TextInput";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";

function CSFTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);

  const [options, setOptions] = useState([]);
  const getOptions = async () => {
    const result = await api.get("/arbitrary/csf/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching options for csf in Input"
      );
      return;
    }
    setOptions(JSON.parse(result.data.result.CSF));
  };

  useEffect(() => {
    getOptions();
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full" dir="ltr">
      <div className="flex flex-col gap-4 px-8">
        <div className="flex gap-2  w-full items-center" dir="rtl">
          <span className="font-semibold ">سائل دماغي شوكي</span>
          <span className="font-semibold " dir="ltr">
            (C.S.F.)
          </span>
        </div>
        <div className="flex flex-col gap-2 pr-2 w-full">
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">Color:</span>
            <AutoCompleteInput
              title={"Result"}
              options={options["Color"] || []}
              state={result["Color"] || ""}
              setState={(value) => setResult("Color", value, false)}
              id={"Color"}
              withHoveringTitle={false}
            />{" "}
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">Appearance:</span>
            <AutoCompleteInput
              title={"Result"}
              options={options["Appearance"] || []}
              state={result["Appearance"] || ""}
              setState={(value) => setResult("Appearance", value, false)}
              id={"Appearance"}
              withHoveringTitle={false}
            />{" "}
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">WBC:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["WBC"]}
                setState={(value) => setResult("WBC", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>up to 20 / mm³</span>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">RBC:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["RBC"]}
                setState={(value) => setResult("RBC", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>0 / mm³</span>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">Glucose:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["Glucose"]}
                setState={(value) => setResult("Glucose", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <div className="flex flex-col">
              <span>45-80 mg/dl</span>
              <span className="text-sm">(less than 20 mg of F.B.S)</span>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">Protein:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["Protein"]}
                setState={(value) => setResult("Protein", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>15 - 45 mg/dl</span>
          </div>
        </div>
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

export default CSFTemplateInput;
