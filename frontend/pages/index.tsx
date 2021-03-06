import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import Layout, { userContextHook } from '../comp/hoc/Layout'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user} = currenetUser
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Express Next Auth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>MERN JWT Auth system with httpOnly Cookie.</h1>
        <h2>Express Js, Next Js and MongoDB</h2>
        <h2>(Activate User with Confirmation Code)</h2>
        {isAuthenticated ? (
        <>
         <h3>Welcome {user}</h3>
        </>
        ):(<>
            <h3>Please Sign In to continue</h3>
             <button onClick={()=>router.push('/auth/login')}>Sign In</button>
        </>)
        }
      </main>

      
    </>
  )
}

export default Home;
Home.getLayout = function getLayout(page:ReactElement){
  return <Layout>{page}</Layout>
}
