"use client";
import React, { useState } from "react";
import Title from "../Title";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";

function CreateTestCategoryForm({ submit }) {
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    if (name === "") {
      toast.error("يرجى ادخال اسم التصنيف");
      return;
    }
    await submit(name);
  };
  return (
    <div className="flex flex-col items-center gap-8 w-full min-w-[25rem] h-full">
      <Title>تصنيف جديد</Title>
      <div className="flex flex-col gap-6 h-full justify-between ">
        <div className="flex flex-col gap-6">
          <TextInput state={name} setState={setName} title={"التصنيف"} />
        </div>
        <AuthButton title="إضافة" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateTestCategoryForm;
