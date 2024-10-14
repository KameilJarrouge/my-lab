"use client";

import { useEffect, useState } from "react";
import api from "./_lib/api";
import { toast } from "react-toastify";
import LoadingComponent from "./_components/LoadingComponent";
import TodayEarningsComponent from "./_components/TodayEarningsComponent";
import TodayVisits from "./_components/TodayVisits";
import AuthButton from "./_components/Buttons/AuthButton";

export default function Home() {
  const [totalEarnings, setTotalEarnings] = useState(-1);
  const [isTotalEarningsHidden, setIsTotalEarningsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [todayVisits, setTodayVisits] = useState([]);

  const getTotalEarnings = async () => {
    setIsLoading(true);
    const result = await api.get("/visit-tests/today-earnings");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while getting today's earnings");
      return;
    }
    setTotalEarnings(result.data.result);
  };

  const getTodayVisits = async () => {
    setIsLoading(true);
    const result = await api.get("/visits/today-visits");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching today's visits");
      return;
    }
    setTodayVisits(result.data.result);
  };

  const handleBackup = async () => {
    const response = await fetch("http://localhost:3000/api/backup");
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.headers
        .get("Content-Disposition")
        .split("filename=")[1];
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Failed to download backup");
    }
  };

  useEffect(() => {
    getTotalEarnings();
    getTodayVisits();
  }, []);

  return (
    <main className="flex gap-2 w-full h-full">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="w-1/4 h-full flex flex-col gap-4 px-2">
        {/* Today's Total Income */}
        <TodayEarningsComponent
          totalEarnings={totalEarnings}
          setIsTotalEarningsHidden={setIsTotalEarningsHidden}
          isTotalEarningsHidden={isTotalEarningsHidden}
        />
        <AuthButton
          title="نسخة احتياطية من قاعدة البيانات"
          onClick={handleBackup}
        />
      </div>
      <div className="w-3/4 h-full flex flex-col gap-8 items-center ">
        <TodayVisits visits={todayVisits} />
      </div>
    </main>
  );
}
