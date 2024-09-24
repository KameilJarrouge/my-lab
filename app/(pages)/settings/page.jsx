"use client";
import AuthButton from "@/app/_components/Buttons/AuthButton";
import RichTextInput from "@/app/_components/Inputs/RichTextInput";
import TextInput from "@/app/_components/Inputs/TextInput";
import LoadingComponent from "@/app/_components/LoadingComponent";
import Title from "@/app/_components/Title";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function SettingsPage() {
  const [id, setId] = useState(-1);
  const [unitPrice, setUnitPrice] = useState(1.3);
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refocusAddUnitField = () => {
    const element = document.getElementById("rich-text-units");
    if (element) element.focus();
  };

  const getSettings = async (whatToSet = "all") => {
    setIsLoading(true);
    const result = await api.get("/settings");
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while fetching settings");
      return;
    }
    console.log(result.data.result);
    setId(result.data.result.id);
    if (whatToSet === "all" || whatToSet === "unitPrice")
      setUnitPrice(result.data.result.unitPrice);
    if (whatToSet === "all" || whatToSet === "units")
      setUnits(JSON.parse(result.data.result.units));
    if (whatToSet === "all" || whatToSet === "location")
      setLocation(result.data.result.location);
  };

  const handleAddUnit = () => {
    if (newUnit === "") return;

    if (!units.includes(newUnit)) units.push(newUnit);

    setNewUnit("");
    refocusAddUnitField();
  };

  const handleRemoveUnit = (unitToRemove) => {
    if (!units.includes(unitToRemove)) return;
    setUnits((units) => units.filter((unit) => unit !== unitToRemove));
  };

  const handleUpdateUnitPrice = async () => {
    if (id === -1) return;
    if (isNaN(Number(unitPrice))) {
      toast.error("يرجى إدخال رقم عشري صالح في خانة سعر الوحدة");
      return;
    }
    setIsLoading(true);
    const result = await api.put(`/settings/update-unit-price`, {
      id,
      unitPrice,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while updating settings");
      return;
    }
    toast("تم تعديل سعر الوحدة بنجاح");
    getSettings("unitPrice");
  };

  const handleUpdateUnits = async () => {
    if (id === -1) return;
    setIsLoading(true);
    const result = await api.put(`/settings/update-units`, { id, units });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while updating settings");
      return;
    }
    toast("تم تعديل وحدات القياس بنجاح");
    getSettings("units");
  };

  const handleUpdateLocation = async () => {
    if (id === -1) return;
    setIsLoading(true);
    const result = await api.put(`/settings/update-location`, { id, location });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error("Something went wrong while updating settings");
      return;
    }
    toast("تم تعديل الموقع بنجاح");
    getSettings("location");
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="w-full h-fit flex  gap-4">
      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <LoadingComponent loading={isLoading} />
        </div>
      )}
      <div className="w-1/3 flex gap-2">
        <div className="w-full p-2 bg-dark_primary h-[30rem] shadow shadow-black rounded flex flex-col gap-8 items-center">
          <Title> وحدات القياس</Title>
          <div className="flex flex-col gap-6 w-full ">
            <div className="flex gap-4 w-full items-center justify-center ">
              <div className="max-w-[20ch]">
                <RichTextInput
                  id="units"
                  title={"وحدة قياس جديدة"}
                  state={newUnit}
                  setState={setNewUnit}
                />
              </div>
              <AuthButton title="إضافة" onClick={handleAddUnit} />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[16rem] min-h-[16rem] w-full  flex flex-col gap-2 items-center">
            {units.length === 0 ? (
              <span>لا يوجد وحدات قياس معرفة مسبقاً</span>
            ) : (
              units.map((unit, index) => (
                <div
                  key={index}
                  className="flex justify-between min-w-[20ch] items-center border-b border-b-light_primary"
                >
                  <span className="w-full text-center">{unit}</span>
                  <button onClick={() => handleRemoveUnit(unit)}>
                    <MdDelete className="text-text hover:text-red-500 w-[1.1rem] h-fit" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2 ">
            <AuthButton title="استعادة" onClick={() => getSettings("units")} />
            <AuthButton title="حفظ" onClick={handleUpdateUnits} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-2/3">
        <div className="bg-dark_primary w-full py-2 px-2 rounded flex justify-between shadow shadow-black ">
          <div className="flex gap-4 items-center w-fit">
            <span className="min-w-[12ch]">{"سعر الوحدة :"}</span>
            <div className="w-[50ch]">
              <TextInput state={unitPrice} setState={setUnitPrice} />
            </div>
          </div>
          <div className="w-fit  flex justify-end gap-4">
            {" "}
            <AuthButton
              title="استعادة"
              onClick={() => getSettings("unitPrice")}
            />
            <AuthButton title="تعديل" onClick={handleUpdateUnitPrice} />
          </div>
        </div>
        <div className="bg-dark_primary w-full py-2 px-2 rounded flex justify-between shadow shadow-black ">
          <div className="flex gap-4 items-center w-fit">
            <span className="min-w-[12ch]">{"الموقع :"}</span>
            <div className="w-[50ch] h-fit">
              <TextInput state={location} setState={setLocation} />
            </div>
          </div>
          <div className="w-fit  flex justify-end gap-4">
            <AuthButton
              title="استعادة"
              onClick={() => getSettings("location")}
            />
            <AuthButton title="تعديل" onClick={handleUpdateLocation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
