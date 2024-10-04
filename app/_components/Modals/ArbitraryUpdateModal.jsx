"use client";
import React, { useState } from "react";
import Title from "../Title";
import UpdateArbitraryForm from "../Forms/UpdateArbitraryForm";
import Modal from "./Modal";
import LoadingComponent from "../LoadingComponent";

function ArbitraryUpdateModal({ uniqueName, isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"Arbitrary-Update-" + uniqueName}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-50">
          <LoadingComponent loading={true} />
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-center">
          <Title>{"قيم الإكمال التلقائي"}</Title>
        </div>
        <UpdateArbitraryForm setIsLoading={setIsLoading} />
      </div>
    </Modal>
  );
}

export default ArbitraryUpdateModal;
