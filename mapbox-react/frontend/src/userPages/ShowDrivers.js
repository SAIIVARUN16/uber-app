import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ShowDrivers = () => {
    const location = useLocation()
    const navigate= useNavigate()
    const carType = (location.pathname).split("/")[3]
    const userId = (location.pathname).split("/")[2]
    const [drivers,setDrivers] = useState(null)
    const [loading,setLoading] = useState(false)
    const [msg,setMsg] = useState('')
    useEffect(()=>{
        const fetchDrivers = async () => {
            console.log("fetchDrivers");
            const res = await axios.post(`http://localhost:5000/showDrivers`,{
                carModel:carType
            }) 
            setDrivers(res.data)
        }
        fetchDrivers()
    },[])
    const handleClick = async (id) => {
        console.log(id)
        setLoading(true)
        const user = await axios.post('http://localhost:5000/checkForDriver',{
            driverId:id,
            userId:userId
        })
        if(user.data === "accepted"){
            setLoading(false)
            setMsg('Accepted')
        }else{
            setLoading(false)
            setMsg('Not Accepted')
            setDrivers(drivers.filter((driver)=>driver._id!==id))
        }
    }
    const handleFurtherDrivers = () =>{
        setLoading(true)
        setMsg('')
    }
    const handleCancel = async () => {
        const res = await axios.post('http://localhost:5000/cancelRide',{
            userId:userId
        })
        if((res.data)==="ride deleted"){
            console.log("ride deleted");
            navigate(`/level2/${userId}`)
        }
    }
    return (
        <div>
            ShowDrivers: 
            {carType}
            <div>
                {
                    drivers && drivers.map(driver => {
                        return (
                            <div key={driver._id} onClick={()=>handleClick(driver._id)}>{driver.name}</div>
                        )
                    })
                }
            </div>
            <div>
                {
                    loading && <div>Choose The Driver...</div>
                }{
                    msg.length>0 && <div>{msg}</div>
                }{
                    msg==="Not Accepted" && <button onClick={()=>handleFurtherDrivers()}>Show other drivers</button>
                }{
                    msg==="Accepted" && <button onClick={()=>handleCancel()}>Cancel</button>
                }
            </div>
        </div>
    )
}

export default ShowDrivers