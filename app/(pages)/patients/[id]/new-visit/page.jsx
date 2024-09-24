"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import TestTemplateCard from "@/app/_components/Cards/TestTemplateCard";
import AutoCompleteInput from "@/app/_components/Inputs/AutoCompleteInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NewTestMenu from "@/app/_components/Menus/NewTestMenu";
import ManualTemplateInput from "@/app/_components/TemplateInputs/ManualTemplateInput";
import StaticTemplateInput from "@/app/_components/TemplateInputs/StaticTemplateInput";
import api from "@/app/_lib/api";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

const fieldsCount = {
  "تحليل البول Urinalysis": 20,
  "Hematology - Coagulation": 18,
};

function NewVisit({ params }) {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [tests, setTests] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uniqueNumbering, setUniqueNumbering] = useState(0);
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
    if (doctor === "") {
      toast.error("يرجى اختيار طبيب");
      return;
    }

    if (tests.length === 0) {
      toast.error("يرجى إضافة تحليل واحد على الأقل");
      return;
    }

    if (!createdAt) {
      toast.error("يرجى اختيار تاريخ الزيارة");
      return;
    }

    for (let i = 0; i < tests.length; i++) {
      const element = tests[i];
      if (element.test.template.type === "static") {
        if (
          !element.test.template.hasOwnProperty("result") ||
          Object.keys(element.test.template.result).length !==
            fieldsCount[element.test.template.staticTemplate]
        ) {
          toast.error("يرجى تعبئة حقول كل التحاليل");
          return;
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

    // Handle creating doctor if doesn't exist
    let doctorId = undefined;
    const existingDoctor = doctors.filter(
      (doctorInList) => doctorInList.name.toLowerCase() === doctor.toLowerCase()
    );

    if (existingDoctor.length === 0) {
      // create a new one
      const newDoctorResult = await api.post("/doctors/create", {
        name: doctor,
      });
      if (!newDoctorResult.data.success) {
        toast.error("Check The Console!");
        console.error(
          "Something went wrong while creating new doctor in new visit page"
        );
        return;
      }

      doctorId = newDoctorResult.data.result.id;
    } else {
      // found an existing doctor
      doctorId = existingDoctor[0].id;
    }

    // Create Visit
    const newVisitResult = await api.post("/visits/create", {
      date: createdAt,
      patientId: Number(params.id),
      doctorId: doctorId,
    });
    if (!newVisitResult.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while creating new visit in new visit page"
      );
      return;
    }

    // Prep tests data for creating visitTests
    const visitTestsData = tests.map((testItem) => {
      if (!testItem.test.template.hasOwnProperty("position")) {
        testItem.test.template.position = Infinity;
      }
      return {
        units: testItem.test.units,
        price: unitPrice,
        template: JSON.stringify(testItem.test.template),
        visitId: newVisitResult.data.result.id,
        testId: testItem.test.id,
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
    router.push(`/visits/${newVisitResult.data.result.id}/update`);
  };

  const addTest = (newTest) => {
    setTests((tests) => [...tests, newTest]);
  };

  const updateTest = (index, updatedTest) => {
    setTests((tests) => {
      tests[index] = updatedTest;
      return tests;
    });
  };

  const removeTest = (indexToRemove) => {
    setTests((tests) => tests.filter((test, index) => indexToRemove !== index));
  };

  const getDoctors = async () => {
    setIsLoading(true);
    const result = await api.get(`/doctors/list`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching doctor list for new visit"
      );
      return;
    }
    setDoctors(result.data.result);
  };

  const getPatient = async () => {
    setIsLoading(true);
    const result = await api.get(`/patients/${params.id}`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching patient for new visit"
      );
      return;
    }
    setPatient(result.data.result);
  };

  useEffect(() => {
    getDoctors();
    getPatient();
    getUnitPrice();
  }, []);

  useEffect(() => {
    if (tests.length === 0) {
      setTotalPrice(0);
      return;
    }
    const totalPriceTemp = tests.reduce((total, test) => {
      return total + test.test.units * unitPrice;
    }, 0);
    setTotalPrice(totalPriceTemp);
  }, [tests]);

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
          <span className="">{"زيارة جديدة :"}</span>
          <span
            className="font-semibold"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="العودة إلى صفحة المريض"
          >
            <Link href={`/patients/${params.id}`}>{patient.name}</Link>
          </span>
          <span className="text-dark_text/60">•</span>
          <span className="">{"تاريخ الزيارة :"}</span>
          <div dir="ltr" className="min-w-[15ch] h-fit">
            <DateTimePicker
              value={createdAt}
              onChange={setCreatedAt}
              disableClock
              className={
                "text-dark_text p-0 focus-within:text-light_text border-b-[1px] h-[1.5rem] w-full border-b-light_primary focus-within:border-b-light_text"
              }
              calendarIcon={null}
              clearIcon={() => (
                <MdClear className="translate-x-1 text-dark_text hover:text-light_text" />
              )}
              format="yyyy-MM-dd"
            />
          </div>
          <span className="text-dark_text/60">•</span>
          <span className="">{"الطبيب :"}</span>
          <AutoCompleteInput
            withHoveringTitle={false}
            state={doctor}
            setState={setDoctor}
            options={doctors.map((doctor) => doctor.name)}
          />
          <span className="text-text ">
            التكلفة: {numberWithCommas(totalPrice)} ل.س
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {/* <AuthButton
            title="إعدادات الطباعة"
            onClick={() => setIsPreviewOpen(true)}
          /> */}
          <AuthButton title="حفظ الزيارة" onClick={submitVisit} />
        </div>
      </div>
      {/* New Test */}
      <NewTestMenu
        setIsLoading={setIsLoading}
        setNewTest={addTest}
        setUniqueNumbering={setUniqueNumbering}
        uniqueNumbering={uniqueNumbering}
      />

      {/* Tests */}
      <div className="w-full h-fit flex flex-col items-center gap-3 px-3 pb-2  overflow-y-auto overflow-x-hidden">
        {tests.map((test, index) => (
          <TestTemplateCard
            key={index}
            index={index}
            test={test}
            unitPrice={unitPrice}
            removeTest={() => removeTest(index)}
            patientId={params.id}
            dateInQuestion={createdAt}
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

export default NewVisit;
