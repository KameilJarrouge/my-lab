import React from "react";

function HLine({ height, width }) {
  return (
    <div className="w-full h-full text-black ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        height={height}
        width={width}
        className="w-full h-full "
        viewBox="-0.5 -0.5 2 82"
      >
        <defs />
        <g>
          <g>
            <path
              d="M 0 0 L 0 80"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default HLine;
