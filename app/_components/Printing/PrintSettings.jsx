import React from "react";
import Title from "../Title";
import ToggleInput from "../Inputs/ToggleInput";
import { MdChevronLeft, MdInsertPageBreak } from "react-icons/md";
import AuthButton from "../Buttons/AuthButton";
import TextInput from "../Inputs/TextInput";

function PrintSettings({
  isDoctorShown,
  setIsDoctorShown,
  overrideTitle,
  setOverrideTitle,
  testsGroupedByCategory,
  categoryIndicator,
  setCategoryIndicator,
  reorderGroups,
  setBreaksPage,
  exit,
}) {
  return (
    <div className="w-full h-full bg-dark_primary flex flex-col gap-8 items-center shadow shadow-black border border-light_primary rounded p-4">
      <Title>إعدادات الطباعة</Title>
      {/* All of the categorized visitTest will be here */}

      <div className="flex flex-col w-full h-full items-center overflow-y-auto overflow-x-hidden gap-4 text-white px-4">
        <div className="flex flex-col gap-2   " dir="rtl">
          <ToggleInput
            selectedValue={isDoctorShown}
            setSelectedValue={setIsDoctorShown}
            value1="إظهار الدكتور"
            value2="إخفاء الدكتور"
          />
          <TextInput
            state={overrideTitle}
            setState={setOverrideTitle}
            title={"لقب المريض (اتركه فارغ لاستخدام الافتراضي)"}
            withClear
            onClear={() => setOverrideTitle("")}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          {testsGroupedByCategory.length !== 0 &&
            testsGroupedByCategory.map((testGroupedByCategory, index) => {
              if (!testGroupedByCategory) return;
              let groupName = Array.isArray(testGroupedByCategory.visitTest)
                ? testGroupedByCategory.visitTest[0].Test.category.name
                : testGroupedByCategory.visitTest.Test.category.name;
              return (
                <div
                  key={index}
                  className="w-full flex flex-col gap-1 items-center"
                >
                  <div
                    key={index}
                    className="flex w-full justify-between items-center"
                  >
                    <button
                      className={`w-[calc(100%-3.4rem)] flex items-center gap-2 border-b  ${
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
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setCategoryIndicator(undefined);
                      }}
                    >
                      <span className="">{"(" + (index + 1) + ")"}</span>
                      <span
                        className="truncate font-semibold w-full text-start"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={groupName}
                      >
                        {groupName}
                      </span>
                    </button>
                    <div className="flex items-center gap-4 w-[3rem]">
                      {/* <span>
                      عدد التحاليل :
                      {Array.isArray(testGroupedByCategory.visitTest)
                        ? testGroupedByCategory.visitTest.length
                        : 1}
                    </span> */}
                      <button onClick={() => reorderGroups(index, -1)}>
                        <MdChevronLeft
                          className={`rotate-90 w-[1.5rem] h-fit   ${
                            index === 0
                              ? "text-dark_text cursor-not-allowed bg-light_primary/50 opacity-50"
                              : "text-text hover:text-light_text bg-light_primary "
                          }`}
                        />
                      </button>
                      <button onClick={() => reorderGroups(index, 1)}>
                        <MdChevronLeft
                          className={`-rotate-90 w-[1.5rem] h-fit   ${
                            index === testsGroupedByCategory.length - 1
                              ? "text-dark_text cursor-not-allowed bg-light_primary/50 opacity-50"
                              : "text-text hover:text-light_text bg-light_primary "
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  {index !== testsGroupedByCategory.length - 1 && (
                    <div className="flex w-full items-center justify-center gap-2">
                      <div
                        className={`w-[calc(50%-0.65rem)] h-[2px] bg-yellow-400/50 ${
                          !testGroupedByCategory.breaksPage && "hidden"
                        }`}
                      ></div>
                      <button
                        onClick={() =>
                          setBreaksPage(
                            index,
                            !!!testGroupedByCategory.breaksPage
                          )
                        }
                      >
                        <MdInsertPageBreak
                          className={`w-[1.3rem] h-fit ${
                            testGroupedByCategory.breaksPage
                              ? "text-yellow-400 hover:text-yellow-600"
                              : "hover:text-light_text text-text"
                          }`}
                        />
                      </button>
                      <div
                        className={`w-[calc(50%-0.65rem)] h-[2px] bg-yellow-400/50 ${
                          !testGroupedByCategory.breaksPage && "hidden"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex gap-4">
        <AuthButton onClick={() => window.print()} title="طباعة" />
        <AuthButton onClick={() => exit()} title="إغلاق" />
      </div>
    </div>
  );
}

export default PrintSettings;
