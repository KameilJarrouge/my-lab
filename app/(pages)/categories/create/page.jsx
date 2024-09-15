"use client";
import CreateTestCategoryForm from "@/app/_components/Forms/CreateTestCategoryForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CreateCategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryExistModalOpen, setIsCategoryExistModalOpen] =
    useState(false);
  const [data, setData] = useState("");
  const router = useRouter();

  const handleCreateCategory = async (name) => {
    const result = await api.post("/categories/create", {
      name,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم إضافة التصنيف بنجاح");
      router.push(`/`);
    }
  };
  const handleSubmit = async (name) => {
    setIsLoading(true);
    const isNameUnique = await api.post("/categories/unique-name", {
      name: name,
    });
    if (!isNameUnique.data.success) {
      toast.error("Check The Console!");

      console.error("unique-name for category has returned false");
      return;
    }
    if (isNameUnique.data.result !== null) {
      // there is a patient with similar name
      setIsLoading(false);
      setData(name);
      setIsCategoryExistModalOpen(true);
      return;
    } else {
      await handleCreateCategory(name);
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
          message={`يوجد تصنيف في قاعدة البيانات بنفس الاسم (${data})! هل تريد الاحتفاظ بالجديد؟`}
          isOpen={isCategoryExistModalOpen}
          setIsOpen={setIsCategoryExistModalOpen}
          onConfirm={() => handleCreateCategory(data)}
          confirmButtonLabel="نعم, الاحتفاظ بالجديد"
          cancelButtonLabel="لا, إلغاء العملية"
        />
        <CreateTestCategoryForm submit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateCategoryPage;
