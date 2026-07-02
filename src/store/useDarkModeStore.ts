import { createStore } from 'zustand';

export type Theme = 'light' | 'dark';

export type State = {
  theme: Theme;
  mode: 'system' | 'manual'
}

type Action = {
  setManualTheme: (theme: Theme) => void;
  setSystemTheme: (theme: Theme) => void;
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const root = document.documentElement;

  if (root.classList.contains('dark')) {
    return 'dark';
  }

  if (root.classList.contains('light')) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const darkModeStore = createStore<State & Action>((set, get) => ({
  mode: 'system',
  theme: get()?.mode === 'manual' ? get().theme ?? 'light' : getSystemTheme(),
  setManualTheme: (theme) => set({ theme, mode: 'manual' }),
  setSystemTheme: (theme) => set({ theme, mode: 'system' }),
}));
