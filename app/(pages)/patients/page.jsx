"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import PatientCard from "@/app/_components/Cards/PatientCard";
import DropMenu from "@/app/_components/Inputs/DropMenu";
import NumberInput from "@/app/_components/Inputs/NumberInput";
import TextInput from "@/app/_components/Inputs/TextInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NoResultComponent from "@/app/_components/NoResultComponent";
import Pagination from "@/app/_components/Pagination";
import api from "@/app/_lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [sexSearchKey, setSexSearchKey] = useState("الجميع");
  const [ageOperand, setAgeOperand] = useState("الجميع");
  const [ageSearchKey, setAgeSearchKey] = useState(1);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const getPatients = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/patients?name=${nameSearchKey}&sex=${sexSearchKey}&ageOperand=${ageOperand}&age=${ageSearchKey}&page=${page}`
    );
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error("Something went wrong while fetching patients");
      return;
    }
    setPatients(result.data.result.patients);
    setCount(result.data.result.count);
  };

  useEffect(() => {
    getPatients();
  }, []);

  useEffect(() => {
    getPatients();
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
            title={"اسم المريض"}
            state={nameSearchKey}
            setState={setNameSearchKey}
          />
          <div className="flex items-center border border-light_primary rounded">
            <DropMenu
              uniqueName="sex"
              title="الجنس"
              state={sexSearchKey}
              setState={setSexSearchKey}
              options={["ذكر", "أنثى", "الجميع"]}
            />
          </div>
          <div className="flex items-center gap-4 border border-light_primary rounded">
            <DropMenu
              uniqueName="age"
              title="العمر"
              state={ageOperand}
              setState={setAgeOperand}
              options={["أكبر من", "يساوي", "أصغر من", "الجميع"]}
            />
            <NumberInput value={ageSearchKey} setValue={setAgeSearchKey} />
          </div>
          <button
            onClick={() => {
              getPatients();
              setPage(1);
            }}
            className="text-dark_text hover:text-light_text"
          >
            <MdSearch className="w-[1.5rem] h-fit" />
          </button>
        </div>
        {/* New Patient */}
        <Link href={"/patients/create"}>
          <AuthButton title="مريض جديد" />
        </Link>
      </div>
      {patients.length === 0 ? (
        <div className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
          <NoResultComponent message={"لا يوجد نتائج!"} />
        </div>
      ) : (
        <div className="w-full h-[calc(100%-4rem)] flex flex-col gap-4 items-center">
          <div className="h-[calc(100%-4rem)] w-full 2xl:w-[80%] flex flex-wrap justify-between gap-2 content-start overflow-y-auto overflow-x-hidden ">
            {patients.map((patient, index) => (
              <PatientCard patient={patient} key={index} />
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

export default PatientsPage;
