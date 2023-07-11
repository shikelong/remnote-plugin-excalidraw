import { useEffect, useState } from 'react';
import { THEME } from '../constants';

function getCurrentTheme(): THEME {
  if (document.body.classList.contains('light')) {
    return 'light';
  }
  return 'dark';
}

export function usePreferTheme(): THEME {
  const [theme, setTheme] = useState(() => getCurrentTheme());

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setTheme(getCurrentTheme());
        }
      }
    });
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
}
