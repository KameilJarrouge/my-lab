"use client";
import React, { useMemo, useState } from "react";
import { MdChevronRight, MdPrint } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import TestRow from "../Rows/TestRow";
import { useRouter } from "next/navigation";
import { FaFileInvoiceDollar } from "react-icons/fa6";

function VisitCard({ visit, alterBg = false }) {
  const router = useRouter();
  const [areTestsVisible, setAreTestsVisible] = useState(false);
  const totalPrice = useMemo(() => {
    return visit.tests.reduce((total, test) => {
      return total + Number(test.units) * Number(test.price);
    }, 0);
  }, [visit]);

  return (
    <div className="w-full flex flex-col h-fit shadow shadow-black">
      <div
        className={`${
          alterBg ? "bg-dark_primary/80" : "bg-dark_primary"
        } border-b ${
          areTestsVisible ? "border-b-dark_text/80" : "border-transparent"
        } h-fit w-full group  rounded flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          {/* info */}
          <button
            onClick={() => router.push(`/patients/${visit.Patient.id}`)}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"المريض : " + visit.Patient.name}
            className="w-[30ch] truncate text-center bg-light_primary text-light_text py-2 rounded-s"
          >
            {visit.Patient.name}
          </button>
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"الطبيب : " + visit.doctor.name}
            className="max-w-[25ch] truncate "
          >
            {"الطبيب : " + visit.doctor.name}
          </span>
          <span className="text-dark_text/60">•</span>
          <span>{"عدد التحاليل : " + visit.tests.length}</span>
          <span className="text-dark_text/60">•</span>

          <span>
            {"التكلفة الإجمالية : " + numberWithCommas(totalPrice) + " ل.س"}
          </span>
        </div>
        <div className="flex gap-6 items-center pl-2">
          {/* actions and links */}
          <Link href={`/visits/${visit.id}/update`}>
            <AuthButton title="تعديل الزيارة" />
          </Link>
          <button
            className="text-text hover:text-green-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="طباعة الفاتورة"
            onClick={() => router.push(`/print/${visit.id}/invoice`)}
          >
            <FaFileInvoiceDollar className="w-[1.3rem] h-fit" />
          </button>
          <button
            className="text-text hover:text-green-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="طباعة النتائج"
            onClick={() => router.push(`/print/${visit.id}`)}
          >
            <MdPrint className="w-[1.3rem] h-fit" />
          </button>
          <button
            className=" group"
            onClick={() =>
              setAreTestsVisible((areTestsVisible) => !areTestsVisible)
            }
          >
            <MdChevronRight
              className={`text-text w-[1.1rem] h-fit ${
                !areTestsVisible ? "rotate-90" : "-rotate-90 "
              } transition-transform group-hover:text-light_text`}
            />
          </button>
        </div>
      </div>
      {areTestsVisible && (
        <div className="w-full h-fit py-3 px-4 bg-dark_primary/60 rounded-b flex flex-col gap-4">
          {visit.tests.map((test, index, arr) => (
            <div key={index} className="flex flex-col gap-3">
              <TestRow test={test} index={index} date={visit.date} />
              {index !== arr.length - 1 && (
                <div className="w-full h-[1px] bg-light_primary"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VisitCard;
