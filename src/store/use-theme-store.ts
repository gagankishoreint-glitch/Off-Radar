import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
            setTheme: (theme) => set({ theme })
        }),
        {
            name: 'theme-storage'
        }
    )
);

// Hook to apply theme to document
export function useTheme() {
    const { theme, toggleTheme, setTheme } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return { theme, toggleTheme, setTheme };
}
