"use client";
import Borders from "@/app/_components/Borders";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import TextInput from "@/app/_components/Inputs/TextInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import { getTitle } from "@/app/_lib/getTitle";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const positions = {
  right: "justify-start",
  middle: "justify-center",
  left: "justify-end",
};
function PrintEnvelope({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");
  // const [overrideTitle, setOverrideTitle] = useState("");
  const [position, setPosition] = useState("middle");
  const router = useRouter();

  const [visit, setVisit] = useState();

  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}/for-envelope`);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching visit for printing");
      return;
    }
    setVisit(result.data.result);
    setIsLoading(false);
  };

  const getSettings = async () => {
    setIsLoading(true);
    const result = await api.get("/settings");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching settings in print page"
      );
      return;
    }

    setLocation(result.data.result.location);
  };

  useEffect(() => {
    getVisit();
    getSettings();
  }, []);

  return (
    <div className="text-black">
      {isLoading && (
        <div className="w-full h-[100vh] absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="fixed w-[70mm] top-[0rem] left-0 text-white  flex flex-col gap-3 items-center justify-between bg-dark_primary p-2 rounded print:hidden">
        <div className="flex gap-4">
          <AuthButton title="إغلاق" onClick={() => router.back()} />

          <AuthButton title="طباعة" onClick={() => window.print()} />
        </div>
        {/* <TextInput
          state={overrideTitle}
          setState={setOverrideTitle}
          title={"لقب المريض (اتركه فارغ لاستخدام الافتراضي)"}
          withClear
          onClear={() => setOverrideTitle("")}
        /> */}
        <span>اختيار موقع الظرف</span>
        <div className="flex gap-1 font-normal text-dark_text">
          <button
            className={`bg-input_background shadow-sm shadow-black p-1  ${
              position === "right" ? "text-light_text" : "hover:text-light_text"
            }`}
            onClick={() => setPosition("right")}
          >
            يمين
          </button>
          <button
            className={`bg-input_background shadow-sm shadow-black p-1  ${
              position === "middle"
                ? "text-light_text"
                : "hover:text-light_text"
            }`}
            onClick={() => setPosition("middle")}
          >
            منتصف
          </button>
          <button
            className={`bg-input_background shadow-sm shadow-black p-1  ${
              position === "left" ? "text-light_text" : "hover:text-light_text"
            }`}
            onClick={() => setPosition("left")}
          >
            يسار
          </button>
        </div>
      </div>
      <div
        className={`w-[210mm] h-[297mm]  bg-white  flex ${positions[position]}`}
      >
        <div className="w-[159mm] h-[126mm] bg-gray-200 print:bg-white flex flex-col gap-4 items-center relative">
          <EnvelopeHeader location={location} />
          <div className="flex flex-col gap-2 w-fit " dir="rtl">
            <div className="flex gap-2 items-center">
              <span>اسم المريض:</span>
              <span>
                {/* {(overrideTitle ||
                  getTitle(
                    visit?.Patient.sex || "ذكر",
                    visit?.Patient.age || 25
                  )) +
                  " " +
                  visit?.Patient.name || ""} */}
                {visit?.Patient.name || ""}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>الزميل الطبيب:</span>
              <span>{visit?.doctor.name || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvelopeHeader({ location }) {
  return (
    <div className="h-[60mm]  w-[200mm] scale-[0.75] relative   -translate-y-[2.5mm]">
      <img
        src="/SCLA_BASHAR.png"
        className="absolute left-[5mm] top-0 w-[50mm] h-fit z-10 rounded-full bg-white"
      />

      <div className="w-full h-full">
        {/* right */}
        <div className=" absolute top-[3mm] left-0">
          <Borders />
        </div>
        {/* Middle */}
        <div className="flex flex-col w-full h-full gap-4">
          <span className="text-4xl px-[20mm] font-bold ">
            {" "}
            مـخبـر الدكتور بشــار جـروج
          </span>
          <span className="text-3xl px-[46mm]  font-bold text-light_primary">
            للتحاليــل الطبيــة
          </span>
          <span className="text-xl px-[5mm] text-black ">
            دكتور في الطب البشري - اخصائي في التشخيص المخبري
          </span>
          <span className="text-lg px-[4mm] text-black ">{location}</span>
        </div>
      </div>
    </div>
  );
}

export default PrintEnvelope;
