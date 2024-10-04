"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthButton from "../Buttons/AuthButton";
import Title from "../Title";
import { MdDelete } from "react-icons/md";
import TableTextInput from "../Inputs/TableTextInput";

const convertToReadable = {
  CS_Specimen: "Specimen",
  CS_Growth_Of: "Growth Of",
};

function UpdateArbitraryForm({ setIsLoading }) {
  const [arbitrary, setArbitrary] = useState({});
  const [updateId, setUpdateId] = useState(undefined);
  const [selectedArbitrary, setSelectedArbitrary] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [arbitraryInput, setArbitraryInput] = useState({});
  const getArbitrary = async () => {
    setIsLoading(true);
    const result = await api.get("/arbitrary");
    setIsLoading(false);

    if (!result.data.result) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching all arbitrary");
      return;
    }

    const arbitraryParsed = Object.keys(result.data.result).reduce(
      (ap, key) => {
        if (key === "CS_ANTIMICROBIAL_AGENTS" || key === "id") return ap;
        if (key.startsWith("CS_")) {
          let newKey = "Culture And Sensitivity";
          let value = JSON.parse(result.data.result[key]);
          ap[newKey] = {
            ...ap[newKey],
            [convertToReadable[key]]: value,
          };
          return ap;
        }
        let value = result.data.result[key];
        if (key !== "id") value = JSON.parse(result.data.result[key]);
        ap[key] = value;
        return ap;
      },
      {}
    );
    setUpdateId(result.data.result.id);
    setArbitrary(arbitraryParsed);
    setArbitraryInput(arbitraryParsed);
  };

  const handleRestore = () => {
    setArbitraryInput(arbitrary);
  };

  const handleSave = async () => {
    setIsLoading(true);
    let arbitraryInputMutable = structuredClone(arbitraryInput);
    console.log("arbitraryInputMutable", arbitraryInputMutable);
    for (let arbitraryKey in arbitraryInputMutable) {
      const template = arbitraryInputMutable[arbitraryKey];
      console.log("arbitraryKey", arbitraryKey);
      for (let fieldKey in template) {
        const field = template[fieldKey];
        arbitraryInputMutable[arbitraryKey][fieldKey] = field.filter((n) => n);
      }
    }
    const result = await api.put(`/arbitrary/update`, {
      id: updateId,
      ...arbitraryInputMutable,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while updating arbitrary");
      return;
    }
    await getArbitrary();
    toast("تم تعديل قيم الإكمال التلقائي");
  };

  const handleAddRow = (selectedArbitrary, selectedColumn) => {
    setIsDirty(true);

    let arbitraryInputMutable = structuredClone(arbitraryInput);
    arbitraryInputMutable[selectedArbitrary][selectedColumn].push("");
    setArbitraryInput(arbitraryInputMutable);
  };

  const handleUpdate = (selectedArbitrary, selectedColumn, index, value) => {
    setIsDirty(true);

    let arbitraryInputMutable = structuredClone(arbitraryInput);
    arbitraryInputMutable[selectedArbitrary][selectedColumn][index] = value;
    setArbitraryInput(arbitraryInputMutable);
  };

  const handleDelete = (selectedArbitrary, selectedColumn, indexToRemove) => {
    setIsDirty(true);

    let arbitraryInputMutable = structuredClone(arbitraryInput);
    arbitraryInputMutable[selectedArbitrary][selectedColumn] =
      arbitraryInputMutable[selectedArbitrary][selectedColumn].filter(
        (value, index) => index !== indexToRemove
      );
    setArbitraryInput(arbitraryInputMutable);
  };

  useEffect(() => {
    getArbitrary();
  }, []);

  useEffect(() => {
    setSelectedColumn(undefined);
  }, [selectedArbitrary]);

  return (
    <div className="flex flex-col gap-1 items-center w-fit h-[80vh]">
      <div className="w-fit h-[calc(80vh-3rem)] flex gap-1" dir="ltr">
        <div className="min-w-[20ch] max-w-[50ch] items-center bg-primary h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 py-2 px-5 rounded">
          <Title>اختيار قالب</Title>
          {Object.keys(arbitraryInput).map((key, index) => (
            <button
              className={`w-full font-semibold text-start  border-b  hover:text-white  relative ${
                selectedArbitrary === key
                  ? "border-white text-white"
                  : "border-transparent text-text"
              }`}
              onClick={() => setSelectedArbitrary(key)}
              key={index}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="min-w-[70ch] h-full   ">
          {!selectedArbitrary ? (
            <div className="w-full h-full flex items-center justify-center bg-light_primary/50 rounded">
              يرجى اختيار قالب
            </div>
          ) : (
            <div className="w-full h-full flex gap-1">
              <div className="min-w-[20ch] max-w-[50ch] bg-primary/80 rounded h-full overflow-y-auto overflow-x-hidden px-3 py-2  flex flex-col items-center gap-4">
                <Title>اختيار عنوان</Title>

                {Object.keys(arbitraryInput[selectedArbitrary]).map(
                  (columnKey, index) => (
                    <button
                      className={`w-full font-semibold text-start  border-b  hover:text-white  relative ${
                        selectedColumn === columnKey
                          ? "border-white text-white"
                          : "border-transparent text-text"
                      }`}
                      onClick={() => setSelectedColumn(columnKey)}
                      key={index}
                    >
                      {columnKey}
                    </button>
                  )
                )}
              </div>
              <div className=" min-w-[50ch] max-w-fit bg-light_primary/50 rounded h-full flex  overflow-y-auto overflow-x-hidden justify-center p-2">
                {selectedColumn && (
                  <div className="flex flex-col gap-2">
                    <table className="w-full h-fit border-collapse pb-2">
                      <thead className="">
                        <tr>
                          <th className=" border-text/40 border p-0.5 font-semibold">
                            القيمة
                          </th>
                          <th className=" border-text/40 border p-0.5 w-[1.2rem]"></th>
                        </tr>
                      </thead>
                      <tbody className="h-full">
                        {(
                          arbitraryInput[selectedArbitrary][selectedColumn] ||
                          []
                        ).map((value, index) => (
                          <tr key={index}>
                            <td className=" border-text/40 border p-0.5 text-center">
                              <TableTextInput
                                value={value}
                                className={"bg-primary/50"}
                                update={(value) => {
                                  handleUpdate(
                                    selectedArbitrary,
                                    selectedColumn,
                                    index,
                                    value
                                  );
                                }}
                              />
                            </td>
                            <td className=" border-text/40 border p-0.5 w-[1.2rem]">
                              <button
                                className="text-text hover:text-red-400 flex items-center justify-center"
                                onClick={() =>
                                  handleDelete(
                                    selectedArbitrary,
                                    selectedColumn,
                                    index
                                  )
                                }
                              >
                                <MdDelete className="w-[1.2rem] h-fit " />
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="invisible">
                          <td className="  p-0.5 h-[0.5rem] text-center ">
                            <TableTextInput
                              value={""}
                              className={"bg-primary/50 h-0"}
                              update={(f) => f}
                            />
                          </td>
                          <td className="  p-0.5 w-[1.2rem]"></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="w-full flex justify-center items-center pb-2">
                      <AuthButton
                        onClick={() =>
                          handleAddRow(selectedArbitrary, selectedColumn)
                        }
                        title="إضافة سطر"
                      ></AuthButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="w-full flex justify-center items-center gap-4 h-[3rem] py-2 "
        dir="ltr"
      >
        <AuthButton
          title={`${isDirty ? "*" : ""} حفظ`}
          onClick={() => {
            handleSave();
            setIsDirty(false);
          }}
        />
        {isDirty && (
          <AuthButton
            title="استعادة"
            onClick={() => {
              handleRestore();
              setIsDirty(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UpdateArbitraryForm;
