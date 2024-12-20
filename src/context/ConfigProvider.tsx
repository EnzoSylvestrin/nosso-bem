'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteConfig {
  theme: 'light' | 'dark';
  language: 'en' | 'pt';
}

interface ConfigContextProps {
  config: SiteConfig;
  setConfig: (newConfig: Partial<SiteConfig>) => void;
}

const defaultConfig: SiteConfig = {
  theme: 'light',
  language: 'en',
};

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<SiteConfig>(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  });

  const setConfig = (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfigState(updatedConfig);
    localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      setConfigState(JSON.parse(savedConfig));
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
