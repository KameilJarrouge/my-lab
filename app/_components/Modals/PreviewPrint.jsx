"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import Modal from "./Modal";
import Title from "../Title";
import Page from "../Printing/Page";
import PrintHeader from "../Printing/PrintHeader";
import ManualTestsHeader from "../Printing/ManualTestsHeader";
import ManualTemplatePrint from "../Printing/ManualTemplatePrint";
import StaticTestHeader from "../Printing/StaticTestHeader";
import StaticTemplatePrint from "../Printing/StaticTemplatePrint";

function PreviewPrint({
  tests,
  patient,
  date,
  location,
  doctor,
  isOpen,
  setIsOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [testsGroupedByCategory, setTestsGroupedByCategory] = useState([]);
  const [pagesState, setPagesState] = useState([]);

  const [isCalculating, setIsCalculating] = useState(true);
  const preProcessTests = () => {
    // will hold the final categorized visit-tests
    let categorizedTestsArray = [];

    // temporary hold for the visit-tests that share a category, will be appended to the previous array after categorizing
    let needToBeGrouped = {};

    for (let i = 0; i < tests.length; i++) {
      let element = tests[i];
      if (element.test.template.type === "static") {
        // static templates doesn't share category.
        categorizedTestsArray.push({ type: "static", visitTest: element });
      } else {
        // grouping visit-tests by category

        // the category already has visit-tests inside it
        if (Array.isArray(needToBeGrouped[element.category.name])) {
          needToBeGrouped[element.category.name] = [
            ...needToBeGrouped[element.category.name],
            element,
          ];
        } else {
          // the first visit-tests in this category
          needToBeGrouped[element.category.name] = [element];
        }
      }
    }
    // appending the categorized visit-tests to the main array
    categorizedTestsArray = [
      ...categorizedTestsArray,
      ...Object.keys(needToBeGrouped).map((key) => {
        return { type: "manual", visitTest: needToBeGrouped[key] };
      }),
    ];
    console.log("categorizedTestsArray", categorizedTestsArray);

    // TODO: sort the categorizedTestsArray by the position value in the visit-test template

    categorizedTestsArray.sort((a, b) => {
      let aValue = Array.isArray(a.visitTest)
        ? a.visitTest[0].test.template.position
        : a.visitTest.test.template.position;
      let bValue = Array.isArray(b.visitTest)
        ? b.visitTest[0].test.template.position
        : b.visitTest.test.template.position;
      return aValue - bValue;
    });
    setTestsGroupedByCategory(categorizedTestsArray);
  };

  const sectioning = () => {
    let pages = [{ height: 227, content: [] }];
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
          pages.push({ height: 227, content: [] });
        }

        while (true) {
          // finished this grouped test
          if (indexCount > firstGroupedTest.visitTest.length - 1) {
            if (safeTests.length !== 0) {
              pages[pages.length - 1].height -= manualTestHeight;
              pages[pages.length - 1].content.push({
                type: firstGroupedTest.type,
                visitTest: safeTests,
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
              pages.push({ height: 227, content: [] });
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
              manualTestHeight -= currentHeight;
              pages[pages.length - 1].height -= manualTestHeight;
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
        if (staticTestHeight > 227) {
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
            height: 227 - staticTestHeight,
            content: [firstGroupedTest],
          });
        }
      }
      if (!firstGroupedTest.hasOwnProperty("readingIndex")) {
        readingIndex++;
      }
    }
    setIsCalculating(false);
    setIsLoading(false);
    return pages;
  };

  useEffect(() => {
    setPagesState([]);
    preProcessTests();
  }, [tests, isOpen]);

  useEffect(() => {
    if (testsGroupedByCategory.length !== 0) {
      const pages = sectioning();
      setPagesState(pages);
    }
  }, [testsGroupedByCategory]);

  // useEffect(() => {
  //   console.log("pages updated", pagesState);
  // }, [pagesState]);

  const pxTomm = function (elementId) {
    return (
      document.getElementById(elementId).getBoundingClientRect().height /
      (document.getElementById("my_mm").getBoundingClientRect().height / 100)
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      uniqueName="print-preview"
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-50">
          <LoadingComponent loading={true} />
        </div>
      )}
      <div className="w-full h-full flex gap-4 justify-center bg-primary">
        <div className="w-fit min-w-[40ch] flex flex-col py-[10%]  items-center">
          <Title>ترتيب التحاليل</Title>
        </div>
        <div
          id="main-print-div"
          className=" w-[210mm] h-[100vh] overflow-y-auto overflow-x-hidden text-black flex flex-col items-center relative"
        >
          <div
            id="my_mm"
            className="h-[100mm] w-[1px] invisible absolute top-0 left-0"
          />
          <div className="w-full h-fit flex flex-col gap-4 print:gap-0 ">
            {isCalculating && (
              <Page invisible>
                <PrintHeader
                  date={date}
                  doctorsName={doctor}
                  patientName={patient.name}
                  patientSex={patient.sex}
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
                                groupedVisitTest.visitTest[0].category.name
                              }
                            />
                            {groupedVisitTest.visitTest.map(
                              (visitTest, index) => {
                                return (
                                  <ManualTemplatePrint
                                    id={visitTest.id}
                                    catId={catIndex}
                                    key={index}
                                    testName={visitTest.test.name}
                                    resultValue={
                                      visitTest.test.template.result.value
                                    }
                                    min={visitTest.test.template.data.min}
                                    max={visitTest.test.template.data.max}
                                    referenceRange={
                                      visitTest.test.template.data
                                        .referenceRange
                                    }
                                    unit={visitTest.test.template.data.unit}
                                    lastTestDate={undefined}
                                    lastTestResult={undefined}
                                  />
                                );
                              }
                            )}
                          </>
                        );
                      } else {
                        return (
                          <>
                            <StaticTestHeader
                              key={catIndex}
                              id={catIndex}
                              categoryName={
                                groupedVisitTest.visitTest.category.name
                              }
                            />
                            <StaticTemplatePrint
                              key={catIndex}
                              id={catIndex}
                              template={
                                groupedVisitTest.visitTest.test.template
                              }
                            />
                          </>
                        );
                      }
                    })}
                </div>
              </Page>
            )}
            {pagesState.length !== 0 &&
              pagesState.map((page) => (
                <Page>
                  <PrintHeader
                    date={date}
                    doctorsName={doctor}
                    patientName={patient.name}
                    patientSex={patient.sex}
                    location={location}
                  />
                  <div className="mt-[60mm]">
                    {page.content.length !== 0 &&
                      page.content.map((groupedVisitTest, catIndex) => {
                        if (Array.isArray(groupedVisitTest.visitTest)) {
                          return (
                            <>
                              <ManualTestsHeader
                                id={catIndex}
                                key={catIndex}
                                categoryName={
                                  groupedVisitTest.visitTest[0].category.name
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
                                      testName={visitTest.test.name}
                                      resultValue={
                                        visitTest.test.template.result.value
                                      }
                                      min={visitTest.test.template.data.min}
                                      max={visitTest.test.template.data.max}
                                      referenceRange={
                                        visitTest.test.template.data
                                          .referenceRange
                                      }
                                      unit={visitTest.test.template.data.unit}
                                      lastTestDate={undefined}
                                      lastTestResult={undefined}
                                    />
                                  );
                                  // }
                                }
                              )}
                            </>
                          );
                        } else {
                          return (
                            <>
                              <StaticTestHeader
                                key={catIndex}
                                id={catIndex}
                                categoryName={
                                  groupedVisitTest.visitTest.category.name
                                }
                              />
                              <StaticTemplatePrint
                                key={catIndex}
                                id={catIndex}
                                template={
                                  groupedVisitTest.visitTest.test.template
                                }
                              />
                            </>
                          );
                        }
                      })}
                  </div>
                </Page>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PreviewPrint;
