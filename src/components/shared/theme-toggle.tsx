"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 text-gray-800 rounded-full"
        >
          <SunIcon
            className={`transition-all w-[1.4rem] h-[1.4rem] ${
              isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />
          <MoonIcon
            className={`absolute transition-all w-[1.4rem] h-[1.4rem] ${
              isDark ? "scale-100 rotate-0 " : "scale-0 rotate-90"
            }`}
          />

          <span className=" sr-only">toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className=" text-gray-700"
          onClick={() => setTheme("light")}
        >
          light
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" text-gray-700"
          onClick={() => setTheme("dark")}
        >
          dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" text-gray-700"
          onClick={() => setTheme("system")}
        >
          system
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
