import { createClient } from '@supabase/supabase-js';
import supabaseClient from "@/utils/supabase";


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
  const {data, error} = await supabase.from('products').select('*').eq('id', product_id).single()
  if(error){
    console.error("Error getting product information.", error)
    return null
  }
  console.log(data)
  return data
}

export async function addToCart(token, _, itemData){
  const supabase = await supabaseClient(token)
  const {data ,error} = await supabase.from('Cart').insert([itemData]).select()
    if(error){
        console.error("Error Adding items in cart")
        return null
    }
    return data
}

export async function getCart(token,{ userId }){
  const supabase = await supabaseClient(token)
  const {data, error} = await supabase.from('Cart').select('*').eq('user_id', userId)
  if(error){
    console.error('Error fetching cart items')
    return null
  }
  return data
}

export async function removeItemFromCart(token,{ cartItemId }) {
  const supabase = await supabaseClient(token)
  const {data, error} = await supabase.from('Cart').delete().eq('id', cartItemId).select()
  if(error){
    console.error("Error Deleting item:", error)
    return null
  }
  return data

}

export async function addToOrders(token,_,orderData){
  const supabase = await supabaseClient(token)
  const {data, error} = await supabase.from('Orders').insert([orderData]).select()
  if(error){
    console.error("Error Placing Order:", error)
    return null
  }
  return data
}

export async function emptyCart(token, {userId}){
  const supabase = await supabaseClient(token)
  const {data, error} = await supabase.from('Cart').delete().eq('user_id', userId).select()
  if(error){
    console.error("Error clearing cart for user:", error)
    return null
  }
  return data
}