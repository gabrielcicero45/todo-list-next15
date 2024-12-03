"use client";

import { useTheme } from "next-themes";
import React from "react";

function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 text-white dark:text-gray-800 px-4 py-2 text-2xl md:text-xl rounded-lg"
    >
      Toggle Mode
    </button>
  );
}

export default ToggleThemeButton;
