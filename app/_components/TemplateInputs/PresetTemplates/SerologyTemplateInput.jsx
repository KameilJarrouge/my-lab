"use client";
import React, { useEffect, useState } from "react";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import AuthButton from "../../Buttons/AuthButton";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function SerologyTemplateInput({
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
    const result = await api.get("/arbitrary/serology/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching options for serology in Input"
      );
      return;
    }
    setOptions(JSON.parse(result.data.result.Serology));
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="flex flex-col gap-6 " dir="ltr">
      <div className="w-full flex gap-8 px-4">
        <button
          className="flex gap-4 items-center"
          onClick={() => {
            if (saveButtonTitle === "تعديل") return;
            if ((result.selectedTest || "Both") === "Both") {
              setResult("selectedTest", "Widal", false);
            } else if ((result.selectedTest || "Both") === "Widal") {
              setResult("selectedTest", "Both", false);
            }
          }}
        >
          <span>اختبار رايت</span>
          {(result.selectedTest || "Both") === "Both" ||
          (result.selectedTest || "Both") === "Wright" ? (
            <MdCheckBox className="text-green-400" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-text" />
          )}
        </button>
        <button
          className="flex gap-4 items-center"
          onClick={() => {
            if (saveButtonTitle === "تعديل") return;
            if ((result.selectedTest || "Both") === "Both") {
              setResult("selectedTest", "Wright", false);
            } else if ((result.selectedTest || "Both") === "Wright") {
              setResult("selectedTest", "Both", false);
            }
          }}
        >
          <span>اختبار فيدال</span>
          {(result.selectedTest || "Both") === "Both" ||
          (result.selectedTest || "Both") === "Widal" ? (
            <MdCheckBox className="text-green-400" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-text" />
          )}
        </button>
      </div>
      {((result.selectedTest || "Both") === "Both" ||
        (result.selectedTest || "Both") === "Wright") && (
        <div className="flex items-center gap-4">
          <span> Wright T. اختبار رايت</span>
          <div className="w-fit gap-20 flex justify-between items-center">
            <div
              className={`w-fit gap-4 flex items-center border-b ${
                shouldWarn && !result["B. Abortus"]
                  ? `border-b-warning`
                  : `border-b-transparent`
              } `}
            >
              <span className="w-[10ch]">B. Abortus</span>
              <AutoCompleteInput
                title={"Result"}
                options={options["B. Abortus"] || []}
                state={result["B. Abortus"] || ""}
                setState={(value) => setResult("B. Abortus", value, false)}
                id={"B. Abortus"}
                withHoveringTitle={false}
              />
            </div>
            <div
              className={`w-fit gap-4 flex items-center border-b ${
                shouldWarn && !result["B. Melitensis"]
                  ? `border-b-warning`
                  : `border-b-transparent`
              } `}
            >
              <span className="w-[10ch]">B. Melitensis</span>
              <AutoCompleteInput
                title={"Result"}
                options={options["B. Melitensis"] || []}
                state={result["B. Melitensis"] || ""}
                setState={(value) => setResult("B. Melitensis", value, false)}
                id={"B. Melitensis"}
                withHoveringTitle={false}
              />
            </div>
          </div>
        </div>
      )}
      {((result.selectedTest || "Both") === "Both" ||
        (result.selectedTest || "Both") === "Widal") && (
        <div className="flex items-start  gap-4">
          <span className="content-start h-full"> Widal T. اختبار فيدال</span>
          <div className="flex flex-col gap-4">
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div
                className={`w-fit gap-4 flex items-center border-b ${
                  shouldWarn && !result["Typhi. ( O )"]
                    ? `border-b-warning`
                    : `border-b-transparent`
                } `}
              >
                <span className="w-[10ch]">Typhi. ( O )</span>
                <AutoCompleteInput
                  title={"Result"}
                  options={options["Typhi. ( O )"] || []}
                  state={result["Typhi. ( O )"] || ""}
                  setState={(value) => setResult("Typhi. ( O )", value, false)}
                  id={"Typhi. ( O )"}
                  withHoveringTitle={false}
                />
              </div>
              <div
                className={`w-fit gap-4 flex items-center border-b ${
                  shouldWarn && !result["Typhi. ( H )"]
                    ? `border-b-warning`
                    : `border-b-transparent`
                } `}
              >
                <span className="w-[10ch]">Typhi. ( H )</span>
                <AutoCompleteInput
                  title={"Result"}
                  options={options["Typhi. ( H )"] || []}
                  state={result["Typhi. ( H )"] || ""}
                  setState={(value) => setResult("Typhi. ( H )", value, false)}
                  id={"Typhi. ( H )"}
                  withHoveringTitle={false}
                />
              </div>
            </div>
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div
                className={`w-fit gap-4 flex items-center border-b ${
                  shouldWarn && !result["Para A ( H )"]
                    ? `border-b-warning`
                    : `border-b-transparent`
                } `}
              >
                <span className="w-[10ch]">Para A ( H )</span>
                <AutoCompleteInput
                  title={"Result"}
                  options={options["Para A ( H )"] || []}
                  state={result["Para A ( H )"] || ""}
                  setState={(value) => setResult("Para A ( H )", value, false)}
                  id={"Para A ( H )"}
                  withHoveringTitle={false}
                />
              </div>
              <div
                className={`w-fit gap-4 flex items-center border-b ${
                  shouldWarn && !result["Para B ( H )"]
                    ? `border-b-warning`
                    : `border-b-transparent`
                } `}
              >
                <span className="w-[10ch]">Para B ( H )</span>
                <AutoCompleteInput
                  title={"Result"}
                  options={options["Para B ( H )"] || []}
                  state={result["Para B ( H )"] || ""}
                  setState={(value) => setResult("Para B ( H )", value, false)}
                  id={"Para B ( H )"}
                  withHoveringTitle={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
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

export default SerologyTemplateInput;
