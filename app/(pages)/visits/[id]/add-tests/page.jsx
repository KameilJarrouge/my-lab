"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import TestTemplateCard from "@/app/_components/Cards/TestTemplateCard";
import AutoCompleteInput from "@/app/_components/Inputs/AutoCompleteInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NewTestMenu from "@/app/_components/Menus/NewTestMenu";
import ManualTemplateInput from "@/app/_components/TemplateInputs/ManualTemplateInput";
import StaticTemplateInput from "@/app/_components/TemplateInputs/StaticTemplateInput";
import cultureAndSensitivityValidation from "@/app/_components/TemplateInputs/Validation/cultureAndSensitivityValidation";
import hematologyCoagulationValidation from "@/app/_components/TemplateInputs/Validation/hematologyCoagulationValidation";
import normalValidation from "@/app/_components/TemplateInputs/Validation/normalValidation";
import PTTValidation from "@/app/_components/TemplateInputs/Validation/PTTValidation";
import PTValidation from "@/app/_components/TemplateInputs/Validation/PTValidation";
import semenAnalysisValidation from "@/app/_components/TemplateInputs/Validation/semenAnalysisValidation";
import serologyValidation from "@/app/_components/TemplateInputs/Validation/serologyValidation";
import urinalysisValidation from "@/app/_components/TemplateInputs/Validation/urinalysisValidation";
import api from "@/app/_lib/api";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

