"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import DropMenu from "../../Inputs/DropMenu";
import TextInput from "../../Inputs/TextInput";

function UrinalysisTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div
      className="flex flex-col items-start gap-4 w-full h-full px-2 "
      dir="ltr"
    >
      <span className="border-b border-text w-fit ">
        تحليل البول URINALYSIS
      </span>
      <div className="flex justify-between items-start  w-full">
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"اللون"}
            options={["Yellow", "Red"]}
            englishName={"Color"}
            state={result}
            setState={setResult}
            row={0}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"المظهر"}
            options={["Clear"]}
            englishName={"Appearance"}
            state={result}
            setState={setResult}
            row={1}
          />
          <Item2
            shouldWarn={shouldWarn}
            arabicName={"النقل النوعي"}
            englishName={"Specific Gravity"}
            state={result}
            setState={setResult}
            row={2}
          />
          <Item2
            shouldWarn={shouldWarn}
            arabicName={"الحموضىة"}
            englishName={"pH"}
            state={result}
            setState={setResult}
            row={3}
          />
        </div>

        <div className="flex flex-col gap-4 w-[30%]">
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"الغلوكوز"}
            options={["Pos.", "Normal", "Neg."]}
            englishName={"Glucose"}
            state={result}
            setState={setResult}
            row={4}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"البروتين"}
            options={["Pos.", "Normal", "Neg."]}
            englishName={"Protein"}
            state={result}
            setState={setResult}
            row={5}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"الخضاب"}
            options={["Pos.", "Normal", "Neg."]}
            englishName={"Hemoglobin"}
            state={result}
            setState={setResult}
            row={6}
          />
        </div>
        <div className="flex flex-col gap-4 w-[30%]">
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"مولد اليوروبيلين"}
            englishName={"Urobilinogen"}
            state={result}
            setState={setResult}
            options={["Pos.", "Normal", "Neg."]}
            row={7}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"البليروبين"}
            englishName={"Bilirubin"}
            state={result}
            options={["Pos.", "Normal", "Neg."]}
            setState={setResult}
            row={8}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"النتريت"}
            options={["Pos.", "Normal", "Neg."]}
            englishName={"Nitrite"}
            state={result}
            setState={setResult}
            row={9}
          />
          <Item1
            shouldWarn={shouldWarn}
            arabicName={"الكيتون"}
            options={["Pos.", "Normal", "Neg."]}
            englishName={"Ketone"}
            state={result}
            setState={setResult}
            row={10}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <span className="border-b border-text w-fit">
          الفحص المجهري Microscopic Examination
        </span>
        <div className="w-full flex justify-between items-start ">
          <div className="flex flex-col gap-4 w-[30%]">
            <Item3
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={11}
              arabicName={"الكريات البيض"}
              englishName={"Leucocytes"}
            />
            <Item3
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={12}
              arabicName={"الكريات الحمر"}
              englishName={"Erythrocytes"}
            />
            <Item3
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={13}
              arabicName={"الخلايا الظهارية"}
              englishName={"Epithelial Cells"}
            />
            <Item3
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={14}
              arabicName={"الاسطوانات"}
              englishName={"Cylinders"}
            />
          </div>
          <div className="flex flex-col gap-4 w-[30%] h-full">
            <Item4
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={15}
              arabicName={"اكسالات الكالسيوم"}
              englishName={"Ca. Oxalate"}
            />
            <Item4
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={16}
              arabicName={"اليورات"}
              englishName={"Urate"}
            />
            <Item4
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={17}
              arabicName={"اليوريك اسيد"}
              englishName={"Uric Acid"}
            />
            <Item4
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={18}
              arabicName={"الفوسفات"}
              englishName={"Phosphate"}
            />
          </div>

          <div className="flex flex-col gap-4 w-[30%]">
            <Item4
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              row={19}
              englishName={"Bacteria"}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        {isDirty && (
          <AuthButton
            title="استعادة"
            onClick={() => {
              handleRestore();
              setShouldWarn(false);
            }}
          />
        )}
        <AuthButton
          title={`${saveButtonTitle} ${isDirty ? "*" : ""}`}
          onClick={() => {
            setShouldWarn(true);
            handleSave();
          }}
        />
      </div>
    </div>
  );
}

function Item1({
  arabicName,
  englishName,
  state,
  setState,
  row,
  options,
  shouldWarn,
}) {
  return (
    <div
      key={row}
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <span className="w-[20ch] h-fit " dir="ltr">
        <DropMenu
          uniqueName={row}
          options={options}
          state={state[row] || "Result"}
          setState={(value) => setState(row, value, false)}
        />
      </span>
    </div>
  );
}
function Item2({ arabicName, englishName, state, setState, row, shouldWarn }) {
  return (
    <div
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <span className="w-[20ch] h-fit " dir="ltr">
        <TextInput
          title={"Result"}
          state={state[row]}
          setState={(value) => setState(row, value, true)}
          className={"bg-transparent"}
          withHoveringTitle={false}
        />
      </span>
    </div>
  );
}
function Item3({ arabicName, englishName, state, setState, row, shouldWarn }) {
  return (
    <div
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <div className="w-[20ch] h-fit flex items-center gap-2 " dir="ltr">
        <TextInput
          title={"Result"}
          state={state[row]}
          setState={(value) => setState(row, value, false)}
          className={"bg-transparent"}
          withHoveringTitle={false}
        />
        <span>/field</span>
      </div>
    </div>
  );
}
function Item4({ arabicName, englishName, state, setState, row, shouldWarn }) {
  return (
    <div
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <div className="w-[20ch] h-fit flex items-center gap-2 " dir="ltr">
        <span>(</span>
        <TextInput
          title={"Result"}
          state={state[row]}
          setState={(value) => setState(row, value, false)}
          className={"bg-transparent text-center"}
          withHoveringTitle={false}
        />
        <span>)</span>
      </div>
    </div>
  );
}

export default UrinalysisTemplateInput;
