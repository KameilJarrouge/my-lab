import React from "react";

function FilterInput({
  state,
  setState,
  title = "Filter",
  className,
  ...props
}) {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className="flex justify-center items-center  w-[35ch] 2xl:w-[50ch] border-b-[1px] border-b-dark_primary focus-within:border-b-dark_text  rounded-md shadow shadow-black/60">
      <input
        {...props}
        onFocus={(e) => {
          e.target.select(0, e.target.value.length);
        }}
        autoComplete="off"
        placeholder={title}
        className={`bg-input_background text-text  outline-none w-full px-2 py-1 ${className}`}
        onChange={handleChange}
        value={state}
      />
    </div>
  );
}

export default FilterInput;
