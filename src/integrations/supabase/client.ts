
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wwiygfjkbjfvvppubwuf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aXlnZmprYmpmdnZwcHVid3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNzQyNzEsImV4cCI6MjA1Mjk1MDI3MX0.W88INA6uNqwng_v5U705UBX198xJbtkPcFhtLZagPqI";

// Clear any existing sessions before creating the client
try {
  localStorage.removeItem('sb-wwiygfjkbjfvvppubwuf-auth-token');
} catch (error) {
  console.error('Error clearing localStorage:', error);
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-wwiygfjkbjfvvppubwuf-auth-token'
  }
});
