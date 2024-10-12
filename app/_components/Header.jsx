"use client";
import React, { useState } from "react";
import LogoComponent from "../_assets/LOGO.svg";
import {
  MdLogin,
  MdOutlineCases,
  MdPassword,
  MdPersonOutline,
  MdSettings,
} from "react-icons/md";
import { GiTestTubes } from "react-icons/gi";
import NavMenu from "./NavMenu";
import Link from "next/link";
import HeaderSearch from "./HeaderSearch";
import AuthButton from "./Buttons/AuthButton";
import api from "../_lib/api";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordModal from "./Modals/ChangePasswordModal";
import { Tooltip } from "react-tooltip";

const navData = [
  {
    title: "المرضى",
    icon: <MdPersonOutline />,
    subtitles: [
      { subtitle: "إضافة مريض", url: "/patients/create" },
      { subtitle: "قائمة المرضى", url: "/patients" },
      { subtitle: "قائمة الزيارات", url: "/visits" },
    ],
  },
  {
    title: "الأطباء",
    icon: <MdOutlineCases />,

    subtitles: [
      { subtitle: "إضافة طبيب", url: "/doctors/create" },
      { subtitle: "قائمة الأطباء", url: "/doctors" },
    ],
  },
  {
    title: "التحاليل",
    icon: <GiTestTubes />,

    subtitles: [
      { subtitle: "إضافة تحليل", url: "/tests/create" },
      { subtitle: "قائمة التحاليل", url: "/tests" },
      { subtitle: "تصنيفات التحاليل", url: "/categories" },
    ],
  },
];

function Header() {
  const router = useRouter();
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

  const handleLogout = async () => {
    let result = await api.post("/logout");
    if (result.data.success) {
      toast("تم تسجيل الخروج");
      router.push("/auth");
    }
  };

  return (
    <div className="w-full h-[5.5rem] flex flex-col">
      <ToastContainer theme="dark" autoClose={2000} position="top-right" rtl />
      <Tooltip
        id="my-tooltip"
        className="text-wrap z-[100]"
        delayShow={500}
        opacity={1}
        render={({ content }) => (
          <div className="text-wrap max-w-[40ch] z-[100]">{content}</div>
        )}
      />
      <ChangePasswordModal
        isOpen={passwordModalIsOpen}
        setIsOpen={setPasswordModalIsOpen}
      ></ChangePasswordModal>
      <div className="w-full h-[3.5rem] bg-dark_primary px-4 flex items-center justify-between relative">
        <div className="w-1/3 flex gap-2 items-center">
          <div className="w-[2rem] h-fit">
            <LogoComponent />
          </div>
          <span className="font-bold text-lg  ">مخبري</span>
        </div>
        <div className="w-1/3">
          <HeaderSearch />
        </div>
        <div className="w-1/3 flex items-center justify-end gap-2">
          <AuthButton
            icon={<MdPassword />}
            title="تغيير كلمة المرور"
            onClick={() => setPasswordModalIsOpen(true)}
          />
          <AuthButton
            icon={<MdLogin />}
            title="تسجيل الخروج"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="w-full h-[2rem] bg-light_primary flex items-center gap-2   text-light_text ">
        <Link
          href={"/"}
          className="w-[calc(15%-5px)] h-full flex items-center justify-center hover:bg-light_text/10 "
        >
          الرئيسية
        </Link>
        <div className="w-[5px] h-full bg-dark_primary -skew-x-12" />
        <div className="w-[calc(85%-3rem)] h-full flex items-center">
          {navData.map((nav, index) => (
            <NavMenu key={index} data={nav} />
          ))}
        </div>
        <div className="w-[3rem] h-full flex items-center justify-center">
          <Link href={"/settings"}>
            <MdSettings className="w-[1.3rem] h-fit text-text hover:text-light_text hover:animate-rotate" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
