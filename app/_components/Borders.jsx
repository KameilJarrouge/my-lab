import React from "react";

function Borders() {
  return (
    <div className="w-full h-full text-black flex justify-center ">
      <svg
        version="1.1"
        width="200mm"
        height="65mm"
        viewBox="-0.5 -0.5 602 142"
      >
        <defs />
        <g>
          <g>
            <path
              d="M 200 0 L 600 0"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
              strokeWidth={1.5}
            />
          </g>
          <g>
            <path
              d="M 600 150 L 600 0"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
              strokeWidth={1.5}
            />
          </g>
          <g>
            <path
              d="M 0 150 L 600 150"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
              strokeWidth={1.5}
            />
          </g>
          <g>
            <path
              d="M 0 150 L 0 100"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
              strokeWidth={1.5}
            />
          </g>
          <g>
            <path
              d="M 0 100 L 400 100"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              pointerEvents="stroke"
              strokeWidth={1.5}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Borders;
