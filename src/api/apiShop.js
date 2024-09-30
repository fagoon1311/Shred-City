import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using import.meta.env for Vite
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getProducts(_,{ chosenCategory }) {
  // const { data, error } = await supabase.from('products').select('*, category:categories(category_name)');
  let query = supabase.from('products').select('*, category:categories(category_name)')
  console.log(chosenCategory)

  if(chosenCategory && chosenCategory !== 'All Products') {
    query = query.eq('category.category_name', chosenCategory);
    console.log(query)
  }


  const {data, error} = await query
  console.log("New Products Data--", data)
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
