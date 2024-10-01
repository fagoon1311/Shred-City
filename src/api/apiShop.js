import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using import.meta.env for Vite
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getProducts(_,{ chosenCategory }) {
  // const { data, error } = await supabase.from('products').select('*, category:categories(category_name)');
  let query = supabase.from('products').select('*, category:categories(category_name)')

  if(chosenCategory && chosenCategory !== 'All Products') {
    query = query.eq('category.category_name', chosenCategory);
    
  }


  const {data, error} = await query
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

export async function getSingleProduct(_,{product_id}){
  console.log("Api called")
  const {data, error} = await supabase.from('products').select('*').eq('id', product_id).single()
  if(error){
    console.error("Error getting product information.", error)
    return null
  }
  console.log(data)
  return data
}
