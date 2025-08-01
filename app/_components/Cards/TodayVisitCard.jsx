"use client";
import React from "react";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";
import {
  FaEnvelope,
  FaFileInvoiceDollar,
  FaRegEnvelope,
} from "react-icons/fa6";
import { MdPrint } from "react-icons/md";
import { useRouter } from "next/navigation";

function TodayVisitCard({ visit }) {
  const router = useRouter();
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
      <div className="flex gap-3 items-center pl-2">
        {/* actions and links */}
        <Link href={`/patients/${visit.Patient.id}`}>
          <AuthButton title="صفحة المريض" />
        </Link>
        <Link href={`/visits/${visit.id}/update`}>
          <AuthButton title="تعديل الزيارة" />
        </Link>
        <button
          className={` ${
            visit.billPrinted ? "text-green-400" : "text-text"
          } hover:text-green-400`}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="طباعة الفاتورة"
          onClick={() => {
            if (visit.billPrinted)
              if (!confirm("الفاتورة مطبوعة من قبل! هل تريد المتابعة؟")) return;
            router.push(`/print/${visit.id}/invoice`);
          }}
        >
          <FaFileInvoiceDollar className="w-[1.3rem] h-fit" />
        </button>
        <button
          className={` ${
            visit.envelopePrinted ? "text-green-400" : "text-text"
          } hover:text-green-400`}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="طباعة الظرف"
          onClick={() => {
            if (visit.envelopePrinted)
              if (!confirm("الظرف مطبوع من قبل! هل تريد المتابعة؟")) return;
            router.push(`/print/${visit.id}/envelope`);
          }}
        >
          <FaEnvelope className="w-[1.3rem] h-fit" />
        </button>
        <button
          className={` ${
            visit.testPrinted ? "text-green-400" : "text-text"
          } hover:text-green-400`}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="طباعة النتائج"
          onClick={() => {
            if (visit.testPrinted)
              if (!confirm("الزيارة مطبوعة من قبل! هل تريد المتابعة؟")) return;
            router.push(`/print/${visit.id}`);
          }}
        >
          <MdPrint className="w-[1.3rem] h-fit" />
        </button>
      </div>
    </div>
  );
}

export default TodayVisitCard;
