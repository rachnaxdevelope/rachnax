"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/supabase";

export function usePageAnalytics(page: string = "/") {
  useEffect(() => {
    // Track page view on mount
    trackPageView(page);
  }, [page]);
}