function AppendVisitTests({ params }) {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [doctor, setDoctor] = useState("");
  const [tests, setTests] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uniqueNumbering, setUniqueNumbering] = useState(0);
  const [overrideSerologyUnits, setOverrideSerologyUnits] = useState(true);
  const router = useRouter();

  const getUnitPrice = async () => {
    setIsLoading(true);
    const result = await api.get("/settings");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error(
        "Something went wrong while creating new doctor in new visit page"
      );
      return;
    }
    setUnitPrice(result.data.result.unitPrice);
  };

  const submitVisit = async () => {
    // Handle errors

    if (tests.length === 0) {
      toast.error("يرجى إضافة تحليل واحد على الأقل");
      return;
    }

    for (let i = 0; i < tests.length; i++) {
      const element = tests[i];
      if (element.test.template.type === "static") {
        if (!element.test.template.hasOwnProperty("result")) {
          toast.error("يرجى تعبئة حقول كل التحاليل");
          return;
        }

        switch (element.test.template.staticTemplate) {
          case "تحليل البول Urinalysis": {
            // let fieldsCountUrinalysis = 19;
            // if (element.test.template.result.hasOwnProperty("Dynamic")) {
            //   // remove empty dynamic fields
            //   element.test.template.result.Dynamic =
            //     element.test.template.result.Dynamic.filter(
            //       (dRow) => dRow.name !== "" && dRow.value !== ""
            //     );
            //   // account for the extra element in the array ("Dynamic")
            //   fieldsCountUrinalysis = 20;
            // }
            if (!urinalysisValidation(element.test.template.result)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;
          }
          case "Hematology - Coagulation":
            if (
              !hematologyCoagulationValidation(element.test.template.result)
            ) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;
          case "Semen Analysis":
            if (!semenAnalysisValidation(element.test.template.result)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;

          case "Culture And Sensitivity":
            if (
              !cultureAndSensitivityValidation(element.test.template.result)
            ) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;
          case "Serology": {
            let resultTemp = structuredClone(element.test.template.result);
            let fieldsCount = 0;

            switch (resultTemp.selectedTest) {
              case "Both":
                fieldsCount = 7;
                break;
              case "Wright": {
                fieldsCount = 3;
                delete resultTemp["Typhi. ( O )"];
                delete resultTemp["Typhi. ( H )"];
                delete resultTemp["Para A ( H )"];
                delete resultTemp["Para B ( H )"];
                break;
              }
              case "Widal": {
                fieldsCount = 5;
                delete resultTemp["B. Abortus"];
                delete resultTemp["B. Melitensis"];
                break;
              }
            }
            if (!serologyValidation(resultTemp, fieldsCount)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            element.test.template.result = resultTemp;
            break;
          }
          case "Blood Type":
            break;

          case "Pregnancy Test":
            break;

          case "Prothrombin Time (PT)":
            if (!PTValidation(element.test.template.result)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;

          case "Partial Thromboplastin Time (PTT)":
            if (!PTTValidation(element.test.template.result)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;

          default:
            if (!normalValidation(element.test.template.result)) {
              toast.error("يرجى تعبئة حقول كل التحاليل");
              return;
            }
            break;
        }
      } else {
        if (
          !element.test.template.hasOwnProperty("result") ||
          element.test.template.result.value === ""
        ) {
          toast.error("يرجى تعبئة حقول كل التحاليل");
          return;
        }
      }
    }

    setIsLoading(true);

    // Prep tests data for creating visitTests
    const visitTestsData = tests.map((testItem) => {
      let unitsTemp = testItem.test.units;
      // account for the second test in serology (the units only refer to one of the tests)
      if (
        testItem.test.template.staticTemplate === "Serology" &&
        testItem.test.template.result.selectedTest === "Both"
      ) {
        unitsTemp *= 2;
      }

      if (!testItem.test.template.hasOwnProperty("position")) {
        testItem.test.template.position = Infinity;
      }
      return {
        units: unitsTemp,
        price: unitPrice,
        template: JSON.stringify(testItem.test.template),
        visitId: Number(params.id),
        testId: testItem.test.id,
        visible: testItem.visible,
      };
    });

    const newVisitTestsResult = await api.post("/visit-tests/create-many", {
      data: visitTestsData,
    });

    if (!newVisitTestsResult.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while creating new visit-tests in new visit page"
      );
      return;
    }

    toast("تم إضافة زيارة جديدة");
    router.push(`/visits/${params.id}/update`);
  };

  const addTest = (newTest) => {
    setTests((tests) => [...tests, newTest]);
  };

  const addMultipleTests = (newTests) => {
    setTests((tests) => [...tests, ...newTests]);
  };

  const updateTest = (index, updatedTest) => {
    setTests((tests) => {
      tests[index] = updatedTest;
      return tests;
    });
  };

  const toggleTestVisibility = (index, value) => {
    setTests((tests) => {
      tests[index].visible = value;

      return tests;
    });
  };

  const removeTest = (indexToRemove) => {
    setTests((tests) => tests.filter((test, index) => indexToRemove !== index));
  };

  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching visit for update visit"
      );
      return;
    }
    setPatient(result.data.result.Patient);
    setDoctor(result.data.result.doctor.name);
    setCreatedAt(result.data.result.date);
  };

  useEffect(() => {
    getVisit();

    getUnitPrice();
  }, []);

  useEffect(() => {
    if (tests.length === 0) {
      setTotalPrice(0);
      return;
    }
    const totalPriceTemp = tests.reduce((total, test) => {
      let units = test.test.units;
      if (
        test.test.template.staticTemplate === "Serology" &&
        overrideSerologyUnits
      ) {
        units *= 2;
      }
      return total + units * unitPrice;
    }, 0);
    setTotalPrice(totalPriceTemp);
  }, [tests, overrideSerologyUnits]);

  return (
    <div
      className="w-full h-full 
      flex flex-col gap-4"
    >
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* Visit Information */}
      <div
        className="w-full px-4 py-4 rounded shadow shadow-black h-fit bg-dark_primary
        flex  items-center justify-between"
      >
        <div className="w-fit flex items-center gap-4">
          <span className="">{"إضافة تحاليل للزيارة :"}</span>
          <span
            className="font-semibold"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="العودة إلى صفحة المريض"
          >
            <Link href={`/patients/${params.id}`}>{patient.name}</Link>
          </span>
          <span className="text-dark_text/60">•</span>
          <span className="">{"تاريخ الزيارة :"}</span>
          <div dir="ltr" className="min-w-fit h-fit">
            {moment(createdAt).format("yyyy-MM-DD")}
          </div>
          <span className="text-dark_text/60">•</span>
          <span className="">{"الطبيب :"}</span>
          <span>{doctor}</span>

          <span className="text-text ">
            التكلفة: {numberWithCommas(totalPrice)} ل.س
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <AuthButton
            title="إغلاق"
            onClick={() => {
              router.push(`/visits/${params.id}/update`);
            }}
          />
          <AuthButton title="حفظ التحاليل الجديدة" onClick={submitVisit} />
        </div>
      </div>
      {/* New Test */}
      <NewTestMenu
        setIsLoading={setIsLoading}
        setNewTest={addTest}
        setUniqueNumbering={setUniqueNumbering}
        uniqueNumbering={uniqueNumbering}
        addMultipleTests={addMultipleTests}
      />

      {/* Tests */}
      <div className="w-full min-h-[50vh] h-fit flex flex-col items-center gap-3 px-3 pb-2  overflow-y-auto overflow-x-hidden">
        {tests.map((test, index) => (
          <TestTemplateCard
            key={test.id}
            index={index}
            test={test}
            unitPrice={unitPrice}
            removeTest={() => removeTest(index)}
            patientId={params.id}
            dateInQuestion={createdAt}
            overrideSerologyUnits={overrideSerologyUnits}
            toggleTestVisibility={(value) => toggleTestVisibility(index, value)}
            templateInput={(lastTest) => {
              return test.test.template.type === "manual" ? (
                <ManualTemplateInput
                  test={test}
                  dateInQuestion={createdAt}
                  patientId={params.id}
                  lastTest={lastTest}
                  updateTemplate={(updatedTest) =>
                    updateTest(index, updatedTest)
                  }
                />
              ) : (
                <StaticTemplateInput
                  test={test}
                  dateInQuestion={createdAt}
                  lastTest={lastTest}
                  patientId={params.id}
                  setOverrideSerologyUnits={setOverrideSerologyUnits}
                  updateTemplate={(updatedTest) =>
                    updateTest(index, updatedTest)
                  }
                />
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AppendVisitTests;
