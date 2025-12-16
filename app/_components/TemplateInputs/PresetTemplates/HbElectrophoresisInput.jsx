"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import TextInput from "../../Inputs/TextInput";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";

function HbElectrophoresisInput({
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
          <span className="font-semibold ">رحلان الخضاب</span>
          <span className="font-semibold " dir="ltr">
            Hb Electrophoresis
          </span>
        </div>
        <div className="flex flex-col gap-2 pr-2 w-full">
          <div className="flex gap-2 items-center" dir="ltr">
            <span className="w-[15ch]"></span>
            <span className="px-[7.5ch] py-1  rounded"></span>
            <span className="border-b border-b-light_primary">
              Expected Values
            </span>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">HbA1:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["HbA1"]}
                setState={(value) => setResult("HbA1", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>96.7 - 98.5 %</span>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">HbA2:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["HbA2"]}
                setState={(value) => setResult("HbA2", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>1.5 - 3.5 %</span>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="w-[15ch]">HbF:</span>
            <div className="w-[15ch]">
              <TextInput
                state={result["HbF"]}
                setState={(value) => setResult("HbF", value, false)}
                title={"Result"}
                className={"bg-transparent"}
                withHoveringTitle={false}
              />{" "}
            </div>
            <span>0 - %</span>
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

export default HbElectrophoresisInput;
