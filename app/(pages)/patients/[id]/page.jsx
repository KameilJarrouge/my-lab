"use client";
import React, { useEffect, useState } from "react";
import Title from "@/app/_components/Title";
import AuthButton from "../../../_components/Buttons/AuthButton";
import api from "../../../_lib/api";
import HorizontalInfo from "../../../_components/Info/HorizontalInfo";
import LoadingComponent from "@/app/_components/LoadingComponent";
import VerticalInfo from "@/app/_components/Info/VerticalInfo";
import Link from "next/link";
import { MdFemale, MdMale } from "react-icons/md";
import { toast } from "react-toastify";
import PatientVisitsPage from "@/app/_components/Pages/PatientVisitsPage";
function PatientPage({ params }) {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getPatient = async () => {
    setIsLoading(true);
    const result = await api.get(`/patients/${params.id}`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error("Something went wrong while fetching complete patient");

      return;
    }

    setPatient(result.data.result);
  };

  useEffect(() => {
    getPatient();
  }, []);

  return (
    <div className="w-full h-full flex gap-1 ">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* Patient Info */}
      <div className="w-1/5 h-full flex flex-col  items-center justify-between">
        <div className="w-full h-fit flex flex-col gap-8 items-center">
          <Title> المريض</Title>
          <div className="w-full flex flex-col gap-4 px-1">
            <HorizontalInfo withToolTip title="الاسم" value={patient.name} />
            <HorizontalInfo title="العمر" value={patient.age} />
            <HorizontalInfo
              title="الجنس"
              value={
                <div className="w-full flex gap-2 items-center">
                  <span>{patient.sex}</span>
                  {patient.sex === "ذكر" ? (
                    <MdMale className="text-blue-400" />
                  ) : (
                    <MdFemale className="text-pink-400" />
                  )}
                </div>
              }
            />
            <VerticalInfo
              title="الملاحظات"
              value={patient.notes}
              emptyValueMessage="لا يوجد ملاحظات"
            />
          </div>
        </div>
        <div className="w-1/2 self-center flex items-center justify-center  ">
          <Link href={`/patients/${params.id}/update`}>
            <AuthButton title="تعديل المريض" />
          </Link>
        </div>
      </div>
      <div className="w-[0.25rem] h-full bg-light_primary/50" />
      {/* Visits Log */}
      <PatientVisitsPage
        patientId={Number(params.id)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default PatientPage;
