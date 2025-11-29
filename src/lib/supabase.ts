import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "WIP" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskInput = Omit<Task, "id" | "created_at" | "updated_at">;
