import React from "react";

function Page({
  children,
  invisible = false,
  pageNumber,
  hideOnPrint = false,
  heightFit = false,
}) {
  return (
    <div
      className={`w-[210mm] ${
        heightFit ? "h-fit" : "h-[297mm]"
      } bg-white py-[10mm] px-[5mm] relative ${hideOnPrint && "print:hidden"} ${
        invisible && "invisible"
      } `}
    >
      {/* <div className="w-[210mm] h-[2px] border border-dashed border-red-500/20 absolute top-[calc(297mm/2)] left-[0mm] z-[1000] print:hidden"></div> */}
      {children}
      <div className="absolute top-[287mm] left-[5mm] h-[10mm] text-sm flex justify-center items-center w-fit min-w-[10ch] ">
        الصفحة : {pageNumber}
      </div>
    </div>
  );
}

export default Page;
