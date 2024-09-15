"use client";
import CreateDoctorForm from "@/app/_components/Forms/CreateDoctorForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CreateDoctorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDoctorExistModalOpen, setIsDoctorExistModalOpen] = useState(false);
  const [data, setData] = useState("");
  const router = useRouter();

  const handleCreateDoctor = async (name) => {
    const result = await api.post("/doctors/create", {
      name,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم إضافة الطبيب بنجاح");
      router.push(`/`);
    }
  };
  const handleSubmit = async (name) => {
    setIsLoading(true);
    const isNameUnique = await api.post("/doctors/unique-name", {
      name: name,
    });
    if (!isNameUnique.data.success) {
      toast.error("Check The Console!");

      console.error("unique-name for doctor is returned false");
      return;
    }
    if (isNameUnique.data.result !== null) {
      // there is a patient with similar name
      setIsLoading(false);
      setData(name);
      setIsDoctorExistModalOpen(true);
      return;
    } else {
      await handleCreateDoctor(name);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="bg-dark_primary rounded h-full w-fit py-2 px-8 relative">
        <ConfirmModal
          message={`يوجد طبيب في قاعدة البيانات بنفس الاسم (${data})! هل تريد الاحتفاظ بالجديد؟`}
          isOpen={isDoctorExistModalOpen}
          setIsOpen={setIsDoctorExistModalOpen}
          onConfirm={() => handleCreateDoctor(data)}
          confirmButtonLabel="نعم, الاحتفاظ بالجديد"
          cancelButtonLabel="لا, إلغاء العملية"
        />
        <CreateDoctorForm submit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateDoctorPage;
