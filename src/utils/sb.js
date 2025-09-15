import { createClient } from "@supabase/supabase-js";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useMemo } from "react";

// Hook to get Supabase client
export const useSupabase = () => {
  const { siteConfig } = useDocusaurusContext();

  const supabaseUrl = siteConfig.customFields.supabaseUrl;
  const supabaseAnonKey = siteConfig.customFields.supabaseAnonKey;

  if(!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Supabase Anon Key is not set in the site config. Meaning you cannot use the supabase client.");
  }

  const supabase = useMemo(() => {
    return createClient(
      siteConfig.customFields.supabaseUrl,
      siteConfig.customFields.supabaseAnonKey
    );
  }, [
    siteConfig.customFields.supabaseUrl,
    siteConfig.customFields.supabaseAnonKey,
  ]);

  return supabase;
};
