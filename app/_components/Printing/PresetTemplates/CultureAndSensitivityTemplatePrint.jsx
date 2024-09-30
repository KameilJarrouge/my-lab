import React from "react";

function CultureAndSensitivityTemplatePrint({ template, catIndex }) {
  return (
    <div className="flex flex-col  items-center text-sm w-full" dir="ltr">
      {/* header */}
      <div
        className="w-full flex justify-between items-center "
        id={`CS-header-${catIndex}`}
      >
        <div className="w-fit flex items-center gap-4">
          <span className="border-b border-black font-semibold w-fit ">
            CULTURE & SENSITIVITY
          </span>
        </div>
      </div>
      {!template.result.isPositive ? (
        <div className="w-[80%] place-self-center pt-[1rem]">
          NO GROWTH OF BACTERIA AFTER 48 hrs OF INCUBATION
        </div>
      ) : (
        <>
          <div
            className="w-full place-self-center flex flex-col gap-2 py-[1rem]"
            id={`CS-attributes-${catIndex}`}
          >
            <div className="flex gap-4 w-full">
              <span className="w-[13ch] text-end">Specimen:</span>
              <div
                className={`w-[63ch] shadow shadow-black   text-center rounded`}
              >
                {template.result.specimen}
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <span className="w-[13ch] text-end">GROWTH OF:</span>
              <div
                className={`w-[25ch] shadow shadow-black    text-center rounded`}
              >
                {template.result.growthOf}
              </div>
              <span>COLONIES COUNT:</span>
              <div
                className={`w-[18ch] shadow shadow-black  text-center rounded`}
              >
                {template.result.coloniesCount}
              </div>
            </div>
          </div>
          <table className="border-collapse w-fit pt-[1rem]">
            {/* table */}
            <thead id={`CS-table-header-${catIndex}`}>
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
                  <tr key={index} id={row.aaIndex}>
                    <td
                      className={`border  border-light_primary text-start px-1`}
                    >
                      {row.agent}
                    </td>
                    <td className="border  border-light_primary  text-start px-1 ">
                      <div className="flex items-center gap-1 justify-between">
                        <span className="w-[1ch]">
                          {result > row.s ? "S " : result < row.r ? "R " : "I "}
                        </span>
                        <span className="w-[1ch]">{"("}</span>
                        <span className="min-w-[5ch] text-center">
                          {`${result}`}
                        </span>
                        <span className="w-[1ch]">{")"}</span>
                      </div>
                    </td>
                    <td className={`border border-light_primary text-center`}>
                      <div className="max-w-[10ch] text-center">{row.r}</div>
                    </td>
                    <td className={`border border-light_primary text-center`}>
                      <div className="max-w-[10ch] text-center">{row.s}</div>
                    </td>
                    <td
                      className={`border border-light_primary text-start px-1`}
                    >
                      {row.commercialNames}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className="w-full flex items-center justify-evenly pt-[1rem]"
            id={`CS-table-footer-${catIndex}`}
          >
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

export default CultureAndSensitivityTemplatePrint;
