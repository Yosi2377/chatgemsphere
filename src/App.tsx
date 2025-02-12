import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { ThemeProvider } from "next-themes";
import DarkModeToggle from "@/components/DarkModeToggle";
import APIPage from "./pages/APIPage";
import DocAPIPage from "./pages/DocAPIPage";
import { useToast } from "./components/ui/use-toast";
import { setLocale, isLocaleAvailable, t } from "./i18n";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {  { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session error:', error);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(!!session);
        setIsLoading(false);

        const {  { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setIsAuthenticated(!!session);
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth error:', error);
        toast({
          title: "Authentication Error",
          description: "Please try logging in again",
          variant: "destructive",
        });
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const [isHebrew, setIsHebrew] = useState(false);

  useEffect(() => {
    setIsHebrew(isLocaleAvailable('he'));
  }, []);

  const handleTranslateToHebrew = () => {
    setLocale('he');
    setIsHebrew(true);
  };

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <DarkModeToggle />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex justify-end p-4">
              {isHebrew && (
                <Button onClick={handleTranslateToHebrew} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {t('Translate to Hebrew')}
                </Button>
              )}
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route path="/api" element={<APIPage />} />
              <Route path="/doc-api" element={<DocAPIPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
