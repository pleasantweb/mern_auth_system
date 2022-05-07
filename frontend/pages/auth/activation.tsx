import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../../comp/hoc/Layout';
import styles from '../../styles/Auth.module.scss'
import axios,{AxiosError} from 'axios'
axios.defaults.withCredentials = true;

const Activation = () => {

    const router = useRouter()
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [timerOn,setTimerOn] = useState(true)
    const [seconds,setSeconds] =  useState(120)
    const [code,setCode] = useState({
        first:"",
        second:"",
        third:"",
        forth:"",
        fivth:""
    })
    const {first,second,third,fivth,forth} = code

   useEffect(()=>{
      if(seconds > 0 && timerOn) {
          setTimeout(()=>{
              setSeconds(seconds - 1)
          },1000)
      }else{
          setTimerOn(false)
      }
   },[seconds,timerOn])
/////////////////////////////////////////////////////////////////////////////////
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            console.log(!isNaN(parseInt(e.target.value)));
            console.log(e);
            
            
        if(!isNaN(parseInt(e.target.value))){
            setCode(prev=>({
                ...prev,[e.target.name]:e.target.value
            }))
            if(e.target.name !== 'fivth'){
                if(e.target.nextSibling){
                    const zz:any = e.target.nextSibling
                    zz.focus()
                }
            }
        }else{
            setCode(prev=>({
                ...prev,[e.target.name]: ''
            }))
        }
        
    }
//////////////////////////////////////////////////////////////////////////////  
    const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const url= process.env.NEXT_PUBLIC_BACKEND_URL
        const stringCode = first + second + third + forth + fivth
        const activationCode = parseInt(stringCode)   
        const body = JSON.stringify({activationCode})

        try{
            const res = await axios(`${url}/activate`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                data:body,
               
            })
            
            
            setTimerOn(false)
            if(res.status === 200){
               router.push('/auth/login')
            }
        }catch(err){
            const errors = err as Error | AxiosError;
          console.log(err);
          if(!axios.isAxiosError(errors)){
            setError(true)
          setErrorMessage("Something went wrong")
            
          }else{
            setError(true)
            setErrorMessage("Wrong Confirmation code")
          }
         
        } 
    }
/////////////////////////////////////////////////////////////////////////////
const resendLink=async()=>{
   setTimerOn(true)
   setSeconds(120)
   const url= process.env.NEXT_PUBLIC_BACKEND_URL
   const res = await axios(`${url}/resendactive`,{
    method:"GET", 
})
console.log(res);

}
const cleanCode=()=>{
    setCode({
        first:"",
        second:"",
        third:"",
        forth:"",
        fivth:""
    })
}
//////////////////////////////////////////////////////////////////////////////
  return (
   <section className={styles.activation}>
       {error ? (
           <>
           <div className={styles.error}>
               <p>{errorMessage}</p>
           </div>
           </>
       ):('')}
       <div className={styles.activation_box}>
           <h1>Please Enter the confirmation code</h1>
           <form action="" onSubmit={onSubmit}>
               <div className={styles.row}>
                   <button onClick={cleanCode} className={styles.clean}>clean &#8594;</button>
                    <input autoFocus required autoComplete='off' type="text" onChange={onChange}  value={first} name="first"  maxLength={1} />
                    <input required autoComplete='off' type="text"  onChange={onChange} value={second} name="second"  maxLength={1} />
                    <input required autoComplete='off' type="text"  onChange={onChange} value={third} name="third"  maxLength={1} />
                    <input required autoComplete='off' type="text"  onChange={onChange} value={forth} name="forth"  maxLength={1} />
                    <input required autoComplete='off' type="text"  onChange={onChange}  value={fivth} name="fivth"  maxLength={1} />
               </div>
               <div className={styles.row}>
                   <input type="submit" value="send" />
                   {timerOn ? (
                   <>
                   <p> <span>link sent &#10004;</span> {seconds} </p>
                  
                   </>
                   ):(<button type='button' onClick={resendLink}>resend link ?</button>)}
                   
               </div>
               

           </form>
       </div>
   </section>
  )
}

export default Activation;
Activation.getLayout = function(page:ReactElement){
    return <Layout>{page}</Layout>
}