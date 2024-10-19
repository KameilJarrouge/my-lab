"use client";
import React, { useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import NumberInput from "../Inputs/NumberInput";
import ToggleInput from "../Inputs/ToggleInput";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";

function CreatePatientForm({ submit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [sex, setSex] = useState("ذكر");
  const [notes, setNotes] = useState("");
  const handleSubmit = async () => {
    if (name === "") {
      toast.error("يرجى ادخال اسم المريض");
      return;
    }
    await submit(name, age, sex, notes);
  };
  return (
    <div className="flex flex-col items-center gap-8 w-full min-w-[25rem] h-full">
      <Title>مريض جديد</Title>
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
        <AuthButton title="إضافة" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default CreatePatientForm;
