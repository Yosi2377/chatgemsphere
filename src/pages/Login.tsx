import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ThemeProvider } from "next-themes";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
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
    </ThemeProvider>
  );
};

export default Login;
