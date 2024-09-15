"use client";
import CreatePatientForm from "@/app/_components/Forms/CreatePatientForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import PatientExistsModal from "@/app/_components/Modals/PatientExistsModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CreatePatientPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPatientExistModalOpen, setIsPatientExistModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [existingPatient, setExistingPatient] = useState({});
  const router = useRouter();

  const handleCreatePatient = async (name, age, sex, notes) => {
    const result = await api.post("/patients/create", {
      name,
      age,
      sex,
      notes,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم إضافة المريض بنجاح");
      router.push(`/patients/${result.data.result}`);
    }
  };
  const handleSubmit = async (name, age, sex, notes) => {
    setIsLoading(true);
    const isNameUnique = await api.post("/patients/unique-name", {
      name: name,
    });
    if (!isNameUnique.data.success) {
      toast.error("Check The Console!");
      console.error("unique-name for patient is returned false");
      return;
    }
    if (isNameUnique.data.result !== null) {
      // there is a patient with similar name
      setIsLoading(false);
      setExistingPatient(isNameUnique.data.result);
      setData({ name, age, sex, notes });
      setIsPatientExistModalOpen(true);
      return;
    } else {
      await handleCreatePatient(name, age, sex, notes);
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
        <PatientExistsModal
          isOpen={isPatientExistModalOpen}
          setIsOpen={setIsPatientExistModalOpen}
          onDuplicate={() =>
            handleCreatePatient(data.name, data.age, data.sex, data.notes)
          }
          patient={existingPatient}
        />
        <CreatePatientForm submit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreatePatientPage;
