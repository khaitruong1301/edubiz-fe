import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const root = window.document.documentElement;

    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);
  return [theme, setTheme];
};

export default useDarkMode;
