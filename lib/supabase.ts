import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ─────────────────────────────────────────────────────────────────────

export type WaitlistEntry = {
  id?: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
};

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  role: string;
  message?: string;
  created_at?: string;
};

export type PageAnalytics = {
  id?: string;
  page: string;
  referrer?: string;
  user_agent?: string;
  country?: string;
  created_at?: string;
};

// ── Waitlist ──────────────────────────────────────────────────────────────────

export async function addToWaitlist(entry: WaitlistEntry) {
  const { data, error } = await supabase
    .from("waitlist")
    .insert([entry])
    .select()
    .single();

  if (error) {
    // Handle duplicate email gracefully
    if (error.code === "23505") {
      return {
        data: null,
        error: { message: "This email is already on the waitlist!" },
      };
    }
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getWaitlistCount() {
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return { count: count ?? 0, error };
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function submitContact(entry: ContactSubmission) {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([entry])
    .select()
    .single();

  return { data, error };
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export async function trackPageView(page: string) {
  const entry: PageAnalytics = {
    page,
    referrer:
      typeof document !== "undefined"
        ? document.referrer || "direct"
        : "direct",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };

  const { error } = await supabase.from("page_analytics").insert([entry]);

  return { error };
}
