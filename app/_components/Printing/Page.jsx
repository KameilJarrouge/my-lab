import React from "react";

function Page({ children, invisible = false }) {
  return (
    <div
      className={`w-[210mm] h-[297mm] bg-white p-[5mm] relative  ${
        invisible && "invisible"
      } `}
    >
      {children}
      {/* <div className="absolute top-[287mm] left-[5mm] h-[10mm] flex justify-center items-center w-fit min-w-[10ch] ">
        الصفحة: 1
      </div> */}
    </div>
  );
}

export default Page;
