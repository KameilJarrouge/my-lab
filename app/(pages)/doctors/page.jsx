"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import DoctorCard from "@/app/_components/Cards/DoctorCard";
import TextInput from "@/app/_components/Inputs/TextInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NoResultComponent from "@/app/_components/NoResultComponent";
import Pagination from "@/app/_components/Pagination";
import api from "@/app/_lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getDoctors = async () => {
    setIsLoading(true);
    const result = await api.get(`/doctors?name=${nameSearchKey}&page=${page}`);
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error("Something went wrong while fetching doctors");
      return;
    }
    setDoctors(result.data.result.doctors);
    setCount(result.data.result.count);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    getDoctors();
  }, [page]);

  return (
    <div className="w-full h-full flex flex-col gap-8 ">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* Subheader */}
      <div className="w-full h-[4rem] flex justify-between items-center bg-dark_primary p-2 shadow shadow-black">
        {/* Search Fields */}
        <div className=" flex items-center gap-4">
          <TextInput
            title={"اسم الطبيب"}
            state={nameSearchKey}
            setState={setNameSearchKey}
          />
          <button
            onClick={() => {
              getDoctors();
              setPage(1);
            }}
            className="text-dark_text hover:text-light_text"
          >
            <MdSearch className="w-[1.5rem] h-fit" />
          </button>
        </div>
        {/* New Patient */}
        <Link href={"/doctors/create"}>
          <AuthButton title="طبيب جديد" />
        </Link>
      </div>
      {doctors.length === 0 ? (
        <div className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
          <NoResultComponent message={"لا يوجد نتائج!"} />
        </div>
      ) : (
        <div className="w-full h-[calc(100%-4rem)] flex flex-col gap-4 items-center">
          <div className="h-[calc(100%-4rem)] w-full 2xl:w-[80%] flex flex-wrap justify-between gap-2 content-start overflow-y-auto overflow-x-hidden ">
            {doctors.map((doctor, index) => (
              <DoctorCard doctor={doctor} key={index} />
            ))}
          </div>
          <div className="h-[4rem] w-full flex justify-center items-center ">
            {/* Pagination */}
            <Pagination
              count={count}
              perPage={20}
              currentPage={page}
              setCurrentPage={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorsPage;
