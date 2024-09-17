import React from "react";
import Borders from "../Borders";
import moment from "moment";
function PrintHeader({
  location = "مصياف - شارع الوراقة - مقابل صيدلية منال الناعمة - هاتف 7719944",
  patientName = "سعيد ساعود",
  patientSex = "male",
  doctorsName = "كميل جروج",
  date = new Date(),
}) {
  return (
    <div className="h-[73mm]  w-full relative">
      <img
        src="/SCLA_BASHAR.png"
        className="absolute left-[5mm] top-0 w-[60mm] h-fit z-10 rounded-full bg-white"
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
          <span className="text-3xl px-[46mm] pt-[2mm] font-bold text-light_primary">
            للتحاليــل الطبيــة
          </span>
          <span className="text-xl px-[5mm] text-black pt-[5mm]">
            دكتور في الطب البشري - اخصائي في التشخيص المخبري
          </span>
          <span className="text-lg px-[4mm] text-black pt-[3mm]">
            {location}
          </span>
          <div className="w-full flex items-center justify-between border-b border-b-black mt-1 pb-1 pt-1">
            <div className="flex items-center gap-2 w-1/3 justify-start">
              <span className="font-semibold">الاسم :</span>
              <span>
                {" "}
                السيد {(patientSex !== "male" ? "ة" : "") + patientName}
              </span>
            </div>
            <div className="flex items-center gap-2 w-1/3 justify-center">
              {doctorsName !== "" && (
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
    </div>
  );
}

export default PrintHeader;
