"use client";
import React, { useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import moment from "moment";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";

function ManualTemplateInput({ test, updateTemplate, lastTest }) {
  const [result, setResult] = useState(test.test.template.result?.value || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (result !== (test.test.template.result?.value || "")) {
      setIsDirty(true);
    }
  }, [result]);

  const handleRestore = () => {
    if (test.test.template.hasOwnProperty("result")) {
      setResult(test.test.template.result.value);
    } else {
      setResult("");
    }
    setIsDirty(false);
  };

  const handleSave = () => {
    if (result === "") {
      toast.error("يرجى إدخال نتيجة التحليل");
      return;
    }
    const readyTest = test;
    readyTest.test.template.result = { value: result };
    updateTemplate(readyTest);
    setIsDirty(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-4 items-center gap-5 " dir="ltr">
        <span className="w-full text-center">Result</span>
        <span className="w-full text-center">Reference Range</span>
        <span className="w-full text-center">Units</span>
        <span className="w-full text-center">Last Test</span>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-5 " dir="ltr">
        <div className="flex gap-2 items-center justify-center">
          <div className="max-w-[10ch]">
            <TextInput
              state={result}
              title={"Result"}
              withHoveringTitle={false}
              className={"p-1 bg-transparent border-b-dark_primary "}
              setState={(value) => {
                if (!isNaN(value)) setResult(value);
              }}
            />
          </div>
          <span>
            {Number(test.test.template.data.min) > Number(result)
              ? "L"
              : Number(test.test.template.data.max) < Number(result)
              ? "H"
              : ""}
          </span>
        </div>
        <span className="w-full text-center flex flex-col gap-2" dir="ltr">
          {test.test.template.data.referenceRange
            .split("\n")
            .filter((line) => line !== "")
            .map((line, index) => (
              <span key={index}>{line}</span>
            ))}
        </span>
        <span className="w-full text-center">
          {test.test.template.data.unit}
        </span>
        <div className="w-full  text-center relative">
          {/* {isLoading && (
            <div className="w-full h-full absolute top-0 left-0 z-50">
              <LoadingComponent
                loading={isLoading}
                className="w-[3rem] h-fit"
              />
            </div>
          )} */}
          {!!lastTest ? (
            <div className="flex items-center gap-2 justify-center">
              <span>{moment(new Date()).format("yyyy-MM-DD")}</span>
              <MdChevronRight />
              <span>{lastTest.template.result.value}</span>
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        {isDirty && <AuthButton title="استعادة" onClick={handleRestore} />}
        <AuthButton title={`حفظ ${isDirty ? "*" : ""}`} onClick={handleSave} />
      </div>
    </div>
  );
}

export default ManualTemplateInput;
