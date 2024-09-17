import supabaseClient from "@/utils/supabase";

export async function addNewTrial(token, _ , trialData) {
    const supabase = await supabaseClient(token)
    const {data ,error} = await supabase.from('trials').insert([trialData]).select()
    if(error){
        console.error("Error Creating trial")
        return null
    }
    return data
}