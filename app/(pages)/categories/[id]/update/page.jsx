"use client";
import UpdateTestCategoryForm from "@/app/_components/Forms/UpdateTestCategoryForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateCategoryPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [category, setCategory] = useState({});
  const router = useRouter();
  const handleUpdateCategory = async (name) => {
    setIsLoading(true);
    const result = await api.put(`/categories/${Number(params.id)}/update`, {
      name,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("تم تعديل التصنيف بنجاح");
      router.push(`/`);
    }
  };

  const handleOnDelete = async () => {
    setConfirmIsOpen(true);
  };

  const handleDeleteCategory = async () => {
    const result = await api.delete(`/categories/${category.id}/delete`);
    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error("Something went wrong while deleting category");
      return;
    }
    toast("تم حذف التنصيف بنجاح");
    router.push(`/`);
  };

  const getCategory = async () => {
    setIsLoading(true);
    const result = await api.get(`/categories/${Number(params.id)}`);
    setIsLoading(false);
    if (!result.data.success) return;
    setCategory(result.data.result);
  };

  useEffect(() => {
    getCategory();
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
          onConfirm={handleDeleteCategory}
          message={`هل أنت متأكد من حذف التنصيف (${category.name})؟ سيتم حذف جميع المعلومات الخاصة به !`}
          confirmButtonLabel="حذف"
        />
        <UpdateTestCategoryForm
          submit={handleUpdateCategory}
          values={category}
          onDelete={handleOnDelete}
        />
      </div>
    </div>
  );
}

export default UpdateCategoryPage;
