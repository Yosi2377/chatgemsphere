
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dakqepwfavixwvybqtzx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRha3FlcHdmYXZpeHd2eWJxdHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDU1MTAsImV4cCI6MjA0OTYyMTUxMH0.kME8GzfeRAhLX9vc963aGS8M-erHrA09VTf0hc1loCQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
    storage: {
      getItem: (key) => {
        try {
          const itemStr = localStorage.getItem(key);
          if (!itemStr) return null;
          return JSON.parse(itemStr);
        } catch (error) {
          console.error('Error reading from localStorage:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Error writing to localStorage:', error);
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error removing from localStorage:', error);
        }
      },
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
    fetch: (url: RequestInfo | URL, options?: RequestInit) => {
      const fetchOptions: RequestInit = {
        ...options,
        headers: {
          ...options?.headers,
          'Content-Type': 'application/json',
        },
      };
      
      return fetch(url, fetchOptions).catch(error => {
        console.error('Supabase fetch error:', error);
        throw error;
      });
    },
  },
});
