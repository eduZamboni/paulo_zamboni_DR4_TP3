import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';

type ThemeType = 'light' | 'dark' | 'system';
type LangType = 'en' | 'pt' | 'es';

interface GlobalContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  theme: ThemeType;
  toggleTheme: () => void;
  language: LangType;
  changeLanguage: (lang: LangType) => void;
  setThemeMode: (mode: ThemeType) => void; 
}

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  setUser: () => {},
  theme: 'system',
  toggleTheme: () => {},
  language: 'en',
  changeLanguage: () => {},
  setThemeMode: () => {}
});

const storedLang = (localStorage.getItem('language') as LangType) || 'en';
const storedTheme = (localStorage.getItem('themeMode') as ThemeType) || 'system';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es }
    },
    lng: storedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  
  const [language, setLanguage] = useState<LangType>(storedLang);
  
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const [theme, setTheme] = useState<ThemeType>(storedTheme);

  const toggleTheme = () => {
    setTheme((prev) => {
      let newTheme: ThemeType;
      if (prev === 'light') {
        newTheme = 'dark';
      } else if (prev === 'dark') {
        newTheme = 'system';
      } else {
        newTheme = 'light';
      }
      if (newTheme !== 'system') {
        localStorage.setItem('themeMode', newTheme);
      } else {
        localStorage.removeItem('themeMode');
      }
      return newTheme;
    });
  };

  const changeLanguage = (lang: LangType) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const setThemeMode = (mode: ThemeType) => {
    setTheme(mode);
    if (mode === 'system') {
      localStorage.removeItem('themeMode');
    } else {
      localStorage.setItem('themeMode', mode);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setTheme('system'); 
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return (
    <GlobalContext.Provider value={{ user, setUser, theme, toggleTheme, language, changeLanguage, setThemeMode }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};