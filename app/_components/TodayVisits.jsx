import React from "react";
import Title from "./Title";
import TodayVisitCard from "./Cards/TodayVisitCard";
import NoResultComponent from "./NoResultComponent";

function TodayVisits({ visits }) {
  return (
    <>
      <Title>زيارات اليوم</Title>
      <div className="w-full h-full px-4 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
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
