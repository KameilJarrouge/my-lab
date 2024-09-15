import React from "react";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";

function DoctorCard({ doctor }) {
  return (
    <div className="bg-dark_primary hover:text-light_text group border border-transparent hover:border-text/30 shadow shadow-black h-fit w-[calc(50%-0.5rem)] px-2 py-[0.375rem] rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* info */}
        <span className="w-[30ch] truncate text-start group-hover:font-semibold">
          {doctor.name}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {/* actions and links */}

        <Link href={`/doctors/${doctor.id}/update`}>
          <AuthButton title="تعديل" />
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
