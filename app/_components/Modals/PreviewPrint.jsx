"use client";
import React, { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import Modal from "./Modal";

function PreviewPrint({ tests, patient, date, isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName="print-preview"
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-50">
          <LoadingComponent loading={true} />
        </div>
      )}
      <div
        onClick={() => setIsOpen(false)}
        className=" items-center py-1 w-[100vw] h-[100vh] bg-white overflow-y-visible "
      >
        <div className="w-[210mm] min-h-[297mm] text-black mx-auto">hello</div>
        <div className="w-[210mm] min-h-[297mm] text-black mx-auto">hello</div>
      </div>
    </Modal>
  );
}

export default PreviewPrint;
