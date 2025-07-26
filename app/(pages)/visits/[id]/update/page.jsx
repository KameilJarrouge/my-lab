"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import TestTemplateCardUpdate from "@/app/_components/Cards/TestTemplateCardUpdate";
import AutoCompleteInput from "@/app/_components/Inputs/AutoCompleteInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import ConfirmModal from "@/app/_components/Modals/ConfirmModal";
import ManualTemplateInputUpdate from "@/app/_components/TemplateInputs/ManualTemplateInputUpdate";
import StaticTemplateInputUpdate from "@/app/_components/TemplateInputs/StaticTemplateInputUpdate";
import api from "@/app/_lib/api";
import numberWithCommas from "@/app/_lib/numberWithCommas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { MdClear, MdPrint } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEnvelope, FaFileInvoiceDollar } from "react-icons/fa6";

function UpdateVisit({ params }) {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [tests, setTests] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [isAllCollapsed, setIsAllCollapsed] = useState(null);
  const [printStatus, setPrintStatus] = useState({
    test: false,
    bill: false,
    envelope: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (patient.hasOwnProperty("name"))
      document.title = patient.name + " (تعديل زيارة)";
  }, [patient]);

  const getUnitPrice = async () => {
    setIsLoading(true);
    const result = await api.get("/settings");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");

      console.error(
        "Something went wrong while creating new doctor in new visit page"
      );
      return;
    }
    setUnitPrice(result.data.result.unitPrice);
  };

  const updateVisit = async () => {
    // Handle errors
    if (doctor === "") {
      toast.error("يرجى اختيار طبيب");
      return;
    }

    if (!createdAt) {
      toast.error("يرجى اختيار تاريخ الزيارة");
      return;
    }

    setIsLoading(true);

    // Handle creating doctor if doesn't exist
    let doctorId = undefined;
    const existingDoctor = doctors.filter(
      (doctorInList) => doctorInList.name.toLowerCase() === doctor.toLowerCase()
    );

    if (existingDoctor.length === 0) {
      // create a new one
      const newDoctorResult = await api.post("/doctors/create", {
        name: doctor,
      });
      if (!newDoctorResult.data.success) {
        toast.error("Check The Console!");
        console.error(
          "Something went wrong while creating new doctor in update visit page"
        );
        return;
      }

      doctorId = newDoctorResult.data.result.id;
    } else {
      // found an existing doctor
      doctorId = existingDoctor[0].id;
    }

    // Create Visit
    const newVisitResult = await api.put(`/visits/${params.id}/update`, {
      date: createdAt,
      doctorId: doctorId,
    });
    if (!newVisitResult.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while updating visit in update visit page"
      );
      return;
    }

    toast("تم تعديل الزيارة");
    router.push(`/patients/${patient.id}`);
  };

  const getDoctors = async () => {
    setIsLoading(true);
    const result = await api.get(`/doctors/list`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching doctor list for new visit"
      );
      return;
    }
    setDoctors(result.data.result);
  };

  const getVisit = async () => {
    setIsLoading(true);
    const result = await api.get(`/visits/${params.id}`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while fetching visit for update visit"
      );
      return;
    }
    setPrintStatus({
      test: result.data.result.testPrinted,
      bill: result.data.result.billPrinted,
      envelope: result.data.result.envelopePrinted,
    });
    setPatient(result.data.result.Patient);
    setDoctor(result.data.result.doctor.name);
    setCreatedAt(result.data.result.date);
    const fetchedTests = result.data.result.tests.map((test) => {
      let tempTest = test;
      tempTest.template = JSON.parse(tempTest.template);
      return tempTest;
    });
    setTests(fetchedTests);
  };

  const deleteVisit = async () => {
    setIsLoading(true);
    const result = await api.delete(`/visits/${params.id}/delete`);
    if (!result.data.success) {
      toast.error("Check the console!");
      console.error("Something went wrong while deleting visit");
      return;
    }

    router.push(`/patients/${patient.id}`);
    toast("تم حذف الزيارة بنجاح");
  };

  useEffect(() => {
    getDoctors();
    getVisit();
    getUnitPrice();
  }, []);

  useEffect(() => {
    if (tests.length === 0) {
      setTotalPrice(0);
      return;
    }
    const totalPriceTemp = tests.reduce((total, test) => {
      return total + test.units * test.price;
    }, 0);
    setTotalPrice(totalPriceTemp);
  }, [tests]);

  return (
    <div
      className="w-full h-full 
      flex flex-col gap-4"
    >
      <ConfirmModal
        isOpen={confirmIsOpen}
        setIsOpen={setConfirmIsOpen}
        onConfirm={deleteVisit}
        message={`هل أنت متأكد من حذف هذه الزيارة؟ لا يمكن التراجع عن هذه العملية!`}
        confirmButtonLabel="حذف"
      />

      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      {/* Visit Information */}
      <div
        className="w-full px-4 py-3 gap-2 rounded shadow shadow-black h-fit bg-dark_primary
        flex flex-col  items-center justify-between"
      >
        <div className="w-full flex items-center justify-between">
          {/* Line 1 */}
          <div className="w-fit flex items-center gap-4">
            <span className="">{"تعديل زيارة :"}</span>
            <span
              className="font-semibold"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="العودة إلى صفحة المريض"
            >
              <Link href={`/patients/${patient.id}`}>{patient.name}</Link>
            </span>
            <span className="text-dark_text/60">•</span>
            <span className="">{"تاريخ الزيارة :"}</span>
            <div dir="ltr" className="min-w-[15ch] h-fit">
              <DateTimePicker
                value={createdAt}
                onChange={setCreatedAt}
                disableClock
                className={
                  "text-dark_text p-0 focus-within:text-light_text border-b-[1px] h-[1.5rem] w-full border-b-light_primary focus-within:border-b-light_text"
                }
                calendarIcon={null}
                clearIcon={() => (
                  <MdClear className="translate-x-1 text-dark_text hover:text-light_text" />
                )}
                format="yyyy-MM-dd"
              />
            </div>
            <span className="text-dark_text/60">•</span>
            <span className="">{"الطبيب :"}</span>
            <AutoCompleteInput
              withHoveringTitle={false}
              state={doctor}
              setState={setDoctor}
              options={doctors.map((doctor) => doctor.name)}
            />
            <span className="text-text ">
              التكلفة: {numberWithCommas(totalPrice)} ل.س
            </span>
            <AuthButton title="تعديل" onClick={updateVisit} />
          </div>
          <div className="flex gap-3 items-center">
            <button
              className={` ${
                printStatus.bill ? "text-green-400" : "text-text"
              } hover:text-green-400`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="طباعة الفاتورة"
              onClick={() => {
                if (printStatus.bill)
                  if (!confirm("الفاتورة مطبوعة من قبل! هل تريد المتابعة؟"))
                    return;
                router.push(`/print/${params.id}/invoice`);
              }}
            >
              <FaFileInvoiceDollar className="w-[1.3rem] h-fit" />
            </button>
            <button
              className={` ${
                printStatus.envelope ? "text-green-400" : "text-text"
              } hover:text-green-400`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="طباعة الظرف"
              onClick={() => {
                if (printStatus.envelope)
                  if (!confirm("الظرف مطبوع من قبل! هل تريد المتابعة؟")) return;
                router.push(`/print/${params.id}/envelope`);
              }}
            >
              <FaEnvelope className="w-[1.3rem] h-fit" />
            </button>
            <button
              className={` ${
                printStatus.test ? "text-green-400" : "text-text"
              } hover:text-green-400`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="طباعة النتائج"
              onClick={() => {
                if (printStatus.test)
                  if (!confirm("الزيارة مطبوعة من قبل! هل تريد المتابعة؟"))
                    return;
                router.push(`/print/${params.id}`);
              }}
            >
              <MdPrint className="w-[1.3rem] h-fit" />
            </button>
          </div>{" "}
        </div>
        <div className="w-full flex items-center gap-4">
          <AuthButton
            title="حذف الزيارة"
            onClick={() => setConfirmIsOpen(true)}
          />
          <AuthButton
            title="إضافة تحاليل"
            onClick={() => router.push(`/visits/${params.id}/add-tests`)}
          />
          <AuthButton
            title="طي التحاليل"
            onClick={() => setIsAllCollapsed(true)}
          />
          <AuthButton
            title="فرد تحاليل"
            onClick={() => setIsAllCollapsed(false)}
          />
        </div>
      </div>
      {/* Tests */}
      <div className="w-full min-h-[50vh] h-fit flex flex-col items-center gap-3 px-3 pb-2  overflow-y-auto overflow-x-hidden">
        {tests.map((test, index) => (
          <TestTemplateCardUpdate
            key={index}
            index={index}
            isAllCollapsed={isAllCollapsed}
            setIsAllCollapsed={setIsAllCollapsed}
            visitTest={test}
            triggerRefresh={getVisit}
            unitPrice={unitPrice}
            removeTest={() => removeTest(index)}
            patientId={patient.id}
            dateInQuestion={createdAt}
            templateInput={(lastTest) => {
              return test.template.type === "manual" ? (
                <ManualTemplateInputUpdate
                  visitTest={test}
                  dateInQuestion={createdAt}
                  patientId={params.id}
                  lastTest={lastTest}
                  triggerRefresh={getVisit}
                  setIsLoading={setIsLoading}
                />
              ) : (
                <StaticTemplateInputUpdate
                  visitTest={test}
                  dateInQuestion={createdAt}
                  lastTest={lastTest}
                  patientId={params.id}
                  triggerRefresh={getVisit}
                  setIsLoading={setIsLoading}
                />
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default UpdateVisit;
