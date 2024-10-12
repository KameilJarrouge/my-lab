"use client";
import React, { useEffect, useState } from "react";
import AASelectModal from "../../Modals/AASelectModal";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import AuthButton from "../../Buttons/AuthButton";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import { MdDelete } from "react-icons/md";
import TableTextInput from "../../Inputs/TableTextInput";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import TextInput from "../../Inputs/TextInput";

function CultureAndSensitivityTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [isAAModalOpen, setIsAAModalOpen] = useState(false);
  const [specimenOptions, setSpecimenOptions] = useState([]);
  const [growthOfOptions, setGrowthOfOptions] = useState([]);
  const [shouldWarn, setShouldWarn] = useState(false);

  const getCSArbitrary = async () => {
    const result = await api.get("/arbitrary/cs/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching cs info in CS template input"
      );
      return;
    }

    setSpecimenOptions(JSON.parse(result.data.result.CS_Specimen));
    setGrowthOfOptions(JSON.parse(result.data.result.CS_Growth_Of));
  };

  const removeAAFromSelection = (index) => {
    setResult(
      "selectedAA",
      result.selectedAA.filter((aa, aaIndex) => aaIndex !== index),
      false
    );
  };

  const setResultAtIndex = (index, value) => {
    let selectedAATemp = [...result.selectedAA];
    selectedAATemp[index].result = value;
    setResult("selectedAA", [...selectedAATemp], false);
  };

  const appendSelection = (aaToAppend) => {
    setResult(
      "selectedAA",
      [...(result.selectedAA || []), ...aaToAppend],
      false
    );
  };

  useEffect(() => {
    getCSArbitrary();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full h-full px-2 " dir="ltr">
      {isAAModalOpen && (
        <AASelectModal
          isOpen={isAAModalOpen}
          setIsOpen={setIsAAModalOpen}
          uniqueName={"new-visit"}
          selectedAA={result.selectedAA || []}
          setSelectedAA={appendSelection}
        />
      )}
      <div className="flex flex-col gap-4 items-center">
        {/* header */}
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex items-center gap-4">
            <span className="border-b border-text w-fit ">
              CULTURE & SENSITIVITY
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setResult("isPositive", true, false);
                }}
              >
                <IoMdAdd
                  className={`${
                    result.isPositive && "text-blue-400"
                  } w-[1.4rem] h-fit`}
                />
              </button>
              <button onClick={() => setResult("isPositive", false, false)}>
                <FiMinus
                  className={`${
                    !result.isPositive && "text-red-400"
                  } w-[1.4rem] h-fit`}
                />
              </button>
            </div>
          </div>
          {result.isPositive && (
            <div
              dir="rtl"
              className={`w-fit flex items-center justify-center border ${
                shouldWarn && result.selectedAA.length === 0
                  ? "border-warning"
                  : "border-transparent"
              } p-1`}
            >
              <AuthButton
                onClick={() => setIsAAModalOpen(true)}
                title="اختيار Antimicrobial Agents"
              />
            </div>
          )}
        </div>
        {!result.isPositive ? (
          <div className="w-[80%] place-self-center ">
            NO GROWTH OF BACTERIA AFTER 48 hrs OF INCUBATION
          </div>
        ) : (
          <>
            <div className="w-[80%] place-self-center flex flex-col gap-2">
              <div className="flex gap-4 w-full">
                <span className="w-[13ch] text-end">Specimen:</span>
                <div
                  className={`w-[40ch] shadow shadow-black bg-dark_primary  border ${
                    shouldWarn && !result.specimen
                      ? "border-warning"
                      : " border-transparent"
                  }  text-center rounded`}
                >
                  <AutoCompleteInput
                    state={result.specimen}
                    setState={(value) => setResult("specimen", value, false)}
                    options={specimenOptions}
                    withHoveringTitle={false}
                    id="specimen"
                    className="px-1"
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <span className="w-[13ch] text-end">GROWTH OF:</span>
                <div
                  className={`w-[25ch] shadow shadow-black bg-dark_primary  border ${
                    shouldWarn && !result.growthOf
                      ? "border-warning"
                      : "border-transparent"
                  }  text-center rounded`}
                >
                  <AutoCompleteInput
                    state={result.growthOf}
                    setState={(value) => {
                      setResult("growthOf", value, false);
                    }}
                    options={growthOfOptions}
                    withHoveringTitle={false}
                    id="growthOf"
                    className="px-1"
                  />
                </div>
                <span>COLONIES COUNT:</span>
                <div
                  className={`w-[18ch] shadow shadow-black bg-dark_primary border ${
                    shouldWarn && !result.coloniesCount
                      ? "border-warning"
                      : "border-transparent"
                  }  text-center rounded`}
                >
                  <TextInput
                    state={result.coloniesCount}
                    setState={(value) =>
                      setResult("coloniesCount", value, false)
                    }
                    withHoveringTitle={false}
                    className="px-1"
                  />
                </div>
              </div>
            </div>
            <table className="border-collapse w-fit">
              {/* table */}
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="border  border-light_primary text-center w-[30ch]"
                  >
                    ANTIMICROBIAL AGENTS
                  </th>
                  <th
                    colSpan={3}
                    className="border  border-light_primary text-center w-[30ch]"
                  >
                    Zone Diameter (mm)
                  </th>
                  <th
                    rowSpan={2}
                    className="border  border-light_primary text-center w-[40ch]"
                  >
                    COMMERCIAL NAMES
                  </th>
                  <th
                    rowSpan={2}
                    className="border  border-light_primary text-center w-[1.2rem] "
                  >
                    {/* <MdDelete /> */}
                  </th>
                </tr>
                <tr>
                  <th className="border  border-light_primary text-center w-[10ch]">
                    Results(mm)
                  </th>
                  <th className="border  border-light_primary text-center w-[10ch]">
                    R(Below)
                  </th>
                  <th className="border  border-light_primary text-center w-[10ch]">
                    S(Over)
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.selectedAA.map((row, index) => (
                  <tr key={index}>
                    <td
                      className={`border  text-start  ${
                        row.agent === ""
                          ? "border-warning"
                          : "border-light_primary"
                      }`}
                    >
                      {row.agent}
                    </td>
                    <td className="border  border-light_primary bg-light_primary/20 text-center">
                      <TableTextInput
                        className={"text-center"}
                        value={row.result || 0}
                        onlyNumbers
                        update={(value) =>
                          setResultAtIndex(
                            index,
                            value === "0-" || value === "-"
                              ? "-"
                              : Number(value)
                          )
                        }
                        // onFocus={(e) => {
                        //   if (typeof row.result === "string")
                        //     setResultAtIndex(
                        //       index,
                        //       row.result.substring(2, row.result.length - 1)
                        //     );
                        // }}
                        // onBlur={(e) => {
                        //   let result = row.result || 0;
                        //   if (row.result === "-") {
                        //     setResultAtIndex(index, -1);
                        //     result = -1;
                        //   }
                        //   let indicator =
                        //     result > row.s ? "S" : result < row.r ? "R" : "I";
                        //   setResultAtIndex(index, `${indicator}(${result})`);
                        // }}
                      />
                    </td>
                    <td
                      className={`border ${
                        row.r === "" ? "border-warning" : "border-light_primary"
                      } text-center`}
                    >
                      <div className="max-w-[10ch] text-center">{row.r}</div>
                    </td>
                    <td
                      className={`border ${
                        row.s === "" ? "border-warning" : "border-light_primary"
                      } text-center`}
                    >
                      <div className="max-w-[10ch] text-center">{row.s}</div>
                    </td>
                    <td className={`border border-light_primary text-start`}>
                      {row.commercialNames}
                    </td>
                    <td className="border  border-light_primary px-1">
                      <button
                        onClick={() => removeAAFromSelection(index)}
                        className="text-text hover:text-red-400 flex justify-center items-center"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full flex items-center justify-evenly ">
              {/* footnotes */}
              <div className="flex items-center gap-2">
                <span className="font-semibold"> (S) :</span>
                <span> Susceptible</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold"> (I) :</span>
                <span> Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold"> (R) :</span>
                <span> Resistant</span>
              </div>
            </div>
          </>
        )}
      </div>
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

export default CultureAndSensitivityTemplateInput;
