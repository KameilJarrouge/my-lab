"use client";
import React from "react";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";

function TodayVisitCard({ visit }) {
  return (
    <div
      className={`bg-dark_primary   h-fit w-full group  rounded flex items-center justify-between p-2 shadow shadow-black`}
    >
      <div className="flex items-center gap-4">
        {/* info */}

        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"المريض : " + visit.Patient.name}
          className="max-w-[25ch] truncate "
        >
          {"المريض : " + visit.Patient.name}
        </span>
        <span className="text-dark_text/60">•</span>
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"الطبيب : " + visit.doctor.name}
          className="max-w-[25ch] truncate "
        >
          {"الطبيب : " + visit.doctor.name}
        </span>
        <span className="text-dark_text/60">•</span>
        <span>{"عدد التحاليل : " + visit._count.tests}</span>
      </div>
      <div className="flex gap-6 items-center pl-2">
        {/* actions and links */}
        <Link href={`/patients/${visit.Patient.id}`}>
          <AuthButton title="صفحة المريض" />
        </Link>
        <Link href={`/visits/${visit.id}/update`}>
          <AuthButton title="تعديل الزيارة" />
        </Link>
      </div>
    </div>
  );
}

export default TodayVisitCard;
