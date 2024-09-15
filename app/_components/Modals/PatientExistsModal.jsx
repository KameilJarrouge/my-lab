"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Title from "../Title";
import { MdWarning } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import { useRouter } from "next/navigation";
import LoadingComponent from "../LoadingComponent";

function PatientExistsModal({ isOpen, setIsOpen, onDuplicate, patient }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleOnDuplicate = async () => {
    setIsLoading(true);
    await onDuplicate();
    setIsLoading(false);
  };
  const handleCancelation = () => {
    router.push(`/patients/${patient.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName="patient-exists"
    >
      <div className="w-[32rem] h-fit  flex flex-col  px-8 py-4 gap-8 items-center">
        {isLoading && (
          <div className="w-full h-full absolute top-0 left-0 z-50">
            <LoadingComponent loading={isLoading} />
          </div>
        )}
        <Title>
          <div className="flex gap-2 items-center">
            <span>يرجى الانتباه </span>
            <MdWarning className="text-warning" />
          </div>
        </Title>
        <div className="flex flex-col gap-6 items-center w-full">
          <span>المريض موجود بالفعل بقاعدة البيانات! هل تقصد هذا المريض؟</span>
          <div className="flex  gap-4 w-full items-center justify-center flex-wrap">
            <div className="flex justify-center bg-primary rounded-md shadow-sm shadow-black/60 py-1 gap-2 items-center w-fit px-4">
              <span>الاسم :</span>
              <span> {patient.name}</span>
            </div>
            <div className="flex justify-center bg-primary rounded-md shadow-sm shadow-black/60 py-1 gap-2 items-center w-fit px-4">
              <span>العمر :</span>
              <span>{patient.age}</span>
            </div>
            <div className="flex justify-center bg-primary rounded-md shadow-sm shadow-black/60 py-1 gap-2 items-center w-fit px-4">
              <span>الجنس :</span>
              <span>{patient.sex}</span>
            </div>
          </div>
          <div className="flex justify-center gap-8 w-full items-center ">
            <AuthButton
              title="لا, حفظ المريض الجديد"
              onClick={handleOnDuplicate}
            />
            <AuthButton
              title="نعم, إلغاء العملية"
              onClick={handleCancelation}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PatientExistsModal;
