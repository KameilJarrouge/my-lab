"use client";
import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function SerologyTemplate() {
  const [selectedTest, setSelectedTest] = useState("Both");
  return (
    <div className="flex flex-col gap-6 " dir="ltr">
      <div className="w-full flex gap-8 px-4">
        <button
          className="flex gap-4 items-center"
          onClick={() => {
            if (selectedTest === "Both") {
              setSelectedTest("Widal");
            } else if (selectedTest === "Widal") {
              setSelectedTest("Both");
            }
          }}
        >
          <span>اختبار رايت</span>
          {selectedTest === "Both" || selectedTest === "Wright" ? (
            <MdCheckBox className="text-green-400" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-text" />
          )}
        </button>
        <button
          className="flex gap-4 items-center"
          onClick={() => {
            if (selectedTest === "Both") {
              setSelectedTest("Wright");
            } else if (selectedTest === "Wright") {
              setSelectedTest("Both");
            }
          }}
        >
          <span>اختبار فيدال</span>
          {selectedTest === "Both" || selectedTest === "Widal" ? (
            <MdCheckBox className="text-green-400" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-text" />
          )}
        </button>
      </div>
      {(selectedTest === "Both" || selectedTest === "Wright") && (
        <div className="flex items-center gap-4">
          <span> Wright T. اختبار رايت</span>
          <div className="w-fit gap-20 flex justify-between items-center">
            <div className="w-fit gap-4 flex items-center">
              <span className="w-[10ch]">B. Abortus</span>
              <span className="px-12 py-1 bg-light_primary rounded">?</span>
            </div>
            <div className="w-fit gap-4 flex items-center">
              <span className="w-[10ch]">B. Melitensis</span>
              <span className="px-12 py-1 bg-light_primary rounded">?</span>
            </div>
          </div>
        </div>
      )}
      {(selectedTest === "Both" || selectedTest === "Widal") && (
        <div className="flex items-start  gap-4">
          <span className="content-start h-full"> Widal T. اختبار فيدال</span>
          <div className="flex flex-col gap-4">
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Typhi. ( O )</span>
                <span className="px-12 py-1 bg-light_primary rounded">?</span>
              </div>
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Typhi ( H )</span>
                <span className="px-12 py-1 bg-light_primary rounded">?</span>
              </div>
            </div>
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Para A ( H )</span>
                <span className="px-12 py-1 bg-light_primary rounded">?</span>
              </div>
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Para B ( H )</span>
                <span className="px-12 py-1 bg-light_primary rounded">?</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SerologyTemplate;
