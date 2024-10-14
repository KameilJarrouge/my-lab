import React from "react";
import Title from "./Title";
import TodayVisitCard from "./Cards/TodayVisitCard";
import NoResultComponent from "./NoResultComponent";
import moment from "moment";

function TodayVisits({ visits }) {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <span className="invisible">{`( ${moment(new Date()).format(
          "yyyy-MM-DD"
        )} )`}</span>
        <Title>{"زيارات اليوم"}</Title>
        <span className="">{`( ${moment(new Date()).format(
          "yyyy-MM-DD"
        )} )`}</span>
      </div>
      <div className="w-full h-full px-4 overflow-y-auto overflow-x-hidden pb-1 flex flex-col gap-4">
        {visits.map((visit, index) => (
          <TodayVisitCard visit={visit} key={index} />
        ))}
        {visits.length === 0 && (
          <div className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
            <NoResultComponent message={"لا يوجد زيارات!"} />
          </div>
        )}
      </div>
    </>
  );
}

export default TodayVisits;
