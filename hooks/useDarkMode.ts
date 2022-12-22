import { useEffect, useState } from 'react';

export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChangeDarkMode = (event: MediaQueryListEvent) => {
    console.log('handleChangeDarkMode', event);

    setIsDarkMode(event.matches);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    setIsDarkMode(matchMedia.matches);

    matchMedia.onchange = handleChangeDarkMode;
  }, []);

  return isDarkMode;
}
