import React from "react";
import Borders from "../Borders";
import moment from "moment";
import { getTitle } from "@/app/_lib/getTitle";
function PrintHeader({
  location = "Location",
  patientName,
  patientSex,
  patientAge,
  doctorsName,
  overrideTitle,
  isDoctorShown,
  date,
}) {
  return (
    <header className="h-[60mm]  w-[200mm] absolute  top-[5mm] left-[5mm] z-[1000] bg-white">
      <img
        src="/SCLA_BASHAR.png"
        className="absolute left-[5mm] top-0 w-[50mm] h-fit z-10 rounded-full bg-white"
      />

      <div className="w-full h-full">
        {/* right */}
        <div className=" absolute top-[3mm] left-0">
          <Borders />
        </div>
        {/* Middle */}
        <div className="flex flex-col w-full h-full gap-4">
          <span className="text-4xl px-[20mm] font-bold ">
            {" "}
            مـخبـر الدكتور بشــار جـروج
          </span>
          <span className="text-3xl px-[46mm]  font-bold text-light_primary">
            للتحاليــل الطبيــة
          </span>
          <span className="text-xl px-[5mm] text-black ">
            دكتور في الطب البشري - اخصائي في التشخيص المخبري
          </span>
          <span className="text-lg px-[4mm] text-black ">{location}</span>
          <div className="w-full flex items-center justify-between border-b border-b-black  pb-1 ">
            <div className="flex items-center gap-2 w-1/3 justify-start">
              <span className="font-semibold">الاسم :</span>
              <span>
                {(overrideTitle || getTitle(patientSex, patientAge)) +
                  " " +
                  patientName}
              </span>
            </div>
            <div className="flex items-center gap-2 w-1/3 justify-center">
              {isDoctorShown && (
                <>
                  <span className="font-semibold">الدكتور :</span>
                  <span>{doctorsName}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 w-1/3 justify-end">
              <span className="font-semibold">التاريخ :</span>
              <span>{moment(date).format("yyyy-MM-DD")}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PrintHeader;
