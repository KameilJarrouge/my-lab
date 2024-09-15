"use client";
import React, { useEffect, useState } from "react";
import TextAreaInput from "../Inputs/TextAreaInput";
import Separator from "../Separator";
import api from "@/app/_lib/api";
import TextInput from "../Inputs/TextInput";
import RichAutoCompleteInput from "../Inputs/RichAutoCompleteInput copy";
import { toast } from "react-toastify";

function ManualTemplate({
  state = { min: "", max: "", referenceRange: "", unit: "" },
  setState,
}) {
  const [measureUnits, setMeasureUnits] = useState([]);

  const getMeasureUnits = async () => {
    const result = await api.get("/settings");
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching settings");
      return;
    }
    setMeasureUnits(JSON.parse(result.data.result.units));
  };

  useEffect(() => {
    getMeasureUnits();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-[30ch]">
        <RichAutoCompleteInput
          options={measureUnits}
          state={state.unit}
          title={"وحدة القياس"}
          setState={(unit) =>
            setState((state) => {
              return { ...state, unit: unit };
            })
          }
        />
      </div>
      <Separator className={"bg-text/50"} />
      <div className="flex justify-between w-full ">
        <div className="w-[30ch]">
          <TextInput
            title={"القيمة الأدنى"}
            state={state.min}
            setState={(min) =>
              setState((state) => {
                return { ...state, min: min };
              })
            }
          />
        </div>
        <div className="w-[30ch]">
          <TextInput
            title={"القيمة الأعلى"}
            state={state.max}
            setState={(max) =>
              setState((state) => {
                return { ...state, max: max };
              })
            }
          />
        </div>
      </div>
      <Separator className={"bg-text/50"} />
      <div className=" flex gap-4 w-full items-center " dir="ltr">
        <div className="w-1/2 ">
          <TextAreaInput
            state={state.referenceRange}
            setState={(referenceRange) =>
              setState((state) => {
                return {
                  ...state,
                  referenceRange: referenceRange,
                };
              })
            }
            rows={7}
            title={
              "القيمة التي ستظهر في المجال المرجعي على التقرير (reference range)"
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2 h-[10rem] items-center overflow-y-auto overflow-x-hidden text-wrap">
          <div>Reference Range</div>
          {state.referenceRange && state.referenceRange !== "" ? (
            state.referenceRange
              .split("\n")
              .filter((line) => line !== "")
              .map((line, index) => <span key={index}>{line}</span>)
          ) : (
            <span>{`${state.min}-${state.max}`}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManualTemplate;
