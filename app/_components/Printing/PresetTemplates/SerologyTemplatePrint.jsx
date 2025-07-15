"use client";
import React from "react";

function SerologyTemplatePrint({ template }) {
  return (
    <div className="flex flex-col gap-6 text-sm w-full  pb-1 " dir="ltr">
      {(template.result.selectedTest === "Both" ||
        template.result.selectedTest === "Wright") && (
        <div className="flex items-center gap-4">
          <span> Wright T. اختبار رايت</span>
          <div className="w-fit gap-20 flex justify-between items-center">
            <div className="w-fit gap-4 flex items-center">
              <span className="w-[10ch]">B. Abortus</span>
              <span
                className="w-[15ch] text-black shadow shadow-black text-center rounded h-fit "
                dir="ltr"
              >
                {template.result["B. Abortus"].trim() !== ""
                  ? template.result["B. Abortus"]
                  : "-"}
              </span>
            </div>
            <div className="w-fit gap-4 flex items-center">
              <span className="w-[10ch]">B. Melitensis</span>
              <span
                className="w-[15ch] text-black shadow shadow-black text-center rounded h-fit "
                dir="ltr"
              >
                {template.result["B. Melitensis"].trim() !== ""
                  ? template.result["B. Melitensis"]
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      )}
      {(template.result.selectedTest === "Both" ||
        template.result.selectedTest === "Widal") && (
        <div className="flex items-start  gap-4">
          <span className="content-start h-full"> Widal T. اختبار فيدال</span>
          <div className="flex flex-col gap-4">
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Typhi. ( O )</span>
                <span
                  className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
                  dir="ltr"
                >
                  {template.result["Typhi. ( O )"].trim() !== ""
                    ? template.result["Typhi. ( O )"]
                    : "-"}
                </span>
              </div>
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Typhi. ( H )</span>
                <span
                  className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
                  dir="ltr"
                >
                  {template.result["Typhi. ( H )"].trim() !== ""
                    ? template.result["Typhi. ( H )"]
                    : "-"}
                </span>
              </div>
            </div>
            {/* row */}
            <div className="w-fit gap-20 flex justify-between items-center">
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Para A ( H )</span>

                <span
                  className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
                  dir="ltr"
                >
                  {template.result["Para A ( H )"].trim() !== ""
                    ? template.result["Para A ( H )"]
                    : "-"}
                </span>
              </div>
              <div className="w-fit gap-4 flex items-center">
                <span className="w-[10ch]">Para B ( H )</span>

                <span
                  className="w-[15ch] text-black shadow shadow-black text-center  rounded h-fit "
                  dir="ltr"
                >
                  {template.result["Para B ( H )"].trim() !== ""
                    ? template.result["Para B ( H )"]
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SerologyTemplatePrint;
