"use client";
import CreateTestForm from "@/app/_components/Forms/CreateTestForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CreateTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTestExistModalOpen, setIsTestExistModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const handleCreateTest = async (name, units, category, template) => {
    // handle existing category and non existing (create a new one)
    let testCategoryId = undefined;
    const existingCategory = categories.filter(
      (categoryInList) =>
        categoryInList.name.toLowerCase() === category.toLowerCase()
    );

    if (existingCategory.length === 0) {
      // create a new one
      const newCategoryResult = await api.post("/categories/create", {
        name: category,
      });
      if (!newCategoryResult.data.success) {
        toast.error("Check The Console!");
        console.error(
          "Something went wrong while creating new category in Test page"
        );
        return;
      }

      testCategoryId = newCategoryResult.data.result.id;
    } else {
      // found an existing category
      testCategoryId = existingCategory[0].id;
    }

    // handle adding the measure unit (if needed) if manual template
    if (template.type === "manual") {
      await api.post("/settings/add-unit-or-nothing", {
        name: template.data.unit,
      });
    }

    const result = await api.post("/tests/create", {
      name,
      units,
      testCategoryId,
      template,
    });

    setIsLoading(false);

    if (result.data.success) {
      toast("تم إضافة التحليل بنجاح");
      router.push(`/`);
    }
  };

  const handleSubmit = async (
    name,
    units,
    category,
    template,
    templateType,
    staticTemplate
  ) => {
    if (name === "") {
      toast.error("يرجى ادخال اسم التحليل");
      return;
    }
    if (isNaN(Number(units))) {
      toast.error("يرجى ادخال رقم في خانة عدد الوحدات");
      return;
    }

    if (category === "") {
      toast.error("يرجى أدخال تصنيف للتحليل");
      return;
    }
    if (templateType === "قالب يدوي") {
      console.log(template);
      if (
        template.min.trim() === "" ||
        isNaN(Number(template.min)) ||
        template.max.trim() === "" ||
        isNaN(Number(template.max))
      ) {
        toast.error("يرجى ادخال أرقام في خانتي القيمة الأدنى والقيمة الأعلى");
        return;
      }

      if (template.unit === "") {
        toast.error("يرجى إدخال وحدة القياس");
        return;
      }
    }
    return;

    setIsLoading(true);
    const isNameUnique = await api.post("/tests/unique-name", {
      name: name,
    });

    if (!isNameUnique.data.success) {
      toast.error("Check The Console!");
      console.error("unique-name for test is returned false");
      return;
    }

    // decide what to put in the template (in db)
    let templateForSubmit = {};
    if (templateType === "قالب يدوي") {
      templateForSubmit = {
        type: "manual",
        data: template,
      };
      if (template.referenceRange === "") {
        templateForSubmit.data.referenceRange = String(
          templateForSubmit.data.min + " - " + templateForSubmit.data.max
        );
      }
    } else {
      templateForSubmit = {
        type: "static",
        staticTemplate: staticTemplate,
      };
    }

    if (isNameUnique.data.result !== null) {
      // there is a testy with similar name
      setIsLoading(false);
      setData({ name, units, category, templateForSubmit });
      setIsTestExistModalOpen(true);
      return;
    } else {
      await handleCreateTest(name, units, category, templateForSubmit);
    }
  };

  const getCategories = async () => {
    setIsLoading(true);
    const result = await api.get("/categories/list");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching categories list");
      return;
    }
    setCategories(result.data.result);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className=" h-full w-fit  relative">
        <ConfirmModal
          message={`يوجد تحليل في قاعدة البيانات بنفس الاسم (${data.name})! هل تريد الاحتفاظ بالجديد؟`}
          isOpen={isTestExistModalOpen}
          setIsOpen={setIsTestExistModalOpen}
          onConfirm={() => handleCreateTest(data)}
          confirmButtonLabel="نعم, الاحتفاظ بالجديد"
          cancelButtonLabel="لا, إلغاء العملية"
        />
        <CreateTestForm submit={handleSubmit} categories={categories} />
      </div>
    </div>
  );
}

export default CreateTestPage;
