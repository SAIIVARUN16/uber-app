import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const CarModelChoose = () => {
  const [showButton,setShowButton] = useState(false)
  const [carType,setCarType] = useState('')
  const navigate=useNavigate()
  const location=useLocation()
  const userId=(location.pathname).split('/')[2]
  const handleClick = (CarType) => {
    setShowButton(true)
    setCarType(CarType)
  }
  const handleConfirm = () => {
    navigate(`/showDrivers/${userId}/${carType}`)
  }
  return (
    <div>
      <div>
        <div onClick={()=>handleClick("UberL")}>Uber L</div>
        <div onClick={()=>handleClick("UberXL")}>Uber XL</div>
        <div onClick={()=>handleClick("UberXXL")}>Uber XXL</div>
      </div>
      {showButton && <button onClick={()=> handleConfirm()}>Book Car</button>}
    </div>
  )
}

export default CarModelChoose