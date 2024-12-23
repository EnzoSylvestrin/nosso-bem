'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SiteConfig = {
    theme: 'light' | 'dark';
    useAi: boolean;
    randomChances: {
        HOT: number;
        COUPLE: number;
        INDIVIDUAL: number;
    }
}

interface ConfigContextProps {
    config: SiteConfig;
    setConfig: (newConfig: Partial<SiteConfig>) => void;
}

const defaultConfig: SiteConfig = {
    theme: 'light',
    useAi: false,
    randomChances: {
        HOT: 0.33,
        COUPLE: 0.33,
        INDIVIDUAL: 0.33,
    }
};

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfigState] = useState<SiteConfig>(() => {
        const savedConfig = localStorage ? localStorage.getItem('siteConfig') : null;
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
