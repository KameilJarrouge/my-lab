import React from "react";
import Modal from "./Modal";
import Title from "../Title";
import ManipulateAAForm from "../Forms/ManipulateAAForm";

function AAManipulateModal({ uniqueName, isOpen, setIsOpen }) {
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"AA-" + uniqueName}
    >
      <div className="w-full flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-center">
          <Title>{"ANTIMICROBIAL AGENTS"}</Title>
        </div>
        <ManipulateAAForm shouldFetch={isOpen} />
      </div>
    </Modal>
  );
}

export default AAManipulateModal;
