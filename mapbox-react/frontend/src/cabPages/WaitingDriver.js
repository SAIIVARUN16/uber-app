import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const WaitingDriver = () => {
    const location = useLocation()
    const id=(location.pathname).split('/')[2]
    const [gotRide,setGotRide] =useState(false)
    const [ride,setRide] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const checkForUser = async () => {
            const res = await axios.post('http://localhost:5000/checkForUser',{
                driverId:id
            })
            if((res.data).driverId===id){
                setGotRide(true)
                setRide(res.data)
            }else if((res.data).driverId===""){
                setGotRide(false)
            }
        }
        checkForUser()
    },[])
    const handleAccept = async () => {
        const res = await axios.post('http://localhost:5000/driverAccepted',{
            driverId:id,
            userId:ride.userId
        })
        if(res.data === 'ok'){
            navigate(`/driverToPick/${id}`)
        }
    }
    const handleDecline = async () => {
        const res = await axios.post('http://localhost:5000/driverdeclined',{
            driverId:id
        })
        if(res.data === 'ok'){
            gotRide(false)
        }
    }
    return (
        <div>
            <p>Map Component</p>
            {
                !gotRide && <div>No Customers...</div>
            }{
                gotRide && 
                <div>
                    <div>{ride.userId}</div>
                    <div>{ride.picklatLon}</div>
                    <div>{ride.droplatLon}</div>
                    <div>{ride.otp}</div>
                    <div>
                        <button onClick={()=>handleAccept()}>Accept</button>
                        <button onClick={()=>handleDecline()}>Decline</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default WaitingDriver