import axios from 'axios'
axios.defaults.withCredentials = true;

export const verifyUser =async(accessToken:string,setUserInfoDetails:(isAuthenticated: boolean, user: string, email: string) => void)=>{
    try{
        const url= process.env.NEXT_PUBLIC_BACKEND_URL
        const res = await axios(`${url}/verify`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${accessToken}` 
            }
        })
        console.log(res);
        if(res.status === 200){
            const data =await res.data
            const {user,email} = data
            setUserInfoDetails(true,user,email)
            return true
        }else{
            return false
        }
    }catch(err){
        return false
    } 
}