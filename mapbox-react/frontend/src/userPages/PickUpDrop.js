import React from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const PickUpDrop = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname
    const id = path.split('/')[2]
    const handleClick = async () => {
        const res = await axios.post('http://localhost:5000/storeRide',{
            id:id,
            pickUp:[13.0250, 80.2228],
            drop:[13.0361, 80.2208]
        })
        if(res.data === 'success' ||res.data === 'failure' ){
            navigate(`/carModelChoose/${id}`)
        }
    }
    return (
    <div>
        map component using which 
        pickup and drop location will be entered by user...
        <button onClick={handleClick}>Proceed</button>
    </div>
  )
}

export default PickUpDrop
