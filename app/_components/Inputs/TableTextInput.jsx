import React from "react";

function TableTextInput({
  value,
  update,
  className,
  onlyNumbers = false,
  ...props
}) {
  return (
    <input
      type="text"
      className={`bg-dark_primary px-1 outline-none overflow-hidden  h-[1.8rem] w-full ${className}`}
      value={value}
      onChange={(e) => {
        if (
          onlyNumbers &&
          isNaN(Number(e.target.value)) &&
          e.target.value !== "0-" &&
          e.target.value !== "-"
        )
          return;
        update(e.target.value);
      }}
      {...props}
    />
  );
}

export default TableTextInput;
