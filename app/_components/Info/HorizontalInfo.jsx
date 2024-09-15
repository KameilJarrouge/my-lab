import React from "react";

function HorizontalInfo({ title, value, withToolTip = false }) {
  return (
    <div className="w-full h-fit flex gap-2 text-text items-center">
      <span className="font-semibold ">{title + " : "}</span>
      {withToolTip ? (
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={value}
          className="truncate w-3/4 "
        >
          {value}
        </span>
      ) : (
        <span className="truncate w-3/4 ">{value}</span>
      )}
    </div>
  );
}

export default HorizontalInfo;
