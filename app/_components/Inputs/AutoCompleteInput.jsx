import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";

function AutoCompleteInput({
  title,
  state,
  setState,
  options,
  withHoveringTitle = true,
  id = "unique",
  ...props
}) {
  const [isAutoCompleteShowing, setIsAutoCompleteShowing] = useState(false);
  const handleMouseClick = (e) => {
    const container = document.getElementById(id);
    if (!container.contains(e.target)) {
      setIsAutoCompleteShowing(false);
    }
  };
  useEffect(() => {
    let body = document.getElementById("body");
    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);
  return (
    <div className="relative" id={id}>
      <TextInput
        id={id + "-input"}
        withHoveringTitle={withHoveringTitle}
        setState={setState}
        state={state}
        title={title}
        onFocus={() => setIsAutoCompleteShowing(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsAutoCompleteShowing(false);
          }, 200);
        }}
        {...props}
      />
      {isAutoCompleteShowing && (
        <div className="absolute top-[calc(25px+1rem)] z-40 left-0 w-full bg-primary rounded shadow shadow-black  flex flex-col gap-2 max-h-[15rem] h-fit p-2 overflow-y-auto overflow-x-hidden">
          {options
            .filter((option) => {
              return option.toLowerCase().includes(state.toLowerCase());
            })
            .slice(0, 20)
            .map((option, index, arr) => (
              <button
                tabIndex={"-1"}
                onClick={() => {
                  setState(option);
                  setIsAutoCompleteShowing(false);
                }}
                key={index}
                className={`py-1 px-2 ${
                  index !== arr.length - 1 && "border-b border-light_primary/70"
                } hover:bg-light_text/10 hover:text-light_text text-wrap w-full text-start `}
              >
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default AutoCompleteInput;
