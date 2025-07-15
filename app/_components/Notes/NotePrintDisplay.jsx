import React, { useState } from "react";

function NotePrintDisplay({ note }) {
  const [isHiddenInPrint, setIsHiddenInPrint] = useState(false);
  if (!note) return <></>;
  return (
    <div
      className={`w-full h-fit p-0.5 flex flex-col gap-0.5 border border-gray-200 col-span-full my-0.5 relative group  ${
        isHiddenInPrint && "print:hidden"
      }`}
      dir="rtl"
    >
      {isHiddenInPrint && (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-200/80 print:hidden flex items-center justify-center">
          الملاحظات لن تظهر في الطباعة
        </div>
      )}
      <div
        onClick={() => setIsHiddenInPrint((value) => !value)}
        className="w-full h-full  absolute top-0 left-0 invisible  group-hover:visible print:hidden bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        {isHiddenInPrint
          ? "اضغط لإظهار الملاحظات في الطباعة"
          : "اضغط لإخفاء الملاحظات عن الطباعة"}
      </div>

      {note.split("\n").map((line) => (
        <span>{line}</span>
      ))}
    </div>
  );
}

export default NotePrintDisplay;
