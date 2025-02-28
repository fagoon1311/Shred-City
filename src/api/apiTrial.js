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

export async function addNewMembership(token, _ , memData) {
    const supabase = await supabaseClient(token)
    const {data ,error} = await supabase.from('Memberships').insert([memData]).select()
    if(error){
        console.error("Error Uploading membership data")
        return null
    }
    return data
}


export async function getMyMemberShip(token, {userId}) {
    console.log("Running getmemeb")
    const supabase = await supabaseClient(token)
    const {data, error} = await supabase.from('Memberships').select('*').eq('user_id', userId)
    if(error){
        console.error("Error getting membership data")
        return null
    }
    console.log("Current membership data from api",data)
    return data
}

export async function getMyTrialInfo(token, {userId}) {
    console.log("Running getmytri")


    const supabase = await supabaseClient(token)
    const today = new Date().toISOString().split('T')[0]
    const {data, error} = await supabase.from('trials').select('*').eq('trial_id', userId).gt('expires_on', today)
    if(error){
        console.error("Error getting trials data")
        return null
    }  
    console.log("Trial data returned from api",data)
    return data
}
