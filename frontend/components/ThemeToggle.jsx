"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { set } from "date-fns";

export function ThemeToggle() {
  const localStorage = window.localStorage;
  const { theme } = useTheme();

  const [themeColor, setThemeColor] = useState(() => {
    const storedThemeColor = localStorage.getItem("themeColor");
    return storedThemeColor ? storedThemeColor : "var(--color-one)";
  });

  const [themeLightColor, setThemeLightColor] = useState(() => {
    const storedThemeLightColor = localStorage.getItem("themeLightColor");
    return storedThemeLightColor
      ? storedThemeLightColor
      : "var(--color-one-light)";
  });

  const [themehsl, setThemehsl] = useState(() => {
    const storedThemeHSLColor = localStorage.getItem("themehsl");
    return storedThemeHSLColor ? storedThemeHSLColor : "238.8, 100%, 70.59%";
  });

  const changeColor = (theme, themeLight, themehsl) => {
    setThemeColor(theme);
    setThemeLightColor(themeLight);
    setThemehsl(themehsl);
    localStorage.setItem("themeColor", theme);
    localStorage.setItem("themeLightColor", themeLight);
    localStorage.setItem("themehsl", themehsl);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--theme", themeColor);
    document.documentElement.style.setProperty(
      "--theme-light",
      themeLightColor
    );
    document.documentElement.style.setProperty("--primary", themehsl);
    document.documentElement.style.setProperty("--ring", themehsl);
  }, [themeColor, themeLightColor, themehsl]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--theme", themeLightColor);
      document.documentElement.style.setProperty("--theme-light", themeColor);
    } else {
      document.documentElement.style.setProperty("--theme", themeColor);
      document.documentElement.style.setProperty(
        "--theme-light",
        themeLightColor
      );
    }
  }, [theme, themeColor, themeLightColor, themehsl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full p-2 hover:bg-themebackground">
          <div className="rounded-full bg-theme w-5 h-5"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="flex justify-center gap-x-1.5 py-2"
      >
        <div
          className="rounded-full bg-colorOne w-5 h-5"
          onClick={() =>
            changeColor(
              "var(--color-one)",
              "var(--color-one-light)",
              "var(--color-one-hsl)"
            )
          }
        ></div>
        <div
          className="rounded-full bg-colorTwo w-5 h-5"
          onClick={() =>
            changeColor(
              "var(--color-two)",
              "var(--color-two-light)",
              "var(--color-two-hsl)"
            )
          }
        ></div>
        <div
          className="rounded-full bg-colorThree w-5 h-5"
          onClick={() =>
            changeColor(
              "var(--color-three)",
              "var(--color-three-light)",
              "var(--color-three-hsl)"
            )
          }
        ></div>
        <div
          className="rounded-full bg-colorFour w-5 h-5"
          onClick={() =>
            changeColor(
              "var(--color-four)",
              "var(--color-four-light)",
              "var(--color-four-hsl)"
            )
          }
        ></div>
        <div
          className="rounded-full bg-colorFive w-5 h-5"
          onClick={() =>
            changeColor(
              "var(--color-five)",
              "var(--color-five-light)",
              "var(--color-five-hsl)"
            )
          }
        ></div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
