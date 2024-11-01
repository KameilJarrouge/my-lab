"use client";
import React, { useEffect, useState } from "react";
import TextAreaInput from "../Inputs/TextAreaInput";
import Separator from "../Separator";
import api from "@/app/_lib/api";
import TextInput from "../Inputs/TextInput";
import RichAutoCompleteInput from "../Inputs/RichAutoCompleteInput";
import { toast } from "react-toastify";
import ManualTemplatePreview from "./ManualTemplatePreview";

function ManualTemplate({
  state = {
    min: "",
    minTitle: "L",
    max: "",
    maxTitle: "H",
    referenceRange: "",
    unit: "",
  },
  setState,
  testName,
}) {
  const [measureUnits, setMeasureUnits] = useState([]);
  const [testResult, setTestResult] = useState();
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
      <div className="flex justify-between">
        <div className={"w-[45%] px-4 flex flex-col gap-4 h-fit"}>
          <div className="flex gap-2 items-center ">
            <span className="w-[15ch]">وحدة القياس : </span>
            <RichAutoCompleteInput
              options={measureUnits}
              dir="ltr"
              state={state.unit}
              withHoveringTitle={false}
              setState={(unit) =>
                setState((state) => {
                  return { ...state, unit: unit };
                })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">القيمة الأدنى : </span>
            <TextInput
              withHoveringTitle={false}
              state={state.min}
              setState={(min) =>
                setState((state) => {
                  return { ...state, min: min };
                })
              }
              dir="ltr"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">دلالة الأدنى : </span>
            <TextInput
              withHoveringTitle={false}
              state={state.minTitle}
              setState={(minTitle) =>
                setState((state) => {
                  return { ...state, minTitle: minTitle };
                })
              }
              dir="ltr"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">القيمة الأعلى : </span>
            <TextInput
              withHoveringTitle={false}
              state={state.max}
              setState={(max) =>
                setState((state) => {
                  return { ...state, max: max };
                })
              }
              dir="ltr"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">دلالة الأعلى : </span>
            <TextInput
              withHoveringTitle={false}
              state={state.maxTitle}
              setState={(maxTitle) =>
                setState((state) => {
                  return { ...state, maxTitle: maxTitle };
                })
              }
              dir="ltr"
            />
          </div>
        </div>{" "}
        <div className="h-[5rem] w-[1px] bg-dark_text self-center"></div>
        <div className="w-[45%] flex flex-col gap-2">
          <span>القيمة التي ستظهر في المجال المرجعي على التقرير :</span>
          <TextAreaInput
            dir="ltr"
            state={state.referenceRange}
            setState={(referenceRange) =>
              setState((state) => {
                return {
                  ...state,
                  referenceRange: referenceRange,
                };
              })
            }
            rows={5}
          />
          <div className="flex gap-2 items-center">
            <span className="w-[15ch]">نتيجة وهمية : </span>
            <TextInput
              withHoveringTitle={false}
              state={testResult}
              setState={(testResult) => setTestResult(testResult)}
              dir="ltr"
            />
          </div>
        </div>
      </div>
      <Separator className={"bg-dark_text"} />

      <ManualTemplatePreview
        template={state}
        testName={testName}
        testResult={testResult}
      />
    </div>
  );
}

export default ManualTemplate;
