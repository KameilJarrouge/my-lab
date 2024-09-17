"use client";
import ManualTemplatePrint from "@/app/_components/Printing/ManualTemplatePrint";
import Page from "@/app/_components/Printing/Page";
import PrintHeader from "@/app/_components/Printing/PrintHeader";
import TestsHeader from "@/app/_components/Printing/TestsHeader";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function PrintPage() {
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get("visitId"));
  }, []);
  return (
    <div className=" w-[210mm] bg-white text-black ">
      <Page>
        <PrintHeader />
        <TestsHeader categoryName="Test">
          <ManualTemplatePrint
            testName={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            }
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={"Test"}
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            }
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={"Test"}
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            }
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={"Test"}
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            }
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
          <ManualTemplatePrint
            testName={"Test"}
            result={13.4}
            min={12}
            max={15}
            referenceRange={"test"}
            units={"ml/l"}
            lastTestDate={new Date()}
            lastTestResult={12}
          />
        </TestsHeader>
      </Page>
    </div>
  );
}

export default PrintPage;
