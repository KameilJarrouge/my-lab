import React from "react";

function Page({ children }) {
  return (
    <div className="w-full h-[297mm] bg-white px-[5mm] pt-[5mm] pb-[10mm] relative ">
      {children}
      <div className="absolute top-[287mm] left-[5mm] h-[10mm] flex justify-center items-center w-fit min-w-[10ch] ">
        الصفحة: 1
      </div>
    </div>
  );
}

export default Page;
