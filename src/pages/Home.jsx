import  axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import toast from "react-hot-toast"
import { Navigate } from 'react-router-dom'

import TodoItem from '../componets/TodoItem'
function Home() {

  const[title,settitle]=useState('')
  const[description,setdescription]=useState('')
  const [loading,setloading] = useState(false)
  const [tasks,settask] = useState([])
  const [refresh,setrefresh]=useState(false)


  const {isauthenticated}=useContext(Context)

 

  const updateHandler=async (id)=>{
  try {
     const {data} =await axios.put(`${server}/task/${id}`,{},{
      withCredentials:true
    })
    // console.log(data);
    toast.success(data.message)
    setrefresh(prev=> !prev)
  } catch (error) {
    toast.error(error.response.data.message)
  }
  }
  const deleteHandler=async (id)=>{
    try {
      const {data} =await axios.delete(`${server}/task/${id}`,{
       withCredentials:true
     })
     toast.success(data.message)
     setrefresh(prev=> !prev)
   } catch (error) {
     toast.error(error.response.data.message)
   }
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
     
    try {
      setloading(true)
      const {data} = await axios.post(`${server}/task/new`,
      {
        title,description
      },
      {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      toast.success(data.message)
      settitle("")
      setdescription("")
      setloading(false)
      setrefresh(prev=> !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setloading(false)

    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/mytask`,{
      withCredentials:true
    }).then(res =>{
      
      settask(res.data.tasks)
    }).catch(e=>{
     toast.error(e.message);
    })
  },[refresh])

  if(!isauthenticated) return <Navigate to={'/login'}/>
  return (
    <div className='container'>

<div className='login'>
        <section>
            <form onSubmit={submitHandler}>
            <input 
            type="text"
            value={title} 
            required onChange={(e)=> settitle(e.target.value)} 
            placeholder='Title'
             />
            <input 
            type="text"
            value={description} 
            required onChange={(e)=> setdescription(e.target.value)} 
            placeholder='Description'
             />
               
                <button disabled={loading} type='submit'>
                    Add Task
                </button>
               
            </form>
        </section>
    </div>
      <section className='todosContainer'>
    {
      tasks.map(task=>(
        <TodoItem title={task.title} description={task.description} iscompleted={task.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={task._id} key={task._id}/>
      ))
    }
      </section>
    </div>
  )
}

export default Home