"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import AuthButton from "../../Buttons/AuthButton";

function CultureAndSensitivity() {
  const [isPositive, setIsPositive] = useState(true);
  const [isAAModalOpen, setIsAAModalOpen] = useState(false);
  return (
    <div
      className="flex flex-col gap-6 w-full h-full px-2 overflow-y-auto overflow-x-hidden"
      dir="ltr"
    >
      <div className="flex flex-col gap-4 ">
        {/* header */}
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex items-center gap-4">
            <span className="border-b border-text w-fit ">
              CULTURE & SENSITIVITY
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsPositive(true)}>
                <IoMdAdd
                  className={`${
                    isPositive && "text-blue-400"
                  } w-[1.4rem] h-fit`}
                />
              </button>
              <button onClick={() => setIsPositive(false)}>
                <FiMinus
                  className={`${
                    !isPositive && "text-red-400"
                  } w-[1.4rem] h-fit`}
                />
              </button>
            </div>
          </div>
          <div dir="rtl" className="w-fit flex items-center justify-center">
            <AuthButton title="قائمة ال Antimicrobial Agents" />
          </div>
        </div>
        {!isPositive ? (
          <div className="w-[80%] place-self-center ">
            NO GROWTH OF BACTERIA AFTER 48 hrs OF INCUBATION
          </div>
        ) : (
          <>
            <div className="w-[80%] place-self-center flex flex-col gap-2">
              <div className="flex gap-4 w-full">
                <span className="w-[13ch] text-end">Specimen:</span>
                <span className="w-[calc(100%-13ch)] shadow shadow-black bg-light_primary text-center rounded">
                  ?
                </span>
              </div>
              <div className="flex gap-4 w-full">
                <span className="w-[13ch] text-end">GROWTH OF:</span>
                <span className="w-[25ch] shadow shadow-black bg-light_primary text-center rounded">
                  ?
                </span>
                <span>COLONIES COUNT:</span>
                <span className="w-[18ch] shadow shadow-black bg-light_primary text-center rounded">
                  ?
                </span>
              </div>
            </div>
            <table className=" border-collapse w-full">
              {/* table */}
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="border  border-light_primary text-center min-w-[20%]"
                  >
                    ANTIMICROBIAL AGENTS
                  </th>
                  <th
                    colSpan={3}
                    className="border  border-light_primary text-center min-w-[35%]"
                  >
                    Zone Diameter (mm)
                  </th>
                  <th
                    rowSpan={2}
                    className="border  border-light_primary text-center min-w-[45%]"
                  >
                    COMMERCIAL NAMES
                  </th>
                </tr>
                <tr>
                  <th className="border  border-light_primary text-center">
                    Results(mm)
                  </th>
                  <th className="border  border-light_primary text-center">
                    R(Below)
                  </th>
                  <th className="border  border-light_primary text-center">
                    S(Over)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border  border-light_primary text-center">
                    ?
                  </td>
                  <td className="border  border-light_primary text-center">
                    ?
                  </td>
                  <td className="border  border-light_primary text-center">
                    ?
                  </td>
                  <td className="border  border-light_primary text-center">
                    ?
                  </td>
                  <td className="border  border-light_primary text-center break-words">
                    ?
                  </td>
                </tr>
                {/* {CultureAndSensitivityRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border  border-light_primary text-start">
                      {row.agent}
                    </td>
                    <td className="border  border-light_primary text-center">
                      {row.result}
                    </td>
                    <td className="border  border-light_primary text-center">
                      {row.r}
                    </td>
                    <td className="border  border-light_primary text-center">
                      {row.s}
                    </td>
                    <td className="border  border-light_primary text-start break-words">
                      {row.commercialNames}
                    </td>
                  </tr>
                ))} */}
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
    </div>
  );
}

export default CultureAndSensitivity;
