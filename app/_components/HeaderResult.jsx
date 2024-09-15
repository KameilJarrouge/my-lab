import React from "react";
import NoResultComponent from "./NoResultComponent";
import LoadingComponent from "./LoadingComponent";
import Link from "next/link";
import { MdChevronLeft, MdDoorFront } from "react-icons/md";
import { ImEnter } from "react-icons/im";

function HeaderResult({ patients, isLoading, close }) {
  return (
    <div
      id="result-menu"
      className="absolute top-[3.5rem] left-[30%]  w-[40%] min-h-[10rem] max-h-[30rem] overflow-x-hidden overflow-y-auto
          bg-dark_primary shadow shadow-black border-t-[1px] border-t-light_primary/80 z-50
          rounded flex items-start justify-center py-4 px-2"
    >
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}

      {patients.length === 0 ? (
        <div className="my-auto">
          <NoResultComponent message={"لا يوجد نتائج!"} />
        </div>
      ) : (
        <div className=" px-2 w-full h-full flex flex-col gap-3 ">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="w-full flex justify-between border-b pb-1 items-center border-b-text/50 hover:border-b-text/70 group"
            >
              <Link
                href={`/patients/${patient.id}`}
                onClick={close}
                className="text-text group-hover:text-light_text flex gap-2 items-center min-w-[70%]"
              >
                <MdChevronLeft className="w-[1rem] h-fit text-transparent group-hover:text-light_text" />
                {patient.name}
              </Link>
              <Link
                onClick={close}
                href={`/patients/${patient.id}/new-visit`}
                className="flex gap-2 items-center text-dark_text hover:text-light_text"
              >
                <span className="">زيارة جديدة</span>
                <ImEnter className="" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeaderResult;
