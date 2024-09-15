import React from "react";
function LoadingComponent({ loading, className = "w-[5rem] h-fit" }) {
  if (!loading) return <></>;
  return (
    <div className="w-full h-full backdrop-blur-sm flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="-4 -4 24 24"
        width={"100px"}
        height={"100px"}
        strokeWidth="1.2"
        stroke="#025CA2"
        // strokeDasharray={10}
        className={`  animate-wiggle w-[1rem] ${className}`}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(2.000000, 0.000000)">
            <path
              fill="#B2B2B2aa"
              d="M10.921,0.969 C10.921,0.032 10.83,0.031 9.871,0.031 L3.13,0.031 C2.172,0.031 2.078,0.032 2.078,0.969 L3.031,0.969 L3.031,3.909 L0.019,14.238 C0.019,15.177 0.796,15.937 1.755,15.937 L11.244,15.937 C12.202,15.937 12.98,15.177 12.98,14.238 L9.992,3.879 L9.978,0.969 L10.921,0.969 L10.921,0.969 Z M11.969,13.606 C12.24,14.49 11.766,15.041 10.537,15.041 L2.562,15.041 C1.161,15.041 0.817,14.448 1.13,13.606 L3.916,3.954 L3.905,0.941 L9.03,0.941 L9.03,3.93 L11.969,13.606 L11.969,13.606 Z"
            ></path>
            <path
              fill="#025CA2"
              d="M8.039,6.031 L5.019,6.031 L3.181,12.339 C2.826,13.489 2.941,13.923 4.589,13.923 L8.468,13.923 C10.101,13.923 10.138,13.405 9.877,12.339 L8.039,6.031 L8.039,6.031 Z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default LoadingComponent;
