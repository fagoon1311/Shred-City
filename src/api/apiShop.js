import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using import.meta.env for Vite
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    console.error("Error fetching Categories:", error.message);
    return null;
  }

  return data;
}
