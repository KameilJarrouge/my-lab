import React from "react";

function Separator({ direction = "H", className }) {
  if (direction === "V" || direction === "v") {
    return <div className={`w-[1px] h-full bg-light_primary ${className}`} />;
  }
  return <div className={`w-full h-[1px] bg-light_primary ${className}`} />;
}

export default Separator;
