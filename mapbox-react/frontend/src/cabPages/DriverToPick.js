import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DriverToPick = () => {
    const driverId = (useLocation().pathname).split('/')[2]
    const [rideCancel,setRideCancel]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        const checkConfirmRide = async() => {
            const res = await axios.post('http://localhost:5000/checkConfirmRide',{
                driverId:driverId
            })
            if(res.data==="ride is not active"){
                setRideCancel(true)
            }
        }
        checkConfirmRide()
    },[])
    useEffect(()=>{
        if(rideCancel===true){
            navigate(`/waitingDriver/${driverId}`)
        }
    },[rideCancel])
    return (
        <div>DriverToPick</div>
    )
}

export default DriverToPick