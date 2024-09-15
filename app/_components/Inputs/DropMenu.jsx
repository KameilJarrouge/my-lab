"use client";
import React, { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import Separator from "../Separator";

function DropMenu({
  state,
  setState,
  options = ["2024", "2023"],
  title,
  uniqueName = "unique",
}) {
  const [collapsed, setCollapsed] = useState(true);
  /**
   * handles hiding the menu when clicked outside
   * @param {Object} e mouse click event
   */
  const handleMouseClick = (e) => {
    const container = document.getElementById(
      "drop-menu-container-" + uniqueName
    );
    if (!container.contains(e.target)) {
      setCollapsed(true);
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
    <div
      id={"drop-menu-container-" + uniqueName}
      className="relative inline-block text-left w-fit max-w-full  "
    >
      {/* <div> */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="inline-flex w-fit gap-2 items-center  rounded-md bg-dark_primary px-2 py-2 text-sm  text-text shadow-sm "
      >
        {title && (
          <span className=" w-fit text-start min-w-[8ch] text-text">
            {title + " :"}
          </span>
        )}
        <div className="flex gap-2 border-b border-light_primary items-center">
          <span className="min-w-[10ch] text-text ">{state}</span>
          <MdChevronRight
            className={`text-text ${
              collapsed ? "rotate-90" : "-rotate-90 "
            } transition-transform`}
          />
        </div>
      </button>
      {/* </div> */}

      {!collapsed && (
        <div
          className="absolute left-0 z-10 mt-2 min-w-[10ch] max-w-fit origin-top-right rounded-md bg-dark_primary max-h-[10rem] overflow-y-auto shadow shadow-black outline-none"
          tabIndex="-1"
        >
          <div className="p-3 flex flex-col gap-1" role="none">
            {options.map((option, index, arr) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col gap-1 items-center"
                >
                  <button
                    className="text-text hover:text-light_text w-full"
                    onClick={() => {
                      setState(option);
                      setCollapsed(true);
                    }}
                  >
                    {option}
                  </button>
                  {arr.length - 1 !== index && <Separator direction="h" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropMenu;
