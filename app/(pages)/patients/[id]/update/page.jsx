"use client";
import UpdatePatientForm from "@/app/_components/Forms/UpdatePatientForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdatePatientPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [patient, setPatient] = useState({});
  const router = useRouter();
  const handleUpdatePatient = async (name, age, sex, notes) => {
    setIsLoading(true);
    const result = await api.put(`/patients/${Number(params.id)}/update`, {
      name,
      age,
      sex,
      notes,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم تعديل المريض بنجاح");
      router.push(`/patients/${Number(params.id)}`);
    }
  };

  const handleOnDelete = async () => {
    setConfirmIsOpen(true);
  };

  const handleDeletePatient = async () => {
    const result = await api.delete(`/patients/${patient.id}/delete`);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while deleting patient");
      return;
    }
    toast("تم حذف المريض بنجاح");
    router.push(`/`);
  };

  const getPatient = async () => {
    setIsLoading(true);
    const result = await api.get(`/patients/${Number(params.id)}`);
    setIsLoading(false);
    if (!result.data.success) return;
    setPatient(result.data.result);
  };

  useEffect(() => {
    getPatient();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="bg-dark_primary rounded h-full w-fit py-2 px-8 relative">
        <ConfirmModal
          isOpen={confirmIsOpen}
          setIsOpen={setConfirmIsOpen}
          onConfirm={handleDeletePatient}
          message={`هل أنت متأكد من حذف المريض (${patient.name})؟ سيتم حذف جميع المعلومات الخاصة به !`}
          confirmButtonLabel="حذف"
        />
        <UpdatePatientForm
          submit={handleUpdatePatient}
          values={patient}
          onDelete={handleOnDelete}
        />
      </div>
    </div>
  );
}

export default UpdatePatientPage;
