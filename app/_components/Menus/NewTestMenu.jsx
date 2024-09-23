"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import AutoCompleteSelect from "../Inputs/AutoCompleteSelection";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";

function NewTestMenu({
  setIsLoading,
  setNewTest,
  uniqueNumbering,
  setUniqueNumbering,
}) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [test, setTest] = useState();
  const getCategories = async () => {
    setIsLoading(true);
    const result = await api.get("/categories/categories-with-tests");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching categories-with-tests in NewTestMenu"
      );
      return;
    }

    setCategories(result.data.result);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setTest(undefined);
  }, [category]);

  const addNewTest = () => {
    if (category !== undefined && test !== undefined) {
      const newTest = {
        id: uniqueNumbering,
        category: { id: category.id, name: category.name },
        test: {
          id: test.id,
          name: test.name,
          units: test.units,
          template: { ...JSON.parse(test.template), position: Infinity },
        },
      };
      setUniqueNumbering((value) => ++value);
      setNewTest(newTest);
      setCategory();
      setTest();
    } else {
      toast.error("يرجى اختيار تصنيف وتحليل");
    }
  };

  return (
    <div
      className="w-full h-fit
    flex items-center gap-4 justify-center"
    >
      <div className="w-fit p-4 flex  gap-4 rounded shadow shadow-black bg-dark_primary">
        <AutoCompleteSelect
          options={categories}
          state={category}
          setState={setCategory}
          optionsNameKey={"name"}
          title={"التصنيف"}
          id="category"
        />
        {category && (
          <AutoCompleteSelect
            options={category.Test}
            state={test}
            setState={setTest}
            optionsNameKey={"name"}
            title={"التحليل"}
            id="test"
          />
        )}

        <div className="w-fit min-h-fit  flex items-center justify-center gap-4">
          <AuthButton title="إضافة التحليل" onClick={addNewTest} />
        </div>
      </div>
    </div>
  );
}

export default NewTestMenu;
