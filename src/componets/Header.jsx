import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context,server } from '../main'
import axios from "axios" 
import toast from "react-hot-toast"

function Header() {

  const {isauthenticated,setisauthenticated,loading, setloading}=useContext(Context)

  
  const logouthandler = async (e)=>{
    setloading(true)
   try {
     await axios.get(`${server}/users/logout`,
       {
        withCredentials:true,
       }
    )

    toast.success("Logout Successfully")
    setisauthenticated(false)
    setloading(false)
    

   } catch (error) {
    toast.error("Something Went Wrong")
    console.log(error);
    setisauthenticated(true)
    setloading(false)
   }

}

  return (
<nav className='header'>
    <div>
    <h2>Todo App.</h2>
    </div>
    <article>
    <Link to={'/'}>Home </Link>
    <Link to={'/profile'}>Profile </Link>
    {
      isauthenticated ? <button disabled={loading} onClick={logouthandler}>Logout</button> :  <Link to={'/login'}>Log in </Link>
    }
    
    </article>
</nav>
  )
}

export default Header