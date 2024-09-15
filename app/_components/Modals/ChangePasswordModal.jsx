"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import TextInput from "../Inputs/TextInput";
import AuthButton from "../Buttons/AuthButton";
import { errorMessages } from "@/app/_constants/constants";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import LoadingComponent from "../LoadingComponent";
import Title from "../Title";

function ChangePasswordModal({ isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let handleSubmitAndClose = async () => {
    if (!newPassword || !oldPassword) {
      return;
    }

    setIsLoading(true);
    let result = await api.post("/update-password", {
      oldPassword,
      newPassword,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error(errorMessages[result.data.errorCode]);
      return;
    }
    setOldPassword("");
    setNewPassword("");
    toast(`تم تغيير كلمة المرور بنجاح`);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    document.getElementById("first").focus();
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName="change-password"
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-50">
          <LoadingComponent loading={true} />
        </div>
      )}
      <div className="flex flex-col min-w-[24rem] px-8 py-4 gap-8 items-center">
        <Title>تغيير كلمة المرور</Title>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <TextInput
              id="first"
              state={oldPassword}
              setState={setOldPassword}
              title={"كلمة المرور القديمة"}
              type={"password"}
            />
            <TextInput
              state={newPassword}
              setState={setNewPassword}
              title={"كلمة المرور الجديدة"}
              type={"password"}
            />
          </div>
          <AuthButton title="متابعة" onClick={handleSubmitAndClose} />
        </div>
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
