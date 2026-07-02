export const applyTheme = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
};