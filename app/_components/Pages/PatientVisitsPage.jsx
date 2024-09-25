"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../Buttons/AuthButton";
import Title from "../Title";
import Link from "next/link";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import DateTimePicker from "react-datetime-picker";
import {
  MdArrowUpward,
  MdChevronLeft,
  MdClear,
  MdSearch,
} from "react-icons/md";
import ToggleInput from "../Inputs/ToggleInput";
import AutoCompleteSelect from "../Inputs/AutoCompleteSelection";
import VisitCard from "../Cards/VisitCard";
import NoResultComponent from "../NoResultComponent";

function PatientVisitsPage({ patientId, isLoading, setIsLoading }) {
  const [visits, setVisits] = useState([]);
  const [orderByDateDirection, setOrderByDateDirection] = useState("desc");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isByTest, setIsByTest] = useState(true);
  const [byId, setById] = useState();
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const getTests = async () => {
    setIsLoading(true);
    const result = await api.get("/tests/list");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the console");
      console.error(
        "Something went wrong while fetching tests in PatientVisitsPage"
      );
      return;
    }

    setTests(result.data.result);
  };

  const getCategories = async () => {
    setIsLoading(true);
    const result = await api.get("/categories/list");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check the console");
      console.error(
        "Something went wrong while fetching categories in PatientVisitsPage"
      );
      return;
    }

    setCategories(result.data.result);
  };

  const getDoctors = async () => {
    setIsLoading(true);
    const result = await api.get("/doctors/list");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check the console");
      console.error(
        "Something went wrong while fetching categories in PatientVisitsPage"
      );
      return;
    }
    setDoctors(result.data.result);
  };

  const getVisits = async () => {
    setIsLoading(true);

    const result = await api.get(
      `/visits?patientId=${patientId}&startDate=${startDate || ""}&endDate=${
        endDate || ""
      }&isByTest=${isByTest}&byId=${byId?.id || "-1"}&page=${page}&doctorId=${
        doctor?.id || "-1"
      }&orderByDateDirection=${orderByDateDirection}`
    );
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check the console");
      console.error(
        "Something went wrong while fetching visits in PatientVisitsPage"
      );
      return;
    }
    setVisits(result.data.result.visits);
    setCount(result.data.result.count);
  };

  useEffect(() => {
    getDoctors();
    getCategories();
    getTests();
    getVisits();
  }, []);

  useEffect(() => {
    getVisits();
  }, [page]);
  useEffect(() => {
    setById(undefined);
  }, [isByTest]);

  return (
    <div className="w-4/5 h-full  flex flex-col gap-6 items-center px-2 2xl:px-4 ">
      {/* SubHeader */}
      <div className="w-full flex justify-between">
        <div className="invisible">
          <AuthButton />
        </div>
        <Title> الزيارات</Title>
        <Link href={`/patients/${patientId}/new-visit`}>
          <AuthButton title="زيارة جديدة" />
        </Link>
      </div>
      {/* Visits */}
      <div className="h-fit w-full bg-dark_primary px-2 py-3 flex items-center gap-4 shadow shadow-black">
        <div className="w-fit flex gap-2 items-center">
          <div dir="ltr" className="w-[13ch]">
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
          <div dir="ltr" className="w-[13ch]">
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
        </div>
        <span className="text-dark_text/60">•</span>
        <div className="max-w-[30ch]">
          <ToggleInput
            selectedValue={isByTest ? "تحليل" : "تصنيف"}
            setSelectedValue={(value) => setIsByTest(value === "تحليل")}
            value1="تحليل"
            value2="تصنيف"
          />
        </div>

        <AutoCompleteSelect
          options={isByTest ? tests : categories}
          optionsNameKey={"name"}
          title={isByTest ? "بحث بواسطة تحليل" : "بحث بواسطة تصنيف"}
          withHoveringTitle={false}
          withClear
          state={byId}
          setState={setById}
          id="tests-categories"
        />
        <span className="text-dark_text/60">•</span>
        <AutoCompleteSelect
          options={doctors}
          optionsNameKey={"name"}
          id="doctors"
          title={"بحث بواسطة الطبيب"}
          withClear
          withHoveringTitle={false}
          state={doctor}
          setState={setDoctor}
        />
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
            getVisits(true);
            setPage(1);
          }}
          className="text-dark_text hover:text-light_text"
        >
          <MdSearch className="w-[1.5rem] h-fit" />
        </button>
      </div>
      <div className="w-full h-[calc(100%-4rem)] px-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
        {visits.map((visit, index) => (
          <VisitCard visit={visit} key={index} />
        ))}
        {visits.length === 0 && (
          <div className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
            <NoResultComponent message={"لا يوجد نتائج!"} />
          </div>
        )}
      </div>
      <div className="h-[4rem] w-full flex justify-center items-center ">
        {/* Pagination */}
        <Pagination
          count={count}
          perPage={10}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
}

export default PatientVisitsPage;
