"use client";
import React, { useEffect, useState } from "react";

function DebounceInput({ setDebounce, timeoutDuration = 500, ...props }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounce(value);
    }, timeoutDuration);
    return () => clearTimeout(timeoutId);
  }, [value, timeoutDuration]);
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoComplete="off"
    />
  );
}

export default DebounceInput;
