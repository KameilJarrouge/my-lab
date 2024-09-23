"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import ToggleInput from "@/app/_components/Inputs/ToggleInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ManualTemplatePrint from "@/app/_components/Printing/ManualTemplatePrint";
import ManualTestsHeader from "@/app/_components/Printing/ManualTestsHeader";
import Page from "@/app/_components/Printing/Page";
import PrintHeader from "@/app/_components/Printing/PrintHeader";
import StaticTemplatePrint from "@/app/_components/Printing/StaticTemplatePrint";
import StaticTestHeader from "@/app/_components/Printing/StaticTestHeader";
import Title from "@/app/_components/Title";
import api from "@/app/_lib/api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { toast } from "react-toastify";

function PrintPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [visit, setVisit] = useState();
  const [testsGroupedByCategory, setTestsGroupedByCategory] = useState([]);
  const [pages, setPages] = useState([]);
  const [isDoctorShown, setIsDoctorShown] = useState("إظهار الدكتور");
  const [location, setLocation] = useState("");
  const [categoryIndicator, setCategoryIndicator] = useState(undefined);
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

  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}/for-printing`);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching visit for printing");
      return;
    }

    // will hold the final categorized visit-tests
    let categorizedTestsArray = [];

    // temporary hold for the visit-tests that share a category, will be appended to the previous array after categorizing
    let needToBeGrouped = {};
    let categoryIndex = -1;
    for (let i = 0; i < result.data.result.tests.length; i++) {
      let element = result.data.result.tests[i];
      // parse the JSON template in the visit-test
      element.template = JSON.parse(element.template);

      if (element.template.type === "static") {
        // static templates doesn't share category.
        categoryIndex++;
        categorizedTestsArray.push({
          type: "static",
          visitTest: element,
          indicatorIndex: categoryIndex,
        });
      } else {
        // grouping visit-tests by category

        // the category already has visit-tests inside it
        if (Array.isArray(needToBeGrouped[element.Test.category.name])) {
          needToBeGrouped[element.Test.category.name] = [
            ...needToBeGrouped[element.Test.category.name],
            element,
          ];
        } else {
          // the first visit-tests in this category
          needToBeGrouped[element.Test.category.name] = [element];
        }
      }
    }

    // appending the categorized visit-tests to the main array
    categorizedTestsArray = [
      ...categorizedTestsArray,
      ...Object.keys(needToBeGrouped).map((key) => {
        categoryIndex++;
        return {
          type: "manual",
          visitTest: needToBeGrouped[key],
          indicatorIndex: categoryIndex,
        };
      }),
    ];

    // TODO: sort the categorizedTestsArray by the position value in the visit-test template

    categorizedTestsArray.sort((a, b) => {
      let aValue = Array.isArray(a.visitTest)
        ? a.visitTest[0].template.position
        : a.visitTest.template.position;
      let bValue = Array.isArray(b.visitTest)
        ? b.visitTest[0].template.position
        : b.visitTest.template.position;
      return aValue - bValue;
    });

    setTestsGroupedByCategory(categorizedTestsArray);
    setVisit(result.data.result);
    setIsLoading(false);
  };

  const sectioning = () => {
    let pages = [{ height: 217, content: [] }];
    let visitTestsLeft = [...testsGroupedByCategory];
    let indexCount = 0;
    let readingIndex = 0;
    setIsLoading(true);

    while (visitTestsLeft.length !== 0) {
      const firstGroupedTest = visitTestsLeft.shift();

      if (Array.isArray(firstGroupedTest.visitTest)) {
        // This means that the tests are manual
        indexCount = 0;
        let manualTestHeight = 0;
        let safeTests = [];

        manualTestHeight += pxTomm(
          "manual-test-header-" +
            (firstGroupedTest.hasOwnProperty("readingIndex")
              ? firstGroupedTest.readingIndex
              : readingIndex)
        );

        // the header doesn't fit
        if (manualTestHeight > pages[pages.length - 1].height) {
          pages.push({ height: 217, content: [] });
        }

        while (true) {
          // finished this grouped test
          if (indexCount > firstGroupedTest.visitTest.length - 1) {
            if (safeTests.length !== 0) {
              pages[pages.length - 1].height -= manualTestHeight;
              pages[pages.length - 1].content.push({
                type: firstGroupedTest.type,
                visitTest: safeTests,
                indicatorIndex: firstGroupedTest.indicatorIndex,
              });
            }
            break;
          }

          let currentHeight = pxTomm(
            "manual-template-print-cat-" +
              String(
                (firstGroupedTest.hasOwnProperty("readingIndex")
                  ? firstGroupedTest.readingIndex
                  : readingIndex) +
                  "-test-" +
                  firstGroupedTest.visitTest[indexCount].id
              )
          );
          manualTestHeight += currentHeight;

          if (manualTestHeight > pages[pages.length - 1].height) {
            // the current test can't be added to this page

            if (safeTests.length === 0) {
              // Only the header can be put
              // create a new page
              pages.push({ height: 217, content: [] });
              // unshift the first grouped test (redo this in a new page)
              visitTestsLeft.unshift(firstGroupedTest);
            } else {
              // add the remaining test in their own groupedTest
              visitTestsLeft.unshift({
                type: firstGroupedTest.type,
                visitTest: firstGroupedTest.visitTest.slice(indexCount),
                readingIndex: firstGroupedTest.hasOwnProperty("readingIndex")
                  ? firstGroupedTest.readingIndex
                  : readingIndex,
                spliced: true,
              });
              pages[pages.length - 1].height -=
                manualTestHeight - currentHeight;
              pages[pages.length - 1].content.push({
                type: firstGroupedTest.type,
                visitTest: safeTests,
              });
            }
            break;
          } else {
            safeTests.push(firstGroupedTest.visitTest[indexCount]);
            indexCount++;
          }
        }
      } else {
        let staticTestHeight = 0;
        staticTestHeight += pxTomm("static-test-header-" + readingIndex);
        staticTestHeight += pxTomm("static-template-print-" + readingIndex);
        // handle test has a larger height than A4
        if (staticTestHeight > 217) {
          toast.error("Check the console");
          console.error(
            "Error in sectioning function: static test doesn't fit in an A4 page",
            firstGroupedTest
          );
          return;
        }

        if (staticTestHeight < pages[pages.length - 1].height) {
          // append content (safe to add to this page)
          pages[pages.length - 1].height -= staticTestHeight;
          pages[pages.length - 1].content.push(firstGroupedTest);
        } else {
          // add to new page
          pages.push({
            height: 217 - staticTestHeight,
            content: [firstGroupedTest],
          });
        }
      }
      if (!firstGroupedTest.hasOwnProperty("readingIndex")) {
        readingIndex++;
      }
    }

    setIsLoading(false);

    return pages;
  };

  useEffect(() => {
    getVisit();
    getSettings();
  }, []);

  useEffect(() => {
    if (visit)
      document.title = `${moment(visit.date).format("yyyy-MM-DD")} _ ${
        visit.Patient.name
      }`;
  }, [visit]);

  useEffect(() => {
    if (testsGroupedByCategory.length !== 0) {
      const pages = sectioning();
      setPages(pages);
    }
  }, [testsGroupedByCategory]);

  const pxTomm = function (elementId) {
    return (
      document.getElementById(elementId).getBoundingClientRect().height /
      (document.getElementById("my_mm").getBoundingClientRect().height / 100)
    );
  };

  const reorderGroups = (indexToMove, value) => {
    if (
      indexToMove + value < 0 ||
      indexToMove + value > testsGroupedByCategory.length - 1
    )
      return;
    let originalArray = testsGroupedByCategory;
    let groupToMove = originalArray[indexToMove];
    let indexToReplace = indexToMove + value;

    originalArray[indexToMove] = originalArray[indexToReplace];
    originalArray[indexToReplace] = groupToMove;
    setTestsGroupedByCategory([...originalArray]);
  };

  return (
    <div
      id="main-print-div"
      className=" w-full h-fit text-black flex  items-center 2xl:justify-center px-2 justify-between relative"
    >
      <div
        className="w-[calc(60%-110mm)] 2xl:w-[calc(50%-110mm)] h-[100vh] fixed top-0 left-0 print:hidden flex justify-center items-center"
        dir="ltr"
      >
        <div className="w-full h-full overflow-y-auto overflow-x-hidden  p-2 ">
          <div className="w-full h-full bg-dark_primary flex flex-col gap-8 items-center shadow shadow-black border border-light_primary rounded p-4">
            <Title>إعدادات الطباعة</Title>
            {/* All of the categorized visitTest will be here */}

            <div className="flex flex-col w-full h-full items-center overflow-y-auto overflow-x-hidden gap-6 text-white px-4">
              <div className="flex gap-4 w-[40ch]  " dir="rtl">
                <ToggleInput
                  selectedValue={isDoctorShown}
                  setSelectedValue={setIsDoctorShown}
                  value1="إظهار الدكتور"
                  value2="إخفاء الدكتور"
                />
              </div>
              {testsGroupedByCategory.length !== 0 &&
                testsGroupedByCategory.map((testGroupedByCategory, index) => {
                  if (!testGroupedByCategory) return;
                  let groupName = Array.isArray(testGroupedByCategory.visitTest)
                    ? testGroupedByCategory.visitTest[0].Test.category.name
                    : testGroupedByCategory.visitTest.Test.category.name;
                  return (
                    <div className="flex w-full justify-between items-center">
                      <button
                        className={`w-[50%] flex items-center gap-2 border-b  ${
                          testGroupedByCategory.indicatorIndex ===
                          categoryIndicator
                            ? "border-b-light_text/70"
                            : "border-b-transparent"
                        }`}
                        onClick={() =>
                          setCategoryIndicator(
                            testGroupedByCategory.indicatorIndex
                          )
                        }
                      >
                        <span className="">{"(" + (index + 1) + ")"}</span>
                        <span
                          className="truncate font-semibold"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={groupName}
                        >
                          {groupName}
                        </span>
                      </button>
                      <div className="flex items-center gap-4 w-fit">
                        {/* <span>
                          عدد التحاليل :
                          {Array.isArray(testGroupedByCategory.visitTest)
                            ? testGroupedByCategory.visitTest.length
                            : 1}
                        </span> */}
                        <button onClick={() => reorderGroups(index, -1)}>
                          <MdChevronLeft
                            className={`rotate-90 w-[1.5rem] h-fit bg-light_primary ${
                              index === 0
                                ? "text-dark_text cursor-not-allowed"
                                : "text-text hover:text-light_text"
                            }`}
                          />
                        </button>
                        <button onClick={() => reorderGroups(index, 1)}>
                          <MdChevronLeft
                            className={`-rotate-90 w-[1.5rem] h-fit bg-light_primary ${
                              index === testsGroupedByCategory.length - 1
                                ? "text-dark_text cursor-not-allowed"
                                : "text-text hover:text-light_text"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <AuthButton onClick={() => window.print()} title="طباعة" />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="w-full h-[100vh] absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div
        id="my_mm"
        className="h-[100mm] w-[1px] invisible absolute top-0 left-0"
      />

      <div className="w-[210mm] h-fit flex flex-col items-center self-center gap-4 print:gap-0 ">
        {pages.length !== 0 &&
          pages.map((page, index) => (
            <Page pageNumber={index + 1}>
              <PrintHeader
                isDoctorShown={isDoctorShown === "إظهار الدكتور"}
                date={visit?.date}
                doctorsName={visit?.doctor.name}
                patientName={visit?.Patient.name}
                patientSex={visit?.Patient.sex}
                location={location}
              />
              <div className="mt-[60mm]">
                {page.content.length !== 0 &&
                  page.content.map((groupedVisitTest, catIndex) => {
                    if (Array.isArray(groupedVisitTest.visitTest)) {
                      return (
                        <div
                          className={` ${
                            groupedVisitTest.indicatorIndex ===
                              categoryIndicator && " bg-gray-200"
                          }  print:bg-transparent`}
                        >
                          <ManualTestsHeader
                            id={catIndex}
                            key={catIndex}
                            categoryName={
                              groupedVisitTest.visitTest[0].Test.category.name
                            }
                          />
                          {groupedVisitTest.visitTest.map(
                            (visitTest, index) => {
                              // if (visitTest.template.type === "manual") {
                              return (
                                <ManualTemplatePrint
                                  id={index}
                                  catId={catIndex}
                                  key={index}
                                  testName={visitTest.Test.name}
                                  resultValue={visitTest.template.result.value}
                                  min={visitTest.template.data.min}
                                  max={visitTest.template.data.max}
                                  referenceRange={
                                    visitTest.template.data.referenceRange
                                  }
                                  unit={visitTest.template.data.unit}
                                  lastTestDate={undefined}
                                  lastTestResult={undefined}
                                />
                              );
                              // }
                            }
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={` ${
                            groupedVisitTest.indicatorIndex ===
                              categoryIndicator && " bg-gray-200"
                          }   print:bg-transparent`}
                        >
                          <StaticTestHeader
                            key={catIndex}
                            id={catIndex}
                            categoryName={
                              groupedVisitTest.visitTest.Test.category.name
                            }
                          />
                          <StaticTemplatePrint
                            key={catIndex}
                            id={catIndex}
                            template={groupedVisitTest.visitTest.template}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </Page>
          ))}
        {/* {true && ( */}
        <Page hideOnPrint invisible>
          <PrintHeader
            date={visit?.date}
            doctorsName={visit?.doctor.name}
            patientName={visit?.Patient.name}
            sex={visit?.Patient.sex}
            location={location}
          />
          <div className="mt-[60mm]">
            {testsGroupedByCategory.length !== 0 &&
              testsGroupedByCategory.map((groupedVisitTest, catIndex) => {
                if (Array.isArray(groupedVisitTest.visitTest)) {
                  return (
                    <>
                      <ManualTestsHeader
                        id={catIndex}
                        key={catIndex}
                        categoryName={
                          groupedVisitTest.visitTest[0].Test.category.name
                        }
                      />
                      {groupedVisitTest.visitTest.map((visitTest, index) => {
                        // if (visitTest.template.type === "manual") {
                        return (
                          <ManualTemplatePrint
                            id={visitTest.id}
                            catId={catIndex}
                            key={index}
                            testName={visitTest.Test.name}
                            resultValue={visitTest.template.result.value}
                            min={visitTest.template.data.min}
                            max={visitTest.template.data.max}
                            referenceRange={
                              visitTest.template.data.referenceRange
                            }
                            unit={visitTest.template.data.unit}
                            lastTestDate={undefined}
                            lastTestResult={undefined}
                          />
                        );
                        // }
                      })}
                    </>
                  );
                } else {
                  return (
                    <>
                      <StaticTestHeader
                        key={catIndex}
                        id={catIndex}
                        categoryName={
                          groupedVisitTest.visitTest.Test.category.name
                        }
                      />
                      <StaticTemplatePrint
                        key={catIndex}
                        id={catIndex}
                        template={groupedVisitTest.visitTest.template}
                      />
                    </>
                  );
                }
              })}
          </div>
        </Page>
        {/* )} */}
      </div>
    </div>
  );
}

export default PrintPage;
