import React from "react";
import Modal from "./Modal";
import Title from "../Title";
import ManualTemplateResult from "../Results/ManualTemplateResult";
import StaticTemplateResult from "../Results/StaticTemplateResult";
import moment from "moment";

function ViewResultsModal({ test, isOpen, setIsOpen, date }) {
  const template = JSON.parse(test.template);
  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"view-result-" + test.id}
    >
      <div className="w-full max-h-[90vh] overflow-y-auto flex flex-col items-center gap-4 py-2 px-4 relative">
        <Title>{test.Test.name}</Title>
        <div className="absolute right-[1rem] top-[0.5rem]">
          {moment(date).format("yyyy-MM-DD")}
        </div>
        {template.type === "manual" ? (
          <div>
            <ManualTemplateResult template={template} />
          </div>
        ) : (
          <div>
            <StaticTemplateResult template={template} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ViewResultsModal;
