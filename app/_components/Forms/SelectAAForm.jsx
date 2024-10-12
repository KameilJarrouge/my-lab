"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableTextInput from "../Inputs/TableTextInput";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import LoadingComponent from "../LoadingComponent";
import TextInput from "../Inputs/TextInput";

function SelectAAForm({ shouldFetch, selectedAA, setSelectedAA, close }) {
  const [id, setId] = useState(undefined);
  const [antimicrobialAgents, setAntimicrobialAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const getAA = async () => {
    setIsLoading(true);
    const result = await api.get("/arbitrary/cs/get/AA");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching AA in ManipulateAAForm"
      );
      return;
    }
    setId(result.data.result.id);
    setAntimicrobialAgents(
      JSON.parse(result.data.result.CS_ANTIMICROBIAL_AGENTS)
        .filter((aa) => {
          for (let i = 0; i < selectedAA.length; i++) {
            const element = selectedAA[i];
            if (element.agent === aa.agent) {
              return false;
            }
          }
          return true;
        })
        .sort((a, b) => a.agent.localeCompare(b.agent))
    );
  };

  const updateAA = (index, field, value) => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      antimicrobialAgents[index][field] = value;
      return [...antimicrobialAgents];
    });
  };

  const toggleSelectAll = (selectAll) => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      return antimicrobialAgents.map((aa) => ({ ...aa, selected: selectAll }));
    });
  };

  const removeAA = (index) => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      return antimicrobialAgents.filter((aa, AAindex) => AAindex !== index);
    });
  };

  const updateAABackend = async () => {
    const temp = [...selectedAA, ...antimicrobialAgents];
    const antimicrobialAgentsTrimmed = temp.filter((aa) => aa.agent !== "");

    setIsLoading(true);
    const result = await api.put("/arbitrary/cs/update", {
      id: id,
      antimicrobialAgents: antimicrobialAgentsTrimmed.map((aa) => ({
        agent: aa.agent,
        r: aa.r,
        s: aa.s,
        commercialNames: aa.commercialNames,
      })),
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching AA in ManipulateAAForm"
      );
      return;
    }
    // toast("تم الحفظ");
  };

  const addAA = () => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      return [
        { agent: "", r: 0, s: 0, result: 0, commercialNames: "" },
        ...antimicrobialAgents,
      ];
    });
  };

  useEffect(() => {
    if (shouldFetch) getAA();
  }, [shouldFetch]);

  return (
    <div
      className="w-fit flex flex-col items-center gap-4  max-h-[90vh] "
      dir="ltr"
    >
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* filter */}
      <div className="w-[30%] self-start px-2">
        <TextInput
          state={filter}
          setState={setFilter}
          withClear
          onClear={() => setFilter("")}
          title={"Filter"}
          withHoveringTitle={false}
        />
      </div>
      {/* list of AA */}
      <div className="overflow-y-auto h-[60vh]">
        <table className=" border-collapse w-fit  ">
          {/* table */}
          <thead className="bg-primary sticky -top-1">
            <tr>
              <th
                rowSpan={2}
                className="border  border-light_primary text-center w-[1.2rem] "
              >
                <div className="w-full flex flex-col items-center gap-1">
                  <button
                    onClick={() => toggleSelectAll(true)}
                    className="text-green-400  flex justify-center items-center w-full "
                  >
                    <MdCheckBox className="w-[1.2rem] h-fit" />
                  </button>

                  <button
                    onClick={() => toggleSelectAll(false)}
                    className="text-text  flex justify-center items-center w-full "
                  >
                    <MdCheckBoxOutlineBlank className="w-[1.2rem] h-fit" />
                  </button>
                </div>
              </th>

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
          <tbody className="">
            {antimicrobialAgents.length !== 0 &&
              antimicrobialAgents
                .filter((row) =>
                  row.agent.toLowerCase().includes(filter.toLowerCase())
                )

                .map((row, index) => (
                  <tr key={index}>
                    <td className="border  border-light_primary px-1">
                      {row.selected ? (
                        <button
                          onClick={() => updateAA(index, "selected", false)}
                          className="text-green-400 hover:text-red-400 flex justify-center items-center"
                        >
                          <MdCheckBox className="w-[1.2rem] h-fit" />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateAA(index, "selected", true)}
                          className="text-text hover:text-green-400 flex justify-center items-center"
                        >
                          <MdCheckBoxOutlineBlank className="w-[1.2rem] h-fit" />
                        </button>
                      )}
                    </td>

                    <td
                      className={`border  text-start  ${
                        row.agent === ""
                          ? "border-warning"
                          : "border-light_primary"
                      }`}
                    >
                      <TableTextInput
                        value={row.agent}
                        update={(value) => updateAA(index, "agent", value)}
                      />
                    </td>
                    <td className="border  border-light_primary bg-light_primary/20 text-center">
                      {"?"}
                    </td>
                    <td
                      className={`border ${
                        row.r === "" ? "border-warning" : "border-light_primary"
                      } text-center`}
                    >
                      <div className="max-w-[10ch] text-center">
                        <TableTextInput
                          value={row.r}
                          update={(value) =>
                            updateAA(index, "r", Number(value))
                          }
                          className={" text-center "}
                          onlyNumbers
                        />
                      </div>
                    </td>
                    <td
                      className={`border ${
                        row.s === "" ? "border-warning" : "border-light_primary"
                      } text-center`}
                    >
                      <div className="max-w-[10ch] text-center">
                        <TableTextInput
                          value={row.s}
                          update={(value) =>
                            updateAA(index, "s", Number(value))
                          }
                          className={" text-center "}
                          onlyNumbers
                        />
                      </div>
                    </td>
                    <td className={`border border-light_primary text-start`}>
                      <TableTextInput
                        value={row.commercialNames}
                        update={(value) =>
                          updateAA(index, "commercialNames", value)
                        }
                      />
                    </td>
                    <td className="border  border-light_primary px-1">
                      <button
                        onClick={() => removeAA(index)}
                        className="text-text hover:text-red-400 flex justify-center items-center"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            {/* To hold the width */}
            <tr className="invisible">
              <td className=" border-light_primary px-1">
                <button
                  // onClick={() => removeAA(index)}
                  className="text-text hover:text-red-400 flex justify-center items-center"
                >
                  <MdDelete />
                </button>
              </td>
              <td>
                <TableTextInput value={""} update={(f) => f} />
              </td>
              <td className=" border-light_primary bg-light_primary/20 text-center">
                {"?"}
              </td>
              <td className={`$ text-center`}>
                <div className="max-w-[10ch] text-center">
                  <TableTextInput value={""} update={(f) => f} />
                </div>
              </td>
              <td className={` text-center`}>
                <div className="max-w-[10ch] text-center">
                  <TableTextInput value={""} update={(f) => f} />
                </div>
              </td>
              <td className={`border-light_primary text-start`}>
                <TableTextInput value={""} update={(f) => f} />
              </td>
            </tr>
          </tbody>
        </table>
        {antimicrobialAgents.filter((row) =>
          row.agent.toLowerCase().includes(filter.toLowerCase())
        ).length === 0 && (
          <div className="w-full flex justify-center">لا يوجد نتائج</div>
        )}
      </div>
      {/* save and retrieve */}
      <div className="w-full flex justify-center items-center gap-4">
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content="عدد السطور المختارة"
        >
          {"< " + antimicrobialAgents.filter((aa) => aa.selected).length + " >"}
        </span>
        <AuthButton
          title="حفظ"
          onClick={() => {
            setSelectedAA(
              antimicrobialAgents.filter((aa) => aa.selected && aa.agent !== "")
            );
            updateAABackend();
            close();
          }}
        />
        <AuthButton title="استعادة" onClick={getAA} />
        <AuthButton title="إضافة مضاد" onClick={addAA} />
      </div>
    </div>
  );
}

export default SelectAAForm;
