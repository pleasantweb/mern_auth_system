import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useState } from 'react'
import Layout, { userContextHook } from '../../comp/hoc/Layout';
import styles from '../../styles/Auth.module.scss'
import axios from 'axios'
import { verifyUser } from '../../comp/fetch/verifyUser';
axios.defaults.withCredentials = true;

const Login = () => {
    
    const currenetUser = useContext(userContextHook)
    const {setUserInfoDetails} = currenetUser
    const router = useRouter()
    const [formValue,setFormValue] = useState({
        email:"",
        password:"",
    })
    const {email,password}=formValue
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValue(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
    }
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formValue);
        const url= process.env.NEXT_PUBLIC_BACKEND_URL
        const body = JSON.stringify({email,password})
        const res = await axios(`${url}/auth`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            data:body,
        })
        console.log(res);
        const data = await res.data
        console.log(data);
        const {roles,accessToken} = data
        const getuser = await verifyUser(accessToken,setUserInfoDetails)
        
        if(getuser){
            router.push('/')
        }
        
        
    }
  return (
    <section className={styles.login}>
        <h1>Sign In</h1>
      <form action="" onSubmit={onSubmit}>
          
          <div className={styles.row}>
          <div className={styles.full_column}>
              <label htmlFor="email_id">Email</label>
              <input onChange={onChange} value={email} type="email" name="email" id="email_id" />
              </div>
          </div>
          <div className={styles.row}>
              <div className={styles.full_column}>
                  <label htmlFor="password">Password</label>
                  <input onChange={onChange} value={password} type="password" name="password" id="password" />
              </div>
          </div>
          <div className={styles.row}>
              <input type="submit" value="Sign In" />
              <div className={styles.options}>
              <p>Not a user ?</p>
              <button className={styles.btn} onClick={()=>router.push('/auth/signup')} type='button'>Sign Up</button>
          </div>
          </div>
          
      </form>
    </section>
  )
}

export default Login;

Login.getLayout = function getLayout(page:ReactElement){
    return <Layout>{page}</Layout>
}