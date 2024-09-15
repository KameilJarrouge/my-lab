import React from "react";

function Title({ children }) {
  return (
    <span className="px-3 py-1 text-text font-semibold text-lg border-b border-b-light_primary w-fit">
      {children}
    </span>
  );
}

export default Title;
