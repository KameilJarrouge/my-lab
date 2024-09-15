import React from "react";

function ToggleInput({
  value1 = "value1",
  value2 = "value2",
  selectedValue,
  setSelectedValue,
  className = "",
}) {
  return (
    <div
      className={`max-w-full  min-w-[15ch] h-full  py-1 rounded bg-light_primary flex grow justify-between relative z-0 text-text text-sm overflow-hidden ${className}`}
    >
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-secondary  -z-10 ${
          selectedValue === value2 && "-translate-x-full"
        } transition-transform  duration-200 ease-in`}
      ></div>
      <button
        className="w-full text-center"
        onClick={() => setSelectedValue(value1)}
      >
        {value1}
      </button>
      <button
        className="w-full text-center"
        onClick={() => setSelectedValue(value2)}
      >
        {value2}
      </button>
    </div>
  );
}

export default ToggleInput;
