import React from "react";
import Modal from "./Modal";
import Title from "../Title";
import SelectAAForm from "../Forms/SelectAAForm";

function AASelectModal({
  uniqueName,
  isOpen,
  setIsOpen,
  selectedAA,
  setSelectedAA,
}) {
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"AA-Select-" + uniqueName}
    >
      <div className="w-fit flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-center">
          <Title>{"ANTIMICROBIAL AGENTS"}</Title>
        </div>
        <SelectAAForm
          shouldFetch={isOpen}
          selectedAA={selectedAA}
          setSelectedAA={setSelectedAA}
          close={() => setIsOpen(false)}
        />
      </div>
    </Modal>
  );
}

export default AASelectModal;
