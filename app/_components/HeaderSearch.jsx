"use client";
import React, { useEffect, useState } from "react";
import MainSearchInput from "./Inputs/MainSearchInput";
import HeaderResult from "./HeaderResult";
import api from "../_lib/api";
import { toast } from "react-toastify";

function HeaderSearch() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * handles hiding the menu when clicked outside
   * @param {Object} e mouse click event
   */
  const handleMouseClick = (e) => {
    const container = document.getElementById("nav-search-container");
    if (!container.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  const handleKeyDown = (e) => {
    const resultMenu = document.getElementById("result-menu");
    if (!resultMenu) {
      setMenuVisible(true);
      return;
    }

    if (e.key === "Escape") {
      setMenuVisible(false);
      return;
    }
  };

  const searchForPatients = async () => {
    if (searchKey === "") return;
    setIsLoading(true);
    const result = await api.get(`/patients/search?searchKey=${searchKey}`);
    setIsLoading(false);
    if (!result.data.success) {
      toast.error("Check The Console!");
      console.error(
        "Something went wrong while searching for patients in the header search"
      );
      return;
    }

    setPatients(result.data.result);
  };

  useEffect(() => {
    searchForPatients();
  }, [searchKey]);

  useEffect(() => {
    let body = document.getElementById("body");
    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);

  return (
    <div className="w-full h-full" id="nav-search-container">
      <MainSearchInput
        state={searchKey}
        setState={setSearchKey}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          e.target.select(0, e.target.value.length);
          setMenuVisible(true);
        }}
      />
      {menuVisible && searchKey && (
        <HeaderResult
          patients={patients}
          isLoading={isLoading}
          close={() => setMenuVisible(false)}
        />
      )}
    </div>
  );
}

export default HeaderSearch;
