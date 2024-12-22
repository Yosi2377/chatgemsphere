import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <Button onClick={toggleTheme} className="dark-mode-toggle" data-testid="dark-mode-toggle">
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
