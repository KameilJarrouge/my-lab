import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

function NumberInput({ value, setValue, title }) {
  return (
    <div className="flex items-center  px-1 gap-1  w-fit h-full min-h-[1rem]">
      <span className="text-dark_text pl-2">{title}</span>
      <button
        onClick={() => {
          if (value !== 1) setValue(value - 1);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          if (value > 10) setValue(value - 10);
        }}
        className="w-full  rounded-r bg-light_primary hover:bg-red-700/90 hover:text-light_text px-1  h-[1.5rem]"
      >
        <FiMinus className="cursor-pointer  " />
      </button>
      <input
        type="number"
        className=" w-[3ch] outline-none text-center  h-[1.5rem] bg-light_primary "
        max={150}
        min={1}
        value={value}
        onChange={(e) => {
          if (Number(e.target.value) > 0 && Number(e.target.value) < 151)
            setValue(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          if (value !== 150) setValue(value + 1);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          if (value < 141) setValue(value + 10);
        }}
        className="w-full  rounded-l bg-light_primary hover:bg-secondary/90 hover:text-light_text px-1 h-[1.5rem]"
      >
        <IoMdAdd className="cursor-pointer " />
      </button>
    </div>
  );
}

export default NumberInput;
