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

export async function getMyMemberShip(token) {
    const supabase = await supabaseClient(token)
    const {data, error} = await supabase.from('Memberships').select('*')
    if(error){
        console.error("Error getting membership data")
        return null
    }
    return data
}

export async function getMyTrialInfo(token) {
    const supabase = await supabaseClient(token)
    const {data, error} = await supabase.from('trials').select('*')
    if(error){
        console.error("Error getting trials data")
        return null
    }
    return data
}
