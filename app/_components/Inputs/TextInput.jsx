"use client";
import React from "react";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdClear } from "react-icons/md";

function TextInput({
  state,
  setState,
  title,
  type,
  className,
  withHoveringTitle = true,
  withClear = false,
  onClear = (f) => f,
  ...props
}) {
  const [hidden, setHidden] = useState(true);
  const handleChange = (e) => {
    setState(e.target.value, e);
  };
  return (
    <div className="w-full h-fit flex flex-col ">
      {withHoveringTitle && (
        <span className=" text-xs  h-[1rem] w-full text-end">
          {state !== "" && title}
        </span>
      )}
      <div className="w-full h-fit flex bg-input_background  justify-center items-center  border-b-[1px] border-b-light_primary focus-within:border-b-light_text relative">
        <input
          {...props}
          type={hidden ? type : "text"}
          placeholder={title}
          className={`w-full bg-transparent  text-text  outline-none h-[1.8rem]  ${className}`}
          autoComplete="off"
          onChange={handleChange}
          value={state || ""}
        />

        <div className="flex gap-2 justify-center items-center w-[1rem]">
          {type === "password" && (
            <>
              {hidden ? (
                <button>
                  <IoMdEye
                    onClick={() => setHidden(false)}
                    className="fill-dark_text hover:fill-text cursor-pointer"
                  />
                </button>
              ) : (
                <button>
                  <IoMdEyeOff
                    onClick={() => setHidden(true)}
                    className="fill-dark_text hover:fill-text cursor-pointer "
                  />
                </button>
              )}
            </>
          )}
          {withClear && (
            <button onClick={onClear}>
              <MdClear className="fill-dark_text hover:fill-text cursor-pointer " />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
