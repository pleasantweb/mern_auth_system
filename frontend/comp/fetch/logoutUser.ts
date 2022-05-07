import axios from 'axios'
axios.defaults.withCredentials = true;

export const logoutUser = async()=>{
    try{
    const url= process.env.NEXT_PUBLIC_BACKEND_URL
    const res = await axios(`${url}/logout`,{
        method:"GET"
    })
    if(res.status === 204){
        return true
    }
    
}catch(err){
    return false
}
   
}