"use client";
import React, { useEffect } from "react";
import AutoCompleteSelect from "../../Inputs/AutoCompleteSelection";
import AuthButton from "../../Buttons/AuthButton";

function BloodTypeTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  useEffect(() => {
    console.log("result", result);
  }, [result]);

  return (
    <div className="flex flex-col gap-4 w-full h-fit" dir="ltr">
      <div className={"flex w-full gap-10 items-center px-4"}>
        <span className="w-[10ch]">Blood Group</span>
        <AutoCompleteSelect
          options={["A", "B", "AB", "O"]}
          state={result.bloodGroup}
          setState={(value) => setResult("bloodGroup", value, false)}
          withHoveringTitle={false}
          id="bloodGroup"
        />
        <span className="w-[10ch]">Rh</span>
        <AutoCompleteSelect
          options={["Positive", "Negative"]}
          state={result.Rh}
          setState={(value) => setResult("Rh", value, false)}
          withHoveringTitle={false}
          id="Rh"
        />
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <AuthButton
          title={`${isDirty ? "*" : ""} ${saveButtonTitle}`}
          onClick={() => {
            handleSave();
          }}
        />
        {isDirty && (
          <AuthButton
            title="استعادة"
            onClick={() => {
              handleRestore();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BloodTypeTemplateInput;
