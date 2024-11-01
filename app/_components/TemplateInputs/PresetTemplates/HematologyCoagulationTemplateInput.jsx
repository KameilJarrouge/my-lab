"use client";
import React, { useEffect, useState } from "react";
import TextInput from "../../Inputs/TextInput";
import { MdCalculate, MdChevronRight } from "react-icons/md";
import AuthButton from "../../Buttons/AuthButton";
import moment from "moment";

function HematologyCoagulationTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  lastTest,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full h-fit p-2 " dir="ltr">
      <RowA
        lastTest={lastTest}
        englishName={"Leucocytes"}
        arabicName={"البيض"}
        measureUnit1={"/mm³"}
        range={"4500 - 10200"}
        row={0}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowB
        lastTest={lastTest}
        englishName={"Neutrophils"}
        arabicName={"العدلات"}
        measureUnit1={"%"}
        range={["Adult: 40-65", "Child: 30-50"]}
        measureUnit2={"/mm³"}
        row={1}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowB
        lastTest={lastTest}
        englishName={"Lymphocytes"}
        arabicName={"اللمفاويات"}
        measureUnit1={"%"}
        range={["Adult: 25-40", "Child: 30-60"]}
        measureUnit2={"/mm³"}
        row={3}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowB
        lastTest={lastTest}
        englishName={"Monocytes"}
        arabicName={"الوحيدات"}
        measureUnit1={"%"}
        range={["2 - 8"]}
        measureUnit2={"/mm³"}
        row={5}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowB
        lastTest={lastTest}
        englishName={"Eosinophils"}
        arabicName={"الحمضات"}
        measureUnit1={"%"}
        range={["0 - 4"]}
        measureUnit2={"/mm³"}
        row={7}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowB
        lastTest={lastTest}
        englishName={"Basophils"}
        arabicName={"الأسسات"}
        measureUnit1={"%"}
        range={["0 - 1"]}
        measureUnit2={"/mm³"}
        row={9}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
      />
      <RowC
        lastTest={lastTest}
        row={11}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"Erythrocytes"}
        arabicName={"الحمر"}
        measureUnit1={"x10⁶ / mm³"}
        range={"Men: 4.5 - 6.5 Women: 4 - 4.5"}
        measureUnit2={"x10⁶ / mm³"}
      />
      <RowC
        lastTest={lastTest}
        row={12}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"Hemoglobin"}
        arabicName={"الخضاب"}
        measureUnit1={"g/dl"}
        range={"Men: 13 - 18 Women: 12 - 16"}
        measureUnit2={"g/dl"}
      />
      <RowC
        lastTest={lastTest}
        row={13}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"Hematocrite"}
        arabicName={"الرسابة"}
        measureUnit1={"%"}
        range={"Men: 40 - 54 Women: 35 - 47"}
        measureUnit2={"%"}
      />
      <RowC
        lastTest={lastTest}
        row={14}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"MCHC"}
        measureUnit1={"%"}
        range={"32 - 36"}
        measureUnit2={"%"}
      />
      <RowC
        lastTest={lastTest}
        row={15}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"MCV"}
        measureUnit1={"fl"}
        range={"78 - 94"}
        measureUnit2={"fl"}
      />
      <RowC
        lastTest={lastTest}
        row={16}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"MCH"}
        measureUnit1={"pg"}
        range={"27 - 31"}
        measureUnit2={"pg"}
      />
      <RowC
        lastTest={lastTest}
        row={17}
        state={result}
        setState={setResult}
        shouldWarn={shouldWarn}
        englishName={"Platelets"}
        measureUnit1={"x10³ / mm³"}
        range={"150 - 450"}
        measureUnit2={"x10³ / mm³"}
      />
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

