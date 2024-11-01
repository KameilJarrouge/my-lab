"use client";
import React, { useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import moment from "moment";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";
import api from "@/app/_lib/api";

function ManualTemplateInputUpdate({
  visitTest,
  lastTest,
  triggerRefresh,
  setIsLoading,
}) {
  const [result, setResult] = useState(visitTest.template.result?.value || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (result !== (visitTest.template.result?.value || "")) {
      setIsDirty(true);
    }
  }, [result]);

  const handleRestore = () => {
    if (visitTest.template.hasOwnProperty("result")) {
      setResult(visitTest.template.result.value);
    } else {
      setResult("");
    }
    setIsDirty(false);
  };

  const handleSave = async () => {
    if (result === "") {
      toast.error("يرجى إدخال نتيجة التحليل");
      return;
    }

    setIsLoading(true);
    const newTemplate = structuredClone(visitTest.template);
    newTemplate.result = { value: Number(result) };
    const updateResult = await api.put(
      `/visit-tests/${visitTest.id}/update-template`,
      { template: JSON.stringify(newTemplate) }
    );

    if (!updateResult.data.success) {
      toast.error("Check the console");
      console.error("Something went wrong while updating visitTest template");
      return;
    }
    toast("تم تعديل التحليل");
    triggerRefresh();
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
            {/* {Number(visitTest.template.data.min) <= Number(result)
              ? Number(visitTest.template.data.max) >= Number(result)
                ? ""
                : "H"
              : "L"} */}
            {`${
              isNaN(Number(visitTest.template.data.min)) ||
              visitTest.template.data.min === "" ||
              isNaN(Number(visitTest.template.data.max)) ||
              visitTest.template.data.max === "" ||
              isNaN(Number(result)) ||
              result === ""
                ? ``
                : `${
                    Number(visitTest.template.data.min) <= Number(result)
                      ? Number(visitTest.template.data.max) >= Number(result)
                        ? ""
                        : visitTest.template.data.maxTitle || ""
                      : visitTest.template.data.minTitle || ""
                  }`
            }`}
          </span>
        </div>
        <span className="w-full text-center flex flex-col gap-2" dir="ltr">
          {visitTest.template.data.referenceRange
            .split("\n")
            .filter((line) => line !== "")
            .map((line, index) => (
              <span key={index}>{line}</span>
            ))}
        </span>
        <span className="w-full text-center">
          {visitTest.template.data.unit}
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
        <AuthButton
          title={`تعديل ${isDirty ? "*" : ""}`}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}

export default ManualTemplateInputUpdate;
