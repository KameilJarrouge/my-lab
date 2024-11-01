"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import LoadingComponent from "@/app/_components/LoadingComponent";
import Page from "@/app/_components/Printing/Page";
import PrintHeader from "@/app/_components/Printing/PrintHeader";
import api from "@/app/_lib/api";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PrintInvoice({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const [visit, setVisit] = useState();

  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}/for-invoice`);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching visit for printing");
      return;
    }
    const totalPriceTemp = result.data.result.tests.reduce((total, test) => {
      return total + test.units * test.price;
    }, 0);
    setTotalPrice(totalPriceTemp);
    setVisit(result.data.result);
    setIsLoading(false);
  };

  const getSettings = async () => {
    setIsLoading(true);
    const result = await api.get("/settings");
    setIsLoading(false);

    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching settings in print page"
      );
      return;
    }

    setLocation(result.data.result.location);
  };

  useEffect(() => {
    getVisit();
    getSettings();
  }, []);

  return (
    <div className="text-black">
      {isLoading && (
        <div className="w-full h-[100vh] absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="fixed w-[40mm] top-[0rem] left-[calc((100%-220mm)/2-40mm)]   flex items-center justify-between bg-dark_primary p-2 rounded print:hidden">
        <AuthButton title="إغلاق" onClick={() => router.back()} />

        <AuthButton title="طباعة" onClick={() => window.print()} />
      </div>
      <Page pageNumber={1}>
        <PrintHeader
          date={visit?.date || new Date()}
          doctorsName={visit?.doctor.name || ""}
          patientName={visit?.Patient.name || ""}
          patientSex={visit?.Patient.sex || "ذكر"}
          location={location}
        />
        <p className="text-black mt-[60mm]">{`تم استلام مبلغ قدره ${numberWithCommas(
          totalPrice
        )} ل.س من  ${
          ((visit?.Patient.sex || "ذكر") !== "ذكر" ? "السيدة " : "السيد ") +
            visit?.Patient.name || ""
        } مقابل التحاليل التالية: `}</p>
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
          {visit &&
            visit.tests.map((visitTest, index) => {
              return (
                <div
                  className="flex justify-between items-center shadow-sm shadow-black px-2 rounded "
                  key={index}
                >
                  <div className="flex gap-2 ">
                    <span>{index + 1})</span>
                    <span className="w-fit">{visitTest.Test.name}</span>
                  </div>
                  <span className="text-end">
                    {`${numberWithCommas(
                      Number(visitTest.units) * Number(visitTest.price)
                    )} ل.س`}
                  </span>
                </div>
              );
            })}
        </div>
      </Page>
    </div>
  );
}

export default PrintInvoice;