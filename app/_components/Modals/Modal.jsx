"use client";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

function Modal({
  isOpen,
  close,
  children,
  uniqueName = "unique",
  shouldCloseOnOutsideClick = true,
}) {
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
    if (!isOpen || !shouldCloseOnOutsideClick) return;

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
            className={`w-fit h-fit bg-dark_primary rounded p-2 animate-popIn shadow-lg shadow-black relative`}
          >
            {!shouldCloseOnOutsideClick && (
              <button
                className="absolute top-[1rem] left-[1rem] z-50 text-text hover:text-white"
                onClick={close}
              >
                <MdClose />
              </button>
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
