import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={toggleTheme} className="ml-4">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
