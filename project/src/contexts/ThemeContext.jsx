import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    return savedTheme || 'dark'; // 👈 default set to 'dark'
  });

  const themes = {
    light: {
      name: 'Light',
      class: 'theme-light'
    },
    dark: {
      name: 'Dark',
      class: 'theme-dark'
    },
    food: {
      name: 'Food Delivery',
      class: 'theme-food'
    }
  };

  useEffect(() => {
    document.body.className = themes[theme].class;
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      themes,
      changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
