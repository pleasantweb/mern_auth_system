import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Comp.module.scss'
import { logoutUser } from './fetch/logoutUser'
type propType = {
  isAuthenticated:boolean,
  setUserInfo:React.Dispatch<React.SetStateAction<{
              isAuthenticated: boolean;
              user: string;
              email: string;
          }>>
}
const Navbar = (props:propType) => {

  const {isAuthenticated,setUserInfo} = props
  const router = useRouter()

  const logout_user=async()=>{
     const logout = await logoutUser()
     if(logout){
       setUserInfo({
        isAuthenticated:false,
        user:"",
        email:""
       })
     }
  }

  return (
    <nav>
      <div onClick={()=>router.push('/')} className={styles.logo}>Webenviro</div>
      <ul>
        {isAuthenticated ? (<>
          <li onClick={logout_user}>logout</li>
        </>):(<>
          <li onClick={()=>router.push('/auth/login')}>login</li>
        <li onClick={()=>router.push('/auth/signup')}>signup</li>
        </>)}
       
        
      </ul>
    </nav>
  )
}

export default Navbar