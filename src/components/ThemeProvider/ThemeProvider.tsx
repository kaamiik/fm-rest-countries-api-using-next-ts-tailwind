"use client";
import * as React from "react";

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState(initialTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const data = React.useContext(ThemeContext);

  if (!data) {
    throw new Error("Cannot consume Theme context without a ThemeProvider");
  }

  return data;
}

export default ThemeProvider;
