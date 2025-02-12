
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dakqepwfavixwvybqtzx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRha3FlcHdmYXZpeHd2eWJxdHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDU1MTAsImV4cCI6MjA0OTYyMTUxMH0.kME8GzfeRAhLX9vc963aGS8M-erHrA09VTf0hc1loCQ";

// Clear any existing sessions before creating the client
try {
  localStorage.removeItem('sb-dakqepwfavixwvybqtzx-auth-token');
} catch (error) {
  console.error('Error clearing localStorage:', error);
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-dakqepwfavixwvybqtzx-auth-token'
  }
});
