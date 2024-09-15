"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function UpdateTestCategoryForm({ values, submit, onDelete }) {
  const [name, setName] = useState(values.name);

  const handleSubmit = () => {
    if (name === "") {
      toast.error("يرجى ادخال اسم التصنيف");
      return;
    }
    submit(name);
  };

  useEffect(() => {
    setName(values.name);
  }, [values]);

  return (
    <div className="flex flex-col items-center gap-8 w-full h-full relative">
      <Title>تعديل التنصيف</Title>
      <button onClick={onDelete} className="absolute top-[0.4rem] left-[0rem] ">
        <MdDelete className="w-[1.5rem] h-fit hover:text-red-500" />
      </button>
      <div className="flex flex-col gap-6 h-full justify-between ">
        <div className="flex flex-col gap-6">
          <TextInput state={name} setState={setName} title={"اسم التصنيف"} />
        </div>
        <AuthButton title="تعديل" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default UpdateTestCategoryForm;
