import React from "react";
import Title from "./Title";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import numberWithCommas from "../_lib/numberWithCommas";

function TodayEarningsComponent({
  totalEarnings,
  isTotalEarningsHidden,
  setIsTotalEarningsHidden,
}) {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-dark_primary shadow shadow-black rounded pt-2 pb-4 ">
      <Title>إجمالي ربح اليوم</Title>
      <div className="flex gap-2 rounded bg-light_primary py-0.5 px-2 justify-center">
        <span className={`w-[20ch]   text-center `}>
          {totalEarnings === -1
            ? "-"
            : isTotalEarningsHidden
            ? "مخفي"
            : numberWithCommas(totalEarnings) + " ل.س"}
        </span>
        {isTotalEarningsHidden ? (
          <button>
            <IoMdEye
              onClick={() => setIsTotalEarningsHidden(false)}
              className="fill-dark_text hover:fill-light_text cursor-pointer"
            />
          </button>
        ) : (
          <button>
            <IoMdEyeOff
              onClick={() => setIsTotalEarningsHidden(true)}
              className="fill-dark_text hover:fill-light_text cursor-pointer "
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default TodayEarningsComponent;
