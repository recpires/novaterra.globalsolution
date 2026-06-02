import React, { createContext, useContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const C = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    document.body.style.backgroundColor = C.bg;
    document.body.style.color = C.txt;
  }, [isDark, C.bg, C.txt]);

  return (
    <ThemeContext.Provider value={{ C, isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
