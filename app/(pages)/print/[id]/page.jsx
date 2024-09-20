"use client";
import ManualTemplatePrint from "@/app/_components/Printing/ManualTemplatePrint";
import ManualTestsHeader from "@/app/_components/Printing/ManualTestsHeader";
import Page from "@/app/_components/Printing/Page";
import PrintHeader from "@/app/_components/Printing/PrintHeader";
import StaticTemplatePrint from "@/app/_components/Printing/StaticTemplatePrint";
import StaticTestHeader from "@/app/_components/Printing/StaticTestHeader";
import { categoriesWithTests } from "@/app/_controllers/testCategoryController";
import api from "@/app/_lib/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PrintPage({ params }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [visit, setVisit] = useState({});
  const [testsGroupedByCategory, setTestsGroupedByCategory] = useState([]);
  const [pages, setPages] = useState([]);
  const [isCalculating, setIsCalculating] = useState(true);
  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}/for-printing`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching visit for printing");
      return;
    }

    // will hold the final categorized visit-tests
    let categorizedTestsArray = [];

    // temporary hold for the visit-tests that share a category, will be appended to the previous array after categorizing
    let needToBeGrouped = {};

    for (let i = 0; i < result.data.result.tests.length; i++) {
      let element = result.data.result.tests[i];
      // parse the JSON template in the visit-test
      element.template = JSON.parse(element.template);

      if (element.template.type === "static") {
        // static templates doesn't share category.
        categorizedTestsArray.push({ type: "static", visitTest: element });
      } else {
        // grouping visit-tests by category

        // the category already has visit-tests inside it
        if (Array.isArray(needToBeGrouped[element.Test.category.name])) {
          needToBeGrouped[element.Test.category.name] = [
            ...needToBeGrouped[element.Test.category.name],
            element,
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
        return { type: "manual", visitTest: needToBeGrouped[key] };
      }),
    ];

    // TODO: sort the categorizedTestsArray by the position value in the visit-test template
    // categorizedTestsArray = [
    //   categorizedTestsArray[0],
    //   categorizedTestsArray[2],
    //   categorizedTestsArray[3],
    //   categorizedTestsArray[1],
    // ];
    console.log(categorizedTestsArray);
    setTestsGroupedByCategory(categorizedTestsArray);
    setVisit(result.data.result);
  };

  const sectioning = () => {
    let pages = [{ height: 227, content: [] }];
    let visitTestsLeft = [...testsGroupedByCategory];
    let indexCount = 0;
    let readingIndex = 0;

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
        console.log("incrementing reading index");
        readingIndex++;
      }
    }
    setIsCalculating(false);
    return pages;
  };

  useEffect(() => {
    getVisit();
  }, []);

  useEffect(() => {
    if (testsGroupedByCategory.length !== 0) {
      const pages = sectioning();
      console.log(pages);
      setPages(pages);
    }
  }, testsGroupedByCategory);

  const pxTomm = function (elementId) {
    console.log(elementId);
    return (
      document.getElementById(elementId).getBoundingClientRect().height /
      (document.getElementById("my_mm").getBoundingClientRect().height / 100)
    );
  };

  return (
    <div
      id="main-print-div"
      className=" w-[210mm] h-fit text-black flex flex-col items-center relative"
    >
      <div
        id="my_mm"
        className="h-[100mm] w-[1px] invisible absolute top-0 left-0"
      />
      {/* <div className="w-full h-[1mm] absolute top-[148mm] z-50  bg-blue-500"></div> */}
      <div className="w-full h-fit flex flex-col gap-4 print:gap-0 ">
        {isCalculating && (
          <Page invisible>
            <PrintHeader />
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
                              visitTest={visitTest}
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
                          visitTest={groupedVisitTest.visitTest}
                        />
                      </>
                    );
                  }
                })}
            </div>
          </Page>
        )}
        {pages.length !== 0 &&
          pages.map((page) => (
            <Page>
              <PrintHeader />
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
                                  visitTest={visitTest}
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
                              groupedVisitTest.visitTest.Test.category.name
                            }
                          />
                          <StaticTemplatePrint
                            key={catIndex}
                            id={catIndex}
                            visitTest={groupedVisitTest.visitTest}
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
  );
}

export default PrintPage;
