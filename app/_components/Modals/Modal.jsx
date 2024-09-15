"use client";
import React, { useEffect } from "react";

function Modal({ isOpen, close, children, uniqueName = "unique" }) {
  const handleOutsideClick = (event) => {
    const content = document.getElementById("content");
    if (!content) {
      return;
    }
    if (!content.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const modalContainer = document.getElementById(
      `modal-container-${uniqueName}`
    );
    if (!modalContainer) {
      return;
    }

    // Attach the memoized event listener
    modalContainer.addEventListener("click", handleOutsideClick);

    return () => {
      modalContainer.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div id={`modal-container-${uniqueName}`} tabIndex={"0"}>
      {isOpen && (
        <div className="fixed left-0 top-0 w-full h-full  bg-black bg-opacity-70 z-40 overflow-hidden backdrop-blur flex flex-col justify-center items-center ">
          <div
            id="content"
            className={`w-fit h-fit bg-dark_primary rounded p-2 animate-popIn shadow-lg shadow-black`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
