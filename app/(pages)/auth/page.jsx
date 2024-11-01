"use client";

import { useEffect, useState } from "react";
import TextInput from "../../_components/Inputs/TextInput";
import api from "../../_lib/api";
import { useStore } from "../../store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorMessages } from "../../_constants/constants";
import AuthButton from "../../_components/Buttons/AuthButton";
import LoadingComponent from "../../_components/LoadingComponent";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginOrSignUp = async () => {
    setIsLoading(true);
    let result = await api.get("/auth/user-exists");
    setIsLoading(false);
    if (result.data.success) {
      if (!result.data.result) {
        setIsLogin(false);
      }
    }
  };

  useEffect(() => {
    handleLoginOrSignUp();
    document.getElementById("first").focus();
  }, []);

  let handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    await handleSubmitAndClose();
  };

  let handleSubmitAndClose = async (e) => {
    if (password === "") return;
    let url = "/auth/login";
    if (!isLogin) url = "/auth/signup";

    setIsLoading(true);
    let result = await api.post(url, {
      password,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error(errorMessages[result.data.errorCode]);
      return;
    }
    setPassword("");
    toast(`تم ${isLogin ? "تسجيل الدخول" : "تسجيل حساب جديد"} بنجاح`);
    useStore.setState({
      isLoggedIn: true,
    });
    setTimeout(() => {
      router.push("/");
    }, 500);
  };
  return (
    <div onKeyDown={handleKeyDown} className="w-full h-full">
      <div className="fixed left-0 top-0 w-full h-full  bg-black bg-opacity-70 z-50 overflow-auto backdrop-blur flex flex-col justify-center items-center">
        <div
          id="content"
          className=" flex flex-col items-center gap-8 bg-dark_primary border border-light_primary    min-w-[24rem] px-8 py-4 rounded  shadow-lg shadow-black relative"
        >
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-50">
              <LoadingComponent loading={true} />
            </div>
          )}
          <span className=" px-3 py-1 text-text font-semibold text-lg border-b border-b-light_primary w-fit">
            {isLogin ? "تسجيل دخول" : "حساب جديد"}
          </span>
          <div className="flex flex-col gap-6 w-full">
            <TextInput
              id="first"
              state={password}
              setState={setPassword}
              title={"كلمة المرور"}
              type={"password"}
            />
            <AuthButton title="متابعة" onClick={handleSubmitAndClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
