import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';

interface GlobalContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'pt' | 'es';
  changeLanguage: (lang: 'en' | 'pt' | 'es') => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  setUser: () => {},
  theme: 'light',
  toggleTheme: () => {},
  language: 'en',
  changeLanguage: () => {}
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const storedLanguage = (localStorage.getItem('language') as 'en' | 'pt' | 'es') || 'en';
  const [language, setLanguage] = useState<'en' | 'pt' | 'es'>(storedLanguage);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang: 'en' | 'pt' | 'es') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        pt: { translation: pt },
        es: { translation: es }
      },
      lng: language,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
  }, [language]);

  return (
    <GlobalContext.Provider value={{ user, setUser, theme, toggleTheme, language, changeLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};