import axios from 'axios'
axios.defaults.withCredentials = true;

export const refreshUser = async()=>{
    try{
    const url= process.env.NEXT_PUBLIC_BACKEND_URL
    const res = await axios(`${url}/refresh`,{
        method:"GET"
    })
    const data = await res.data
    console.log(data);
    return data
    }catch(err){
      return null
    }
}