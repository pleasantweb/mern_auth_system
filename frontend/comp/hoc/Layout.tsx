import React, { createContext, useEffect, useState } from 'react'
import styles from '../.././styles/Comp.module.scss'
import { refreshUser } from '../fetch/refreshUser';
import { verifyUser } from '../fetch/verifyUser';
import Navbar from '../Navbar'

type Props = {
    children?: React.ReactNode;
};
type userContext ={
  isAuthenticated:boolean,
  user:string,
  email:string,
  setUserInfoDetails:(isAuthenticated:boolean,user:string,email:string)=>void
}
const demoContext ={
  isAuthenticated:false,
  user:"",
  email:"",
  setUserInfoDetails:()=>{}
}
export const userContextHook = createContext<userContext>(demoContext)

const Layout = ({children}:Props) => {

  const [userInfo,setUserInfo] = useState({
    isAuthenticated:false,
    user:"",
    email:""
  })
  const {isAuthenticated,user,email} = userInfo

  function setUserInfoDetails(isAuthenticated:boolean,user:string,email:string){
    setUserInfo({
      isAuthenticated:isAuthenticated,
      user:user,
      email:email
    })
  }

  const userContextValue:userContext = {
    isAuthenticated:isAuthenticated,
    user:user,
    email:email,
    setUserInfoDetails:(isAuthenticated:boolean,user:string,email:string)=>setUserInfoDetails(isAuthenticated,user,email)
  }

  
  useEffect(()=>{
    const getUser=async()=>{
      const data = await refreshUser()
      if(data){
        const {roles,accessToken} = data
        await verifyUser(accessToken,setUserInfoDetails)
        console.log(data);
      }
     
    }
    if(!isAuthenticated){
      getUser()
    }
  },[isAuthenticated])

  return (
    <div className={styles.site_container}>
      <userContextHook.Provider value={userContextValue}>
        <Navbar isAuthenticated={isAuthenticated} setUserInfo={setUserInfo}  />
        {children}
        </userContextHook.Provider>
    </div>
  )
}

export default Layout