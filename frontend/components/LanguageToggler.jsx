"use client";
import * as React from "react";
import { Languages, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalization } from "@sujalchoudhari/localization";

export function LanguageToggler() {
  const { currentLanguage, changeLanguage } = useLocalization();

  React.useEffect(() => {
    changeLanguage(0);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full p-2 hover:bg-themebackground">
          <Languages />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage(0)}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage(1)}>
          Hindi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage(2)}>
          Marathi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
