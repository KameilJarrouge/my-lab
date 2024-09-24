"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import NumberInput from "../Inputs/NumberInput";
import ToggleInput from "../Inputs/ToggleInput";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";
import { MdChevronRight, MdDelete } from "react-icons/md";

function UpdatePatientForm({ values, submit, onDelete, goToPatientPage }) {
  const [name, setName] = useState(values.name);
  const [age, setAge] = useState(values.age);
  const [sex, setSex] = useState(values.sex);
  const [notes, setNotes] = useState(values.notes);

  const handleSubmit = () => {
    if (name === "") {
      toast.error("يرجى ادخال اسم المريض");
      return;
    }
    submit(name, age, sex, notes);
  };

  useEffect(() => {
    setName(values.name);
    setAge(values.age);
    setSex(values.sex);
    setNotes(values.notes);
  }, [values]);

  return (
    <div className="flex flex-col items-center gap-8 w-full h-full relative">
      <Title>تعديل المريض</Title>
      <button onClick={onDelete} className="absolute top-[0.4rem] left-[0rem] ">
        <MdDelete className="w-[1.5rem] h-fit hover:text-red-500" />
      </button>
      <button
        onClick={goToPatientPage}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="العودة لصفحة المريض"
        className="absolute top-[0.4rem] right-[0rem] text-text group "
      >
        <MdChevronRight className="w-[2.5rem] h-fit  group-hover:text-light_text" />
      </button>
      <div className="flex flex-col gap-6 h-full justify-between ">
        <div className="flex flex-col gap-6">
          <TextInput state={name} setState={setName} title={"اسم المريض"} />
          <NumberInput title={"العمر"} value={age} setValue={setAge} />
          <ToggleInput
            title={"الجنس"}
            selectedValue={sex}
            setSelectedValue={setSex}
            value1="ذكر"
            value2="أنثى"
          />
          <TextAreaInput
            rows={8}
            state={notes}
            setState={setNotes}
            title={"ملاحظات"}
          />
        </div>
        <AuthButton title="تعديل" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default UpdatePatientForm;
