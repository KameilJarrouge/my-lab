"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import AutoCompleteSelect from "../Inputs/AutoCompleteSelection";
import AuthButton from "../Buttons/AuthButton";
import { toast } from "react-toastify";
import AddMultipleTestsModal from "../Modals/AddMultipleTestsModal";

function NewTestMenu({
  setIsLoading,
  setNewTest,
  uniqueNumbering,
  setUniqueNumbering,
  addMultipleTests,
}) {
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState();
  const [isMultiTestAddOpen, setIsMultiTestAddOpen] = useState(false);
  const getTestsWithCats = async () => {
    setIsLoading(true);
    const result = await api.get("/tests/list-with-cats");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching list-with-cats in NewTestMenu"
      );
      return;
    }

    setTests(result.data.result);
  };

  useEffect(() => {
    getTestsWithCats();
  }, []);

  const addNewTest = () => {
    if (test !== undefined) {
      const newTest = {
        id: uniqueNumbering,
        category: { id: test.category.id, name: test.category.name },
        test: {
          id: test.id,
          name: test.name,
          units: test.units,
          template: { ...JSON.parse(test.template), position: Infinity },
        },
        visible: true,
      };
      setUniqueNumbering((value) => ++value);
      setNewTest(newTest);
      setTest();
    } else {
      toast.error("يرجى اختيار تحليل");
    }
  };

  const handleMultipleAdd = (selectedTests) => {
    if (selectedTests.length === 0) return;
    let uniqueNumberingAcc = uniqueNumbering;
    let newTests = selectedTests.map((test) => {
      uniqueNumberingAcc += 1;
      return {
        id: uniqueNumberingAcc - 1,
        category: { id: test.category.id, name: test.category.name },
        test: {
          id: test.id,
          name: test.name,
          units: test.units,
          template: { ...JSON.parse(test.template), position: Infinity },
        },
        visible: true,
      };
    });
    setUniqueNumbering(uniqueNumberingAcc);
    addMultipleTests(newTests);
  };

  return (
    <div
      className="w-full h-fit
    flex items-center gap-4 justify-center"
    >
      {isMultiTestAddOpen && (
        <AddMultipleTestsModal
          isOpen={isMultiTestAddOpen}
          setIsOpen={setIsMultiTestAddOpen}
          tests={tests}
          submit={handleMultipleAdd}
          uniqueName={"multiple-tests-add"}
        />
      )}

      <div className="w-fit p-2 flex  gap-4 rounded shadow shadow-black bg-dark_primary">
        <div className="flex gap-4 items-center">
          <span>التحليل</span>
          <AutoCompleteSelect
            options={tests}
            state={test}
            setState={setTest}
            optionsNameKey={"name"}
            id="test"
            withHoveringTitle={false}
          />
        </div>

        <div className="w-fit min-h-fit  flex items-center justify-center gap-4">
          <AuthButton title="إضافة التحليل" onClick={addNewTest} />
        </div>
        <div className="w-fit min-h-fit  flex items-center justify-center gap-4">
          <AuthButton
            title="قائمة التحاليل"
            onClick={() => setIsMultiTestAddOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default NewTestMenu;
