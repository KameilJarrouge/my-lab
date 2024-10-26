import React from "react";
import Modal from "./Modal";
import FixComponent from "../FixComponent";
import Title from "../Title";
import api from "@/app/_lib/api";
function ErrorsAndFixesModal({ uniqueName, isOpen, setIsOpen }) {
  const directlFix = async () => {
    await api.get(`/fixes/fix-direct-sa`);
  };

  const checkDirectlIsuue = async () => {
    const result = await api.get(`/fixes/check-direct-sa-issue`);
    return result.data.result;
  };

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"E&F-" + uniqueName}
    >
      <div className="w-full flex flex-col items-center gap-4 py-2 px-4 relative max-h-[80vh] h-fit overflow-y-auto overflow-x-hidden">
        <div className="w-full flex justify-center">
          <Title>{"تصحيح الأخطاء"}</Title>
        </div>
        <FixComponent
          description="خطأ في القالب الجاهز semen analysis. (المشكلة تكمن في قاعدة البيانات بسبب تصليح تسمية ال Directl إلى Direct)"
          checkIfFixed={checkDirectlIsuue}
          fix={directlFix}
        />
      </div>
    </Modal>
  );
}

export default ErrorsAndFixesModal;
