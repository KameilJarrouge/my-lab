"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableTextInput from "../Inputs/TableTextInput";
import { MdDelete } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import LoadingComponent from "../LoadingComponent";
import TextInput from "../Inputs/TextInput";

function ManipulateAAForm({ shouldFetch }) {
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
    );
  };

  const updateAA = (index, field, value) => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      antimicrobialAgents[index][field] = value;
      return [...antimicrobialAgents];
    });
  };

  const removeAA = (index) => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      return antimicrobialAgents.filter((aa, AAindex) => AAindex !== index);
    });
  };

  const updateAABackend = async () => {
    const antimicrobialAgentsTrimmed = antimicrobialAgents.filter(
      (aa) => aa.agent !== ""
    );

    setIsLoading(true);
    const result = await api.put("/arbitrary/cs/update", {
      id: id,
      antimicrobialAgents: antimicrobialAgentsTrimmed,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching AA in ManipulateAAForm"
      );
      return;
    }
    toast("تم الحفظ");
  };

  const addAA = () => {
    setAntimicrobialAgents((antimicrobialAgents) => {
      return [
        { agent: "", r: 0, s: 0, commercialNames: "" },
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
                className="border  border-light_primary text-center w-[1rem] "
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
        <AuthButton title="حفظ" onClick={updateAABackend} />
        <AuthButton title="استعادة" onClick={getAA} />
        <AuthButton title="إضافة مضاد" onClick={addAA} />
      </div>
    </div>
  );
}

export default ManipulateAAForm;
