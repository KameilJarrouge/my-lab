import React from "react";

function HorizontalInfo({ title, value, emptyValueMessage }) {
  return (
    <div className="w-full h-fit flex flex-col gap-2  text-text">
      <span className="font-semibold ">{title}</span>
      <span className="w-full text-wrap h-[10rem] overflow-y-auto overflow-x-hidden ">
        {value === "" ? emptyValueMessage : value}
      </span>
    </div>
  );
}

export default HorizontalInfo;