function RowA({
  englishName,
  arabicName,
  measureUnit1,
  range,
  state,
  setState,
  row,
  lastTest,
  shouldWarn,
}) {
  return (
    <div
      className={`grid grid-cols-5 gap-4 w-full h-fit p-2 items-center hover:text-white border-y border-y-transparent hover:border-y-dark_text/70 border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      } `}
    >
      <div className="flex justify-between items-center">
        {/* Name */}
        <span>{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <TextInput
          title={"Result"}
          className={"bg-transparent"}
          state={state[row]}
          setState={(value) => setState(row, value)}
          withHoveringTitle={false}
        />
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <span className="text-start">
        {/* Range */}
        {range}
      </span>
      <span className="border-b border-light_primary text-center">
        {" "}
        القيم المطلقة
      </span>
      <div className="flex gap-4 justify-end items-center">
        <div className="flex flex-col gap-1 items-center justify-center">
          <span>Last Test</span>
          <span className="text-sm">
            {lastTest ? moment(lastTest.Visit.date).format("yyyy-MM-DD") : "-"}
          </span>
        </div>
        <MdChevronRight />
        <span className="min-w-[10ch] text-center">
          {lastTest ? lastTest.template.result[row] : "-"}
        </span>
      </div>
    </div>
  );
}
function RowB({
  englishName,
  arabicName,
  measureUnit1,
  range,
  measureUnit2,
  state,
  setState,
  row,
  lastTest,
  shouldWarn,
}) {
  return (
    <div
      className={`grid grid-cols-5 gap-4 w-full h-fit p-2 items-center hover:text-white border-y border-y-transparent hover:border-y-dark_text/70 border-b ${
        shouldWarn && (!state[row] || !state[row + 1])
          ? "border-b-warning"
          : "border-transparent"
      } `}
    >
      <div className="flex  justify-between items-center">
        {/* Name */}
        <span className=" pl-4">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <TextInput
          state={state[row]}
          setState={(value) => setState(row, value)}
          title={"Result"}
          className={"bg-transparent"}
          withHoveringTitle={false}
        />
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <div className="text-start flex flex-col gap-1">
        {/* Range */}
        {range.map((singleRange, index) => (
          <span key={index}>{singleRange}</span>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        {/* Input + Units */}
        <button
          className="text-dark_text hover:text-light_text"
          onClick={() => {
            setState(
              row + 1,
              ((state[0] * state[row]) / 100).toFixed(2),
              false
            );
          }}
        >
          <MdCalculate className="w-[1.5rem] h-fit" />
        </button>
        <TextInput
          title={"Result"}
          state={state[row + 1]}
          setState={(value) => setState(row + 1, value)}
          className={"bg-transparent"}
          withHoveringTitle={false}
        />
        <span>{measureUnit2}</span>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <span className="min-w-[10ch] text-center">
          {lastTest ? lastTest.template.result[row] : "-"}
        </span>
      </div>
    </div>
  );
}
function RowC({
  arabicName,
  englishName,
  range,
  measureUnit1,
  measureUnit2,
  state,
  setState,
  row,
  lastTest,
  shouldWarn,
}) {
  return (
    <div
      className={`grid grid-cols-5 gap-4 w-full h-fit p-2 items-center hover:text-white border-y border-y-transparent hover:border-y-dark_text/70 border-b ${
        shouldWarn && !state[row] ? "border-b-warning" : "border-transparent"
      }`}
    >
      <div className="flex  justify-between items-center">
        {/* Name */}
        <span className="">{englishName}</span>
        <span>{arabicName}</span>
      </div>
      <div className="flex gap-8 items-center">
        {/* Input + Units */}
        <TextInput
          state={state[row]}
          setState={(value) => setState(row, value)}
          title={"Result"}
          className={"bg-transparent"}
          withHoveringTitle={false}
        />
        <span className="w-[18ch]">{measureUnit1}</span>
      </div>
      <div className="flex  gap-2  col-span-2 ">
        <span>{range}</span>
        <span>{measureUnit2}</span>
      </div>

      <div className="flex gap-4 justify-end items-center">
        <span className="min-w-[10ch] text-center">
          {lastTest ? lastTest.template.result[row] : "-"}
        </span>
      </div>
    </div>
  );
}

export default HematologyCoagulationTemplateInput;
