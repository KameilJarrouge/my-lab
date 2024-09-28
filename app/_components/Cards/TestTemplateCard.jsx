"use client";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdDelete } from "react-icons/md";
import LoadingComponent from "../LoadingComponent";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import numberWithCommas from "@/app/_lib/numberWithCommas";

function TestTemplateCard({
  test,
  removeTest,
  unitPrice,
  templateInput,
  patientId,
  dateInQuestion,
}) {
  const [areChildrenVisible, setAreChildrenVisible] = useState(true);
  const [lastTest, setLastTest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getLastTest = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/visit-tests/last-visit-test?testId=${test.test.id}&patientId=${patientId}&dateInQuestion=${dateInQuestion}`
    );
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(`something went wrong while fetching last visit-test`);
      return;
    }
    let parsedLastTest = result.data.result;
    if (parsedLastTest) {
      parsedLastTest.template = JSON.parse(parsedLastTest.template);
      setLastTest(parsedLastTest);
    }
  };

  const handleRemoveTest = () => {
    if (confirm(`هل تريد إزالة التحليل من الزيارة (${test.test.name})؟`)) {
      removeTest();
    }
  };

  useEffect(() => {
    getLastTest();
  }, []);

  return (
    <div
      className={`flex flex-col w-full  2xl:w-[80%] shadow shadow-black rounded relative`}
    >
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="w-full  bg-dark_primary rounded  flex justify-between items-center">
        {/* Information */}
        <div className="flex items-center  gap-4">
          <span
            className="max-w-[40ch] min-w-[20ch] w-fit truncate  pr-4 "
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"التصنيف : " + test.category.name}
          >
            {test.category.name}
          </span>
          <div className="w-[5px] h-[3rem] bg-light_primary -skew-x-12" />

          <span
            className="max-w-[40ch] w-fit truncate "
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"التحليل : " + test.test.name}
          >
            {test.test.name}
          </span>
          <div className="flex gap-1 items-center">
            <MdChevronRight />
            <span
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"عدد الوحدات"}
            >
              {test.test.units}
            </span>
            <MdChevronLeft />
          </div>
          <span
            className="text-text "
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"سعر الوحدة : " + unitPrice}
          >
            التكلفة: {numberWithCommas(unitPrice * test.test.units)} ل.س
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4  pl-4">
          <button className=" group" onClick={handleRemoveTest}>
            <MdDelete className="w-[1.1rem] h-fit text-text group-hover:text-red-400" />
          </button>
          <button
            className=" group"
            onClick={() =>
              setAreChildrenVisible((areChildrenVisible) => !areChildrenVisible)
            }
          >
            <MdChevronRight
              className={`text-text w-[1.1rem] h-fit ${
                !areChildrenVisible ? "rotate-90" : "-rotate-90 "
              } transition-transform group-hover:text-light_text`}
            />
          </button>
        </div>
      </div>
      {areChildrenVisible && (
        <div className={`rounded-b bg-dark_primary/60 p-4`}>
          {templateInput(lastTest)}
        </div>
      )}
    </div>
  );
}

export default TestTemplateCard;
