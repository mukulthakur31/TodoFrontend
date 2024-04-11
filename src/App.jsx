import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"
import Home from "./pages/Home"
import Header from "./componets/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {Toaster} from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios" 
import {Context, server} from "./main"

function App() {
 const {setuser ,setisauthenticated,setloading} =useContext(Context)
  useEffect(()=>{
    setloading(true)
       axios.get(`${server}/users/me`,{
        withCredentials:true
       })
       .then(res => {
        console.log(res);
        setuser(res.data.user)
        setisauthenticated(true)
        setloading(false)
     }).catch(()=>{
      setuser(null)
      setisauthenticated(false)
      setloading(false)
     })
  },[])


  


  
  return <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    <Toaster/>
  </Router>
}

export default App
