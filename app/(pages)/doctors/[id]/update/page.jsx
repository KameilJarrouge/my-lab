"use client";
import UpdateDoctorForm from "@/app/_components/Forms/UpdateDoctorForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateDoctorPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [doctor, setDoctor] = useState({});
  const router = useRouter();
  const handleUpdateDoctor = async (name) => {
    setIsLoading(true);
    const result = await api.put(`/doctors/${Number(params.id)}/update`, {
      name,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم تعديل الطبيب بنجاح");
      router.push(`/`);
    }
  };

  const handleOnDelete = async () => {
    setConfirmIsOpen(true);
  };

  const handleDeleteDoctor = async () => {
    const result = await api.delete(`/doctors/${doctor.id}/delete`);
    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error("Something went wrong while deleting patient");
      return;
    }
    toast("تم حذف الطبيب بنجاح");
    router.push(`/`);
  };

  const getDoctor = async () => {
    setIsLoading(true);
    const result = await api.get(`/doctors/${Number(params.id)}`);
    setIsLoading(false);
    if (!result.data.success) return;
    setDoctor(result.data.result);
  };

  useEffect(() => {
    getDoctor();
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
          onConfirm={handleDeleteDoctor}
          message={`هل أنت متأكد من حذف الطبيب (${doctor.name})؟ سيتم حذف جميع المعلومات الخاصة به !`}
          confirmButtonLabel="حذف"
        />
        <UpdateDoctorForm
          submit={handleUpdateDoctor}
          values={doctor}
          onDelete={handleOnDelete}
        />
      </div>
    </div>
  );
}

export default UpdateDoctorPage;
