"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../Buttons/AuthButton";

function AddMultipleTestsForm({ tests, submit, close }) {
  const [selectedTests, setSelectedTests] = useState([]);
  const [testsByCat, setTestsByCat] = useState({});

  const toggleSelection = (testId) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests((selectedTests) =>
        selectedTests.filter((id) => id !== testId)
      );
    } else {
      setSelectedTests((selectedTests) => [...selectedTests, testId]);
    }
  };

  useEffect(() => {
    let testsByCat = tests.reduce((prev, curr) => {
      prev[curr.category.name] = [...(prev[curr.category.name] || []), curr];
      return prev;
    }, {});
    setTestsByCat(testsByCat);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-col w-[70vw] h-[72vh] 2xl:w-[50vw] 2xl:h-[78vh] px-2 overflow-y-auto overflow-x-hidden"
        dir="ltr"
      >
        {Object.keys(testsByCat).map((category, index, arr) => (
          <>
            <div
              key={index}
              className="flex items-center  gap-4 border-b border-b-light_primary"
            >
              <span className="min-w-[15rem] p-2">{category}</span>
              <div className="flex items-center flex-wrap gap-4 border-l border-l-light_primary px-2 py-2">
                {testsByCat[category].map((test, index) => (
                  <button
                    onClick={() => toggleSelection(test.id)}
                    key={index}
                    className={`${
                      selectedTests.includes(test.id)
                        ? "bg-secondary text-white"
                        : "bg-dark_text/10 hover:bg-dark_text/20"
                    } py-1 px-2 rounded`}
                  >
                    {test.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        ))}
        {/* buttons */}
      </div>
      <div className="w-full flex items-center justify-center">
        <AuthButton
          title="إضافة"
          onClick={() => {
            let newTests = tests.filter((test) => {
              return selectedTests.includes(test.id);
            });
            submit(newTests);
            close();
          }}
        />
      </div>
    </div>
  );
}

export default AddMultipleTestsForm;
