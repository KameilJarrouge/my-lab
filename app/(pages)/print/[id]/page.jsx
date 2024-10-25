"use client";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ManualTemplatePrint from "@/app/_components/Printing/ManualTemplatePrint";
import ManualTestsHeader from "@/app/_components/Printing/ManualTestsHeader";
import Page from "@/app/_components/Printing/Page";
import PrintHeader from "@/app/_components/Printing/PrintHeader";
import PrintSettings from "@/app/_components/Printing/PrintSettings";
import StaticTemplatePrint from "@/app/_components/Printing/StaticTemplatePrint";
import StaticTestHeader from "@/app/_components/Printing/StaticTestHeader";
import api from "@/app/_lib/api";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PrintPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [visit, setVisit] = useState();
  const [testsGroupedByCategory, setTestsGroupedByCategory] = useState([]);
  const [pages, setPages] = useState([]);
  const [isDoctorShown, setIsDoctorShown] = useState("إظهار الدكتور");
  const [location, setLocation] = useState("");
  const [categoryIndicator, setCategoryIndicator] = useState(undefined);
  const router = useRouter();
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
    if (testsGroupedByCategory.length !== 0) return;
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}/for-printing`);
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error("Something went wrong while fetching visit for printing");
      return;
    }

    // getting last tests
    let testsWithLastTest = result.data.result.tests;
    let requestLoad = testsWithLastTest.map((test) => ({
      testId: test.Test.id,
      patientId: result.data.result.patientId,
      dateInQuestion: result.data.result.date,
      visitId: params.id,
      visitTestId: test.id,
    }));
    const lastTestsResult = await api.post(
      `/visit-tests/multiple-last-visit-test`,
      requestLoad
    );
    if (!lastTestsResult.data.success) {
      toast.error("Check the Console !");
      console.error(
        "Something went wrong while fetching last visit-test for printing"
      );
      return;
    }
    testsWithLastTest = testsWithLastTest.map((test, index) => ({
      ...test,
      lastVisitTest: lastTestsResult.data.result[test.id],
    }));

    // will hold the final categorized visit-tests
    let categorizedTestsArray = [];

    // temporary hold for the visit-tests that share a category, will be appended to the previous array after categorizing
    let needToBeGrouped = {};
    let categoryIndex = -1;
    for (let i = 0; i < testsWithLastTest.length; i++) {
      let element = testsWithLastTest[i];
      // parse the JSON template in the visit-test
      element.template = JSON.parse(element.template);

      if (element.template.type === "static") {
        // static templates doesn't share category.
        if (element.template.staticTemplate === "Culture And Sensitivity") {
          // adding unique index for the CS AA rows to measure their height
          element.template.result.selectedAA =
            element.template.result.selectedAA.map((aa, index) => ({
              ...aa,
              aaIndex: `vt-${element.id}-aa-${index}`,
            }));
        }
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
    /**
     * same as catIndex
     */
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
              visitTestsLeft.unshift({
                ...firstGroupedTest,
                readingIndex: firstGroupedTest.hasOwnProperty("readingIndex")
                  ? firstGroupedTest.readingIndex
                  : readingIndex,
              });
            } else {
              // add the remaining test in their own groupedTest
              visitTestsLeft.unshift({
                type: firstGroupedTest.type,
                visitTest: firstGroupedTest.visitTest.slice(indexCount),
                readingIndex: firstGroupedTest.hasOwnProperty("readingIndex")
                  ? firstGroupedTest.readingIndex
                  : readingIndex,
                spliced: true,
                indicatorIndex: firstGroupedTest.indicatorIndex,
              });
              pages[pages.length - 1].height -=
                manualTestHeight - currentHeight;
              pages[pages.length - 1].content.push({
                type: firstGroupedTest.type,
                visitTest: safeTests,
                indicatorIndex: firstGroupedTest.indicatorIndex,
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
        let isDefault = false;
        switch (firstGroupedTest.visitTest.template.staticTemplate) {
          case "تحليل البول Urinalysis": {
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
            break;
          }

          case "Culture And Sensitivity": {
            if (!firstGroupedTest.visitTest.template.result.isPositive) {
              isDefault = true;
              break;
            }
            indexCount = 0;
            let CSHeaderTestHeight = 0;

            CSHeaderTestHeight =
              CSHeaderTestHeight +
              pxTomm(
                "static-test-header-" +
                  (firstGroupedTest.hasOwnProperty("readingIndex")
                    ? firstGroupedTest.readingIndex
                    : readingIndex)
              ) +
              pxTomm(
                "CS-header-" +
                  (firstGroupedTest.hasOwnProperty("readingIndex")
                    ? firstGroupedTest.readingIndex
                    : readingIndex)
              ) +
              pxTomm(
                "CS-attributes-" +
                  (firstGroupedTest.hasOwnProperty("readingIndex")
                    ? firstGroupedTest.readingIndex
                    : readingIndex)
              ) +
              pxTomm(
                "CS-table-header-" +
                  (firstGroupedTest.hasOwnProperty("readingIndex")
                    ? firstGroupedTest.readingIndex
                    : readingIndex)
              ) +
              pxTomm(
                "CS-table-footer-" +
                  (firstGroupedTest.hasOwnProperty("readingIndex")
                    ? firstGroupedTest.readingIndex
                    : readingIndex)
              );
            // the header doesn't fit
            if (CSHeaderTestHeight > pages[pages.length - 1].height) {
              pages.push({ height: 217, content: [] });
            }

            while (true) {
              // finished this grouped test
              if (indexCount === 19) {
              }
              if (
                indexCount >
                firstGroupedTest.visitTest.template.result.selectedAA.length - 1
              ) {
                if (indexCount !== 0) {
                  pages[pages.length - 1].height -= CSHeaderTestHeight;
                  pages[pages.length - 1].content.push({
                    type: firstGroupedTest.type,
                    visitTest: firstGroupedTest.visitTest,
                    indicatorIndex: firstGroupedTest.indicatorIndex,
                  });
                }
                break;
              }

              let nextAAHeight = pxTomm(
                `vt-${firstGroupedTest.visitTest.id}-aa-${indexCount}`
              );

              CSHeaderTestHeight += nextAAHeight;

              if (CSHeaderTestHeight > pages[pages.length - 1].height) {
                // the current test can't be added to this page

                if (indexCount === 0) {
                  // Only the header can be put
                  // create a new page
                  pages.push({ height: 217, content: [] });
                  // unshift the first grouped test (redo this in a new page)
                  visitTestsLeft.unshift(firstGroupedTest);
                } else {
                  // add the remaining test in their own groupedTest
                  let remainingAAInVisitTest = structuredClone(
                    firstGroupedTest.visitTest
                  );
                  remainingAAInVisitTest.template.result.selectedAA =
                    remainingAAInVisitTest.template.result.selectedAA.slice(
                      indexCount
                    );
                  visitTestsLeft.unshift({
                    type: firstGroupedTest.type,
                    visitTest: remainingAAInVisitTest,
                    readingIndex: firstGroupedTest.hasOwnProperty(
                      "readingIndex"
                    )
                      ? firstGroupedTest.readingIndex
                      : readingIndex,
                    spliced: true,
                    indicatorIndex: firstGroupedTest.indicatorIndex,
                  });
                  pages[pages.length - 1].height -=
                    CSHeaderTestHeight - nextAAHeight;

                  let safeToPutAAInVisitTest = structuredClone(
                    firstGroupedTest.visitTest
                  );
                  safeToPutAAInVisitTest.template.result.selectedAA =
                    safeToPutAAInVisitTest.template.result.selectedAA.slice(
                      0,
                      indexCount
                    );
                  pages[pages.length - 1].content.push({
                    type: firstGroupedTest.type,
                    visitTest: safeToPutAAInVisitTest,
                    indicatorIndex: firstGroupedTest.indicatorIndex,
                  });
                }
                break;
              } else {
                // safeAA.push(firstGroupedTest.visitTest[indexCount]);
                indexCount++;
              }
            }
            break;
          }

          default:
            isDefault = true;
            break;
        }
        if (isDefault) {
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
      }
      if (!firstGroupedTest.hasOwnProperty("readingIndex")) {
        readingIndex++;
      }
      // the user broke the page after this category
      // !firstGroupedTest.spliced && I think the previous code is not useful
      if (firstGroupedTest.breaksPage && visitTestsLeft.length !== 0) {
        pages.push({
          height: 217,
          content: [],
        });
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

  const setBreaksPage = (index, value) => {
    let originalArray = testsGroupedByCategory;
    originalArray[index].breaksPage = value;
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
          <PrintSettings
            isDoctorShown={isDoctorShown}
            setIsDoctorShown={setIsDoctorShown}
            testsGroupedByCategory={testsGroupedByCategory}
            categoryIndicator={categoryIndicator}
            setCategoryIndicator={setCategoryIndicator}
            reorderGroups={reorderGroups}
            setBreaksPage={setBreaksPage}
            exit={() => router.back()}
          />
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
            <Page key={index} pageNumber={index + 1}>
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
                          onClick={() =>
                            setCategoryIndicator(
                              groupedVisitTest.indicatorIndex
                            )
                          }
                          key={catIndex}
                          className={` ${
                            groupedVisitTest.indicatorIndex ===
                              categoryIndicator && " bg-gray-200"
                          }  print:bg-transparent`}
                        >
                          <ManualTestsHeader
                            id={" "}
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
                                  id={" "}
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
                                  lastTestDate={
                                    visitTest.lastVisitTest?.Visit.date ||
                                    undefined
                                  }
                                  lastTestResult={
                                    visitTest.lastVisitTest?.template.result
                                      .value || undefined
                                  }
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
                          onClick={() =>
                            setCategoryIndicator(
                              groupedVisitTest.indicatorIndex
                            )
                          }
                          key={catIndex}
                          className={` ${
                            groupedVisitTest.indicatorIndex ===
                              categoryIndicator && " bg-gray-200"
                          }   print:bg-transparent`}
                        >
                          <StaticTestHeader
                            key={catIndex}
                            id={" "}
                            categoryName={
                              groupedVisitTest.visitTest.Test.category.name
                            }
                          />
                          <StaticTemplatePrint
                            key={catIndex}
                            id={" "}
                            template={groupedVisitTest.visitTest.template}
                            lastTestDate={
                              groupedVisitTest.visitTest.lastVisitTest?.Visit
                                .date || undefined
                            }
                            lastTestResult={
                              groupedVisitTest.visitTest.lastVisitTest?.template
                                .result || undefined
                            }
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </Page>
          ))}
        {/* {true && ( */}
        <Page hideOnPrint heightFit invisible>
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
                            lastTestDate={
                              visitTest.lastVisitTest?.Visit.date || undefined
                            }
                            lastTestResult={
                              visitTest.lastVisitTest?.template.result.value ||
                              undefined
                            }
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
                        lastTestDate={
                          groupedVisitTest.visitTest.lastVisitTest?.Visit
                            .date || undefined
                        }
                        lastTestResult={
                          groupedVisitTest.visitTest.lastVisitTest?.template
                            .result || undefined
                        }
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
