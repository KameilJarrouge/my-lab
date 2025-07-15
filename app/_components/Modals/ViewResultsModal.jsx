import React from "react";
import Modal from "./Modal";
import Title from "../Title";
import ManualTemplateResult from "../Results/ManualTemplateResult";
import StaticTemplateResult from "../Results/StaticTemplateResult";
import moment from "moment";
import NoteDisplay from "../Notes/NoteDisplay";

function ViewResultsModal({ test, isOpen, setIsOpen, date }) {
  const template = JSON.parse(test.template);
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"view-result-" + test.id}
    >
      <div className="w-full max-h-[90vh] overflow-y-auto flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-between">
          <span className="w-[10ch]">{moment(date).format("yyyy-MM-DD")}</span>
          <Title>{test.Test.name}</Title>
          <span className="w-[10ch]"></span>
        </div>
        <div className="absolute right-[1rem] top-[0.5rem]"></div>
        {template.type === "manual" ? (
          <div>
            <ManualTemplateResult template={template} />
          </div>
        ) : (
          <div>
            <StaticTemplateResult template={template} />
          </div>
        )}
        <NoteDisplay note={test.note} />
      </div>
    </Modal>
  );
}

export default ViewResultsModal;
