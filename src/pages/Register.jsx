import React, { useContext, useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import {Context, server} from "../main"
import axios from "axios" 
import toast from "react-hot-toast"

function Register() {

    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const {isauthenticated,setisauthenticated,loading, setloading}=useContext(Context)

    const submitHandler = async (e)=>{
        e.preventDefault();
        setloading(true)
       try {
        const {data} = await axios.post(`${server}/users/new`,{
            name,
            email,
            password
           },
           {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
           }
        )
    
        toast.success(data.message)
        setisauthenticated(true)
        setloading(false)
       } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
        setisauthenticated(false)
        setloading(false)
       }

    }

    if(isauthenticated) return <Navigate to={'/'}/>
  return (
    <div className='login'>
        <section>
            <form  onSubmit={submitHandler}>
                <input value={name} required onChange={(e)=> setname(e.target.value)} type="text" placeholder='name' />
                <input value={email} required onChange={(e)=> setemail(e.target.value)} type="email" placeholder='Email' />
                <input value={password} required onChange={(e)=> setpassword(e.target.value)} type="password" placeholder='password' />
                <button type='submit' disabled={loading}>
                    Sign Up
                </button>
                <h4>Or</h4>
                <Link to='/login'>Log In</Link>
            </form>
        </section>
    </div>
  )
}

export default Register