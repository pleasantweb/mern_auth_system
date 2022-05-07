import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react'
import Layout from '../../comp/hoc/Layout';
import styles from '../../styles/Auth.module.scss'
import axios from 'axios'
axios.defaults.withCredentials = true;

const Signup = () => {
    const router = useRouter()
    const [formValue,setFormValue] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        re_password:""
    })
    const {first_name,last_name,email,password,re_password}=formValue
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValue(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
    }
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const url= process.env.NEXT_PUBLIC_BACKEND_URL
        const body = JSON.stringify({first_name,last_name,email,password})

        const res = await axios(`${url}/register`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            data:body,
            // withCredentials:true
        })
        //  fetch(`${url}/register`,{
        //     method:"POST",
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:body,
        //     credentials: 'include'
        //     // Credential
        // })
        console.log(res);
        if(res.status === 201){
            router.push('/auth/activation')
        }
        // console.log(formValue);
        
    }
  return (
    <section className={styles.signup}>
        <h1>Sign Up</h1>
      <form action="" onSubmit={onSubmit}>
          <div className={styles.row}>
              <div className={styles.column}>
                  <label htmlFor="first_name">First Name</label>
                  <input onChange={onChange} value={first_name} type="text" name="first_name" id="first_name" />
              </div>
              <div className={styles.column}>
                  <label htmlFor="last_name">Last Name</label>
                  <input onChange={onChange} value={last_name} type="text" name="last_name" id="last_name" />
              </div>
          </div>
          <div className={styles.row}>
          <div className={styles.full_column}>
              <label htmlFor="email_id">Email</label>
              <input onChange={onChange} value={email} type="email" name="email" id="email_id" />
              </div>
          </div>
          <div className={styles.row}>
              <div className={styles.column}>
                  <label htmlFor="password">Password</label>
                  <input onChange={onChange} value={password} type="password" name="password" id="password" />
              </div>
              <div className={styles.column}>
                  <label htmlFor="re_password">Password Confirm</label>
                  <input onChange={onChange} value={re_password} type="password" name="re_password" id="re_password" />
              </div>
          </div>
          <div className={styles.row}>
              <input type="submit" value="Sign Up" />
              <div className={styles.options}>
              <p>Already a user ?</p>
              <button onClick={()=>router.push('/auth/login')} className={styles.btn} type='button'>Sign In</button>
          </div>
          </div>
         
      </form>
    </section>
  )
}

export default Signup;

Signup.getLayout = function getLayout(page:ReactElement){
    return <Layout>{page}</Layout>
}