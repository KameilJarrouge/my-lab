"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Title from "../Title";
import { MdWarning } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import LoadingComponent from "../LoadingComponent";

function ConfirmModal({
  isOpen,
  setIsOpen,
  onConfirm,
  message,
  confirmButtonLabel = "متابعة",
  cancelButtonLabel = "إلغاء",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    setIsOpen(false);
  };
  const handleCancelation = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} close={() => setIsOpen(false)} uniqueName="confirm">
      <div className="w-[32rem] h-fit  flex flex-col  px-8 py-4 gap-8 items-center">
        {isLoading && (
          <div className="w-full h-full absolute top-0 left-0 z-50">
            <LoadingComponent loading={isLoading} />
          </div>
        )}
        <Title>
          <div className="flex gap-2 items-center">
            <span>يرجى الانتباه </span>
            <MdWarning className="text-warning" />
          </div>
        </Title>
        <div className="flex flex-col gap-6 items-center w-full">
          <span>{message}</span>

          <div className="flex justify-center gap-8 w-full items-center ">
            <AuthButton title={confirmButtonLabel} onClick={handleOnConfirm} />
            <AuthButton title={cancelButtonLabel} onClick={handleCancelation} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
