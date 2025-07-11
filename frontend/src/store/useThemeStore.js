import {create} from 'zustand';
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "cupcake", // default theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({theme});
  }, // function to update the theme
}));