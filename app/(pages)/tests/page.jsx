"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import TestCard from "@/app/_components/Cards/TestCard";
import AutoCompleteSelect from "@/app/_components/Inputs/AutoCompleteSelection";
import TextInput from "@/app/_components/Inputs/TextInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import NoResultComponent from "@/app/_components/NoResultComponent";
import Pagination from "@/app/_components/Pagination";
import api from "@/app/_lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

function TestsPage() {
  const [tests, setTests] = useState([]);
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [categorySearchKey, setCategorySearchKey] = useState(undefined);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getTests = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/tests?name=${nameSearchKey}&categoryId=${
        !categorySearchKey ? "الجميع" : categorySearchKey.id
      }&page=${page}`
    );
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching patients");
      return;
    }
    setTests(result.data.result.tests);
    setCount(result.data.result.count);
  };

  const getCategories = async () => {
    const result = await api.get("/categories/list");
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching categories list");
      return;
    }
    setCategories(result.data.result);
  };

  useEffect(() => {
    getCategories();
    getTests();
  }, []);

  useEffect(() => {
    getTests();
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
        <div className=" flex items-center gap-4 w-fit">
          <TextInput
            title={"اسم التحليل"}
            state={nameSearchKey}
            setState={setNameSearchKey}
          />
          <div className="flex items-center w-full ">
            {/* <DropMenu
              uniqueName="category-name"
              title="التصنيف"
              state={categorySearchKey}
              setState={setCategorySearchKey}
              options={[
                "الجميع",
                ...categories.map((category) => category.name),
              ]}
            /> */}
            <AutoCompleteSelect
              options={categories}
              state={categorySearchKey}
              setState={setCategorySearchKey}
              optionsNameKey={"name"}
              // optionsValueKey={"name"}
              title={"التصنيف"}
              id="category-test-search"
              withClear
              onClear={() => setCategorySearchKey(undefined)}
            />
          </div>

          <button
            onClick={() => {
              getTests();
              setPage(1);
            }}
            className="text-dark_text hover:text-light_text"
          >
            <MdSearch className="w-[1.5rem] h-fit" />
          </button>
        </div>
        {/* New Patient */}
        <Link href={"/tests/create"}>
          <AuthButton title="تحليل جديد" />
        </Link>
      </div>
      {tests.length === 0 ? (
        <div className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
          <NoResultComponent message={"لا يوجد نتائج!"} />
        </div>
      ) : (
        <div className="w-full h-[calc(100%-4rem)] flex flex-col gap-4 items-center">
          <div className="h-[calc(100%-4rem)] w-full 2xl:w-[80%] flex flex-wrap justify-between gap-2 content-start overflow-y-auto overflow-x-hidden ">
            {tests.map((test, index) => (
              <TestCard test={test} key={index} />
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

export default TestsPage;
