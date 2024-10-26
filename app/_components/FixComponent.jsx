"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "./Buttons/AuthButton";
import LoadingComponent from "./LoadingComponent";

function FixComponent({
  description = "",
  checkIfFixed = async (f) => f,
  fix = async (f) => f,
  shouldBackUp = true,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);

  const handleBackup = async () => {
    const response = await fetch("http://localhost:3000/api/backup");
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.headers
        .get("Content-Disposition")
        .split("filename=")[1];
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Failed to download backup");
    }
  };

  const fixedStatus = async () => {
    setIsLoading(true);
    let result = await checkIfFixed();
    setIsLoading(false);
    setIsFixed(result);
  };

  const fixProblem = async () => {
    setIsLoading(true);
    await fix();
    await fixedStatus();
  };

  useEffect(() => {
    fixedStatus();
  }, []);

  return (
    <div className="w-[80ch] p-2 flex flex-col items-center gap-4 border border-light_primary relative">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}{" "}
      <p className="w-full">{description}</p>
      <div className="flex gap-8">
        <span
          className={`${
            !isFixed ? "bg-red-800" : "bg-green-800"
          } text-white px-2 py-0.5 rounded`}
        >
          {!isFixed ? "غير محلولة" : " محلولة"}
        </span>
        {!isFixed && (
          <AuthButton title="حل المشكلة" onClick={() => fixProblem()} />
        )}
        {shouldBackUp && isFixed && (
          <AuthButton
            title="يتطلب أخذ نسخة احتياطية من قاعدة البيانات"
            onClick={() => handleBackup()}
          />
        )}
      </div>
    </div>
  );
}

export default FixComponent;
