import React from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdFemale,
  MdMale,
} from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";

function PatientCard({ patient }) {
  return (
    <div className="bg-dark_primary hover:text-light_text group border border-transparent hover:border-text/30 shadow shadow-black h-fit w-[calc(50%-0.5rem)] px-2 py-[0.375rem] rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* info */}
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={patient.name}
          className="w-[20ch] truncate text-start group-hover:font-semibold"
        >
          {patient.name}
        </span>
        {patient.sex === "ذكر" ? (
          <MdMale
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"ذكر"}
            className="text-blue-400"
          />
        ) : (
          <MdFemale
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"أنثى"}
            className="text-pink-400"
          />
        )}
        <div className="flex gap-1 items-center">
          <MdChevronRight />
          <span data-tooltip-id="my-tooltip" data-tooltip-content={"العمر"}>
            {patient.age}
          </span>
          <MdChevronLeft />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {/* actions and links */}
        <Link href={`/patients/${patient.id}`}>
          <AuthButton title="صفحة المريض" />
        </Link>
        <Link href={`/patients/${patient.id}/update`}>
          <AuthButton title="تعديل" />
        </Link>
        <Link href={`/patients/${patient.id}/new-visit`}>
          <AuthButton title="زيارة جديدة" />
        </Link>
      </div>
    </div>
  );
}

export default PatientCard;
