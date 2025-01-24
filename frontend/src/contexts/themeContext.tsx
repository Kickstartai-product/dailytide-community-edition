'use client';

import { createContext, ReactElement, useEffect, useState } from 'react';

// Create ThemeContext
const ThemeContext = createContext({
  isDarkTheme: true,
  // eslint-disable-next-line no-empty-function
  toggleThemeHandler: () => {},
});

type ThemePropsInterface = {
  children?: JSX.Element | Array<JSX.Element>;
};

export function ThemeContextProvider(props: ThemePropsInterface): ReactElement {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem('isDarkTheme');
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem('isDarkTheme', 'true');
      setIsDarkTheme(true);
    } else {
      const isDarkTheme: boolean = JSON.parse(
        localStorage.getItem('isDarkTheme')!,
      );
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem('isDarkTheme')!,
    );
    setIsDarkTheme(!isDarkTheme);
    setValueToLocalStorage();
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
