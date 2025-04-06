"use client";
import { create } from "zustand";

const defaultValues = {
  isOpen: false,
};

const useSliderToggler = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
  expanded: () => {
    const storedOpen = localStorage.getItem("sidebarOpen");
    return storedOpen ? JSON.parse(storedOpen) : false;
  },
  setExpanded: (expanded) => {
    localStorage.setItem("sidebarOpen", JSON.stringify(expanded));
    set({ expanded });
  },
}));

export default useSliderToggler;
