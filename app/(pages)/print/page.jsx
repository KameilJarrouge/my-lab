"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function PrintPage() {
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get("hello"));
  }, []);

  return (
    <div>
      <div className="  w-[100vw] h-[100vh] overflow-visible ">
        <div className="w-[210mm] min-h-[297mm] text-black mx-auto bg-white">
          hello
        </div>
        <div className="w-[210mm] min-h-[297mm] text-black mx-auto bg-white">
          hello
        </div>
      </div>
    </div>
  );
}

export default PrintPage;
