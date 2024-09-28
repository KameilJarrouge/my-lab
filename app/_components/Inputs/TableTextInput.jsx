import React from "react";

function TableTextInput({ value, update, className, onlyNumbers = false }) {
  return (
    <input
      type="text"
      className={`bg-dark_primary px-1 outline-none overflow-hidden  h-[1.8rem] w-full ${className}`}
      value={value}
      onChange={(e) => {
        if (onlyNumbers && isNaN(Number(e.target.value))) return;
        update(e.target.value);
      }}
    />
  );
}

export default TableTextInput;
