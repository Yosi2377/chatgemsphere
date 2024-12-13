import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(resolvedTheme);
  }, [resolvedTheme, setTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
