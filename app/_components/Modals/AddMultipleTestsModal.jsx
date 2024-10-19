import React from "react";
import Modal from "./Modal";
import Title from "../Title";
import AddMultipleTestsForm from "../Forms/AddMultipleTestsForm";

function AddMultipleTestsModal({
  uniqueName,
  isOpen,
  setIsOpen,
  tests,
  submit,
}) {
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"addMultipleTests-" + uniqueName}
    >
      <div className="w-full h-[90vh] flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-center">
          <Title>{"قائمة التحاليل"}</Title>
        </div>
        <AddMultipleTestsForm
          tests={tests}
          submit={submit}
          close={() => setIsOpen(false)}
        />
      </div>
    </Modal>
  );
}

export default AddMultipleTestsModal;
