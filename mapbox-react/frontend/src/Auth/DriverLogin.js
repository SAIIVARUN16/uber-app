import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DriverLogin = () => {
  const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if( email && password ){
            const res = await axios.post('http://localhost:5000/driverlogin',{
                email:email,
                password:password
            })
            const id = res.data
            if(res.status === 200 ){
                navigate(`/waitingDriver/${id}`)
            } else{
                navigate('/register')
            }
        }
    }
  return (
    <div>
      DriverLogin
      <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label>Password</label>
            <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default DriverLogin