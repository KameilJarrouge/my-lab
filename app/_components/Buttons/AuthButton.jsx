"use client";
import React from "react";

function AuthButton({
  title = "تسجيل الخروج",
  icon,
  onClick = (f) => f,
  ...props
}) {
  return (
    <button
      className=" px-2 py-0.5 outline-none focus-within:text-light_text focus-within:border-secondary border border-transparent rounded bg-light_primary/60 hover:bg-secondary text-text  hover:text-light_text flex items-center justify-center gap-2 shadow shadow-black "
      onClick={onClick}
      {...props}
    >
      {title}
      {icon}
    </button>
  );
}

export default AuthButton;
