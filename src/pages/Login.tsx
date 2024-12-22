import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from 'next-themes';

const Login = () => {
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setTheme(resolvedTheme);
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, [resolvedTheme, setTheme]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to AI Chat
          </h1>
          <p className="text-muted-foreground">Sign in or create an account to continue</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg border">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
        <div className="flex justify-center mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Login;
