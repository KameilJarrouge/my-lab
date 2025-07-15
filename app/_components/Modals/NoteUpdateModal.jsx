import React, { useEffect } from "react";
import Modal from "./Modal";
import Title from "../Title";
import TextAreaInput from "../Inputs/TextAreaInput";
import AuthButton from "../Buttons/AuthButton";

function NoteUpdateModal({
  isOpen,
  setIsOpen,
  uniqueName,
  note,
  setNote,
  restore,
  save,
}) {
  const handleUpdateNote = (value) => {
    if (value === "") setNote(null);
    else setNote(value);
  };
  useEffect(() => {}, [note]);

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName={"note-update-modal-" + uniqueName}
    >
      <div className="w-fit flex flex-col items-center gap-4 py-2 px-4 relative">
        <div className="w-full flex justify-center">
          <Title>{`ملاحظات على: ${uniqueName}`}</Title>
        </div>
        <div className="w-[50ch]">
          <TextAreaInput
            state={note === null ? "" : note}
            setState={handleUpdateNote}
            rows={15}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <AuthButton title="استعادة" onClick={restore} />
          <AuthButton title="إفراغ الملاحظات" onClick={() => setNote(null)} />
          <AuthButton
            title="حفظ وإغلاق"
            onClick={() => {
              save();
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default NoteUpdateModal;
