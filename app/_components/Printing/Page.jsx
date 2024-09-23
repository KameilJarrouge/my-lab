import React from "react";

function Page({
  children,
  invisible = false,
  pageNumber,
  hideOnPrint = false,
}) {
  return (
    <div
      className={`w-[210mm] h-[297mm] bg-white p-[10mm] relative ${
        hideOnPrint && "print:hidden"
      } ${invisible && "invisible"} `}
    >
      {children}
      <div className="absolute top-[287mm] left-[5mm] h-[10mm] text-sm flex justify-center items-center w-fit min-w-[10ch] ">
        الصفحة : {pageNumber}
      </div>
    </div>
  );
}

export default Page;
