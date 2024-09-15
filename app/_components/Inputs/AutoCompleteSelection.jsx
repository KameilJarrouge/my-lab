import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";

function AutoCompleteSelect({
  title,
  state,
  setState,
  options,
  optionsNameKey,
  optionsValueKey,
  withHoveringTitle = true,
  id = "unique",
  withClear = false,
  ...props
}) {
  const [isAutoCompleteShowing, setIsAutoCompleteShowing] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    if (!isAutoCompleteShowing && state)
      setInputValue(optionsNameKey ? state[optionsNameKey] : state);
    else setInputValue("");
  }, [isAutoCompleteShowing, state]);

  return (
    <div className="relative" id={id}>
      <TextInput
        id={id + "-select"}
        withHoveringTitle={withHoveringTitle}
        setState={setInputValue}
        withClear={withClear}
        onClear={() => {
          setInputValue("");
          setState(undefined);
        }}
        state={inputValue}
        title={title}
        className={" focus-within:select-all"}
        onFocus={() => setIsAutoCompleteShowing(true)}
        {...props}
      />
      {isAutoCompleteShowing && (
        <div className="absolute top-[calc(25px+1rem)] z-40 left-0 w-full bg-primary rounded shadow shadow-black  flex flex-col gap-2 max-h-[15rem] h-fit p-2 overflow-y-auto overflow-x-hidden">
          {options
            .filter((option) => {
              return (optionsNameKey ? option[optionsNameKey] : option)
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            })
            .slice(0, 20)
            .map((option, index, arr) => (
              <button
                onClick={() => {
                  setState(optionsValueKey ? option[optionsValueKey] : option);
                  setInputValue(
                    optionsNameKey ? option[optionsNameKey] : option
                  );
                  setIsAutoCompleteShowing(false);
                }}
                key={index}
                className={`py-1 px-2 ${
                  index !== arr.length - 1 && "border-b border-light_primary/70"
                } hover:bg-light_text/10 hover:text-light_text text-wrap w-full text-start `}
              >
                {optionsNameKey ? option[optionsNameKey] : option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default AutoCompleteSelect;
