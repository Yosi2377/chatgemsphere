
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ThemeProvider } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Clear any existing sessions on mount
    const clearAndCheckSession = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error clearing session:', error);
          return;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session check error:', sessionError);
          return;
        }

        if (session) {
          navigate("/");
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast({
          title: "Authentication Error",
          description: "Please try again",
          variant: "destructive",
        });
      }
    };

    clearAndCheckSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to Yossi Chat
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
