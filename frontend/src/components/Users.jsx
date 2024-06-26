import React, { useState, useEffect } from 'react'
import axios from 'axios'
import User from './User'
import { BACKEND_URL } from "../config"
import Skeleton from './Skeleton'
const Users = () => {


  
  
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
       axios.get(`${BACKEND_URL}/api/v1/users/bulk?filter=${filter}`)
        .then(response => {
          setUsers(response.data.user)
           setLoading(false);
        
         
        })
  }, [filter])


  if (loading)
  {
    return (
      <div>
       
        
        <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input onChange={(e) => setFilter(e.target.value)} type='text' placeholder='search Users...' className='w-full px-2  py-1 rounded border border-slate-200'></input>
      </div>
        <div>
        <Skeleton />
        <Skeleton />
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton />
       
      </div>
    </div>
    
    )
    }
  
  


    

  return (
    <div>
      
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input onChange={(e) => setFilter(e.target.value)} type='text' placeholder='search Users...' className='w-full px-2  py-1 rounded border border-slate-200'></input>
      </div>
      <div>
        {users.map(user => <User user={user} key={user._id}/>)}
      </div>
    </div>
  )
}

export default Users