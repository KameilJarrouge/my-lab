import React from "react";

function CultureAndSensitivityTemplateResult({ template }) {
  return (
    <div className="flex flex-col gap-4 items-center" dir="ltr">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        <div className="w-fit flex items-center gap-4">
          <span className="border-b border-text w-fit ">
            CULTURE & SENSITIVITY
          </span>
        </div>
      </div>
      {!template.result.isPositive ? (
        <div className="w-[80%] place-self-center ">
          NO GROWTH OF BACTERIA AFTER 48 hrs OF INCUBATION
        </div>
      ) : (
        <>
          <div className="w-[80%] place-self-center flex flex-col gap-2">
            <div className="flex gap-4 w-full">
              <span className="w-[13ch] text-end">Specimen:</span>
              <div
                className={`w-[40ch] shadow shadow-black bg-dark_primary  text-center rounded`}
              >
                {template.result.specimen}
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <span className="w-[13ch] text-end">GROWTH OF:</span>
              <div
                className={`w-[25ch] shadow shadow-black bg-dark_primary   text-center rounded`}
              >
                {template.result.growthOf}
              </div>
              <span>COLONIES COUNT:</span>
              <div
                className={`w-[18ch] shadow shadow-black bg-dark_primary text-center rounded`}
              >
                {template.result.coloniesCount}
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
              {template.result.selectedAA.map((row, index) => {
                const result = row.result || 0;
                return (
                  <tr key={index}>
                    <td className={`border  border-light_primary text-start`}>
                      {row.agent}
                    </td>
                    <td className="border  border-light_primary bg-light_primary/20 text-center">
                      {`${
                        result > row.s ? "S" : result < row.r ? "R" : "I"
                      }(${result})`}
                    </td>
                    <td className={`border border-light_primary text-center`}>
                      <div className="max-w-[10ch] text-center">{row.r}</div>
                    </td>
                    <td className={`border border-light_primary text-center`}>
                      <div className="max-w-[10ch] text-center">{row.s}</div>
                    </td>
                    <td className={`border border-light_primary text-start`}>
                      {row.commercialNames}
                    </td>
                  </tr>
                );
              })}
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
  );
}

export default CultureAndSensitivityTemplateResult;
