"use client";
import VisitCard from "@/app/_components/Cards/VisitCard";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NoResultComponent from "@/app/_components/NoResultComponent";
import api from "@/app/_lib/api";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  MdArrowUpward,
  MdChevronLeft,
  MdChevronRight,
  MdClear,
  MdSearch,
} from "react-icons/md";
import { toast } from "react-toastify";

function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [orderByDateDirection, setOrderByDateDirection] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [totals, setTotals] = useState({ all: 0 });
  const getVisits = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/visits/search?startDate=${startDate || ""}&endDate=${
        endDate || ""
      }&orderByDateDirection=${orderByDateDirection}`
    );
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching visits");
      return;
    }

    let totals = { all: 0 };

    const visitsTemp = result.data.result.reduce((prev, current) => {
      const dateInQuestion = moment(current.date).format("yyyy-MM-DD");

      const currentTotalPrice = current.tests.reduce((total, test) => {
        return total + Number(test.units) * Number(test.price);
      }, 0);

      totals.all += currentTotalPrice;

      if (totals.hasOwnProperty(dateInQuestion)) {
        totals[dateInQuestion] += currentTotalPrice;
      } else {
        totals[dateInQuestion] = currentTotalPrice;
      }

      if (prev.hasOwnProperty(dateInQuestion)) {
        prev[dateInQuestion].push(current);
      } else {
        prev[dateInQuestion] = [current];
      }
      return prev;
    }, {});

    setTotals(totals);
    setVisits(visitsTemp);
    setSelectedDate("");
  };

  useEffect(() => {
    getVisits();
  }, []);

  return (
    <div className="w-full h-full flex flex-col  gap-4 ">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* Subheader */}
      <div className="w-full h-[3rem] flex justify-between items-center bg-dark_primary p-2 shadow shadow-black">
        {/* Search Fields */}
        <div className=" flex items-center gap-4">
          <div dir="ltr" className="w-[20ch]">
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              disableClock
              className={
                "text-dark_text p-0 focus-within:text-light_text border-b-[1px] h-[1.5rem] w-full border-b-light_primary focus-within:border-b-light_text"
              }
              calendarIcon={null}
              clearIcon={() => (
                <MdClear className="translate-x-1 text-dark_text hover:text-light_text" />
              )}
              format="yyyy-MM-dd"
            />
          </div>
          <MdChevronLeft className="w-[1rem] h-fit" />
          <div dir="ltr" className="w-[20ch]">
            <DateTimePicker
              value={endDate}
              onChange={setEndDate}
              disableClock
              className={
                "text-dark_text p-0 focus-within:text-light_text border-b-[1px] h-[1.5rem] w-full border-b-light_primary focus-within:border-b-light_text"
              }
              calendarIcon={null}
              clearIcon={() => (
                <MdClear className="translate-x-1 text-dark_text hover:text-light_text" />
              )}
              format="yyyy-MM-dd"
            />
          </div>
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content={
              orderByDateDirection === "desc" ? "الأحدث أولاً" : "الأقدم أولاً"
            }
            onClick={() =>
              setOrderByDateDirection((isLatestFirst) =>
                isLatestFirst === "desc" ? "asc" : "desc"
              )
            }
            className="text-dark_text hover:text-light_text"
          >
            <MdArrowUpward
              className={`w-[1.5rem] h-fit ${
                orderByDateDirection === "desc" && "rotate-180"
              } transition-transform`}
            />
          </button>
          <button
            onClick={() => {
              getVisits();
            }}
            className="text-dark_text hover:text-light_text"
          >
            <MdSearch className="w-[1.5rem] h-fit" />
          </button>
        </div>
        <div className="flex gap-2 items-center ">
          <span>تكلفة جميع نتائج البحث: </span>
          <span>{numberWithCommas(totals.all) + " ل.س"}</span>
        </div>
      </div>
      {visits.length === 0 ? (
        <div className="w-full h-[calc(100%-5rem)] flex justify-center items-center">
          <NoResultComponent message={"لا يوجد نتائج!"} />
        </div>
      ) : (
        <div className="w-full h-[calc(100%-4rem)]  flex  gap-4 ">
          <div
            className="w-[11rem] px-2 h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden "
            dir="ltr"
          >
            {Object.keys(visits).map((date, index) => (
              <button
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  "التكلفة الإجمالية لهذا اليوم: " +
                  numberWithCommas(totals[date]) +
                  " ل.س"
                }
                key={index}
                onClick={() => {
                  setSelectedDate(date);
                }}
                className={`w-full flex items-center justify-end gap-2 px-2 py-1 rounded  ${
                  selectedDate === date
                    ? "bg-dark_text/40 text-white"
                    : "bg-light_primary/30 text-text"
                }`}
              >
                <span className="w-[5ch] truncate text-end">
                  ({visits[date].length})
                </span>
                <span className={``}>{date}</span>
              </button>
            ))}
          </div>
          <div className="w-[calc(100%-12rem)] h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden ">
            {selectedDate !== "" ? (
              visits[selectedDate].map((visit, index) => (
                <VisitCard
                  visit={visit}
                  key={index}
                  alterBg={index % 2 !== 0}
                />
              ))
            ) : (
              <div className="w-[calc(100%-12rem)] h-[calc(100%-5rem)] flex justify-center items-center">
                <MdChevronRight className="w-[1.5rem] h-fit" />
                {"يرجى اختيار تاريخ لعرض الزيارات"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitsPage;
