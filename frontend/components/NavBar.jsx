"use client";
import { AlignLeft, Search, User } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";
import Notification from "./Notification";


import useSliderToggler from "@/store/slider-toggle";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import { LanguageToggler } from "./LanguageToggler";

const NavBar = () => {
  const { isOpen, setIsOpen } = useSliderToggler();

  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && event.ctrlKey) {
      console.log("Ctrl + / pressed");
    }
  });

  const handleSearch = () => {};

  return (
    <>
      <nav className="px-0 md:px-5 bg-themeforeground overflow-hidden shadow-lg flex items-center justify-between mt-2 mb-4 rounded-md h-[64px] w-full max-w-[calc(1440px-3rem)] ">
        <div className="flex items-center gap-x-1">
          <div className="block  rounded-full p-2 hover:bg-themebackground">
            <AlignLeft
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div className="rounded-full p-2 hover:bg-themebackground">
            <Search className="cursor-pointer" onClick={handleSearch} />
          </div>
          <span
            className="text-textlight cursor-pointer hidden md:block"
            style={{ color: "rgb(177, 185, 193)" }}
            onClick={handleSearch}
          >
            Search (Ctrl+/)
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <Notification />
          <ThemeToggle />
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <User/>
            </SignInButton>
          </SignedOut>
        </div>
   
      </nav>
    </>
  );
};

export default NavBar;
