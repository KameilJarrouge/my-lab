import React from "react";
import Title from "../Title";

function NoteDisplay({ note }) {
  if (!note) return <></>;
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-semibold">ملاحظات</span>
      <div className="w-full h-fit p-0.5 flex flex-col gap-0.5 bg-primary">
        {note.split("\n").map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    </div>
  );
}

export default NoteDisplay;
