import React from "react";
import AuthButton from "../../Buttons/AuthButton";
import AutoCompleteSelect from "../../Inputs/AutoCompleteSelection";

function PregnancyTestTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className={"flex items-center gap-10 px-4"} dir="ltr">
        <span className="w-fit">Pregnancy Test</span>
        <AutoCompleteSelect
          options={["Positive", "Negative"]}
          state={result.pregnancyResult}
          setState={(value) => setResult("pregnancyResult", value, false)}
          withHoveringTitle={false}
          id="pregnancyResult"
        />
      </div>
      <div className="w-full flex justify-center items-center gap-4" dir="ltr">
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

export default PregnancyTestTemplateInput;
