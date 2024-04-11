import React, { useContext } from 'react'
import { Context } from '../main';
import LOader from '../componets/LOader';

const Profile = () => {
  const {isauthenticated,loading,user}=useContext(Context)
   console.log(user);
  return (
    loading ? <LOader/> : (<div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>)
  )
}

export default Profile