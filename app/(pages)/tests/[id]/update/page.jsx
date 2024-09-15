"use client";
import UpdateTestForm from "@/app/_components/Forms/UpdateTestForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateTestPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [test, setTest] = useState({});

  const router = useRouter();

  const getTest = async () => {
    setIsLoading(true);
    const result = await api.get(`/tests/${params.id}/test-with-category`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching test with category");
      return;
    }
    setTest(result.data.result);
  };

  const handleUpdateTest = async (name, units, category, template) => {
    // handle existing category and non existing (create a new one)
    let testCategoryId = undefined;
    const existingCategory = categories.filter(
      (categoryInList) =>
        categoryInList.name.toLowerCase() === category.toLowerCase()
    );
    setIsLoading(true);

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

    const result = await api.put(`/tests/${params.id}/update`, {
      name,
      units,
      testCategoryId,
      template,
    });

    setIsLoading(false);

    if (result.data.success) {
      toast("تم تعديل التحليل بنجاح");
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
      if (isNaN(Number(template.min)) || isNaN(Number(template.max))) {
        toast.error("يرجى ادخال أرقام في خانتي القيمة الأدنى والقيمة الأعلى");
        return;
      }

      if (template.unit === "") {
        toast.error("يرجى إدخال وحدة القياس");
        return;
      }
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

    await handleUpdateTest(name, units, category, templateForSubmit);
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
    getTest();
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
        <UpdateTestForm
          submit={handleSubmit}
          categories={categories}
          test={test}
        />
      </div>
    </div>
  );
}

export default UpdateTestPage;
