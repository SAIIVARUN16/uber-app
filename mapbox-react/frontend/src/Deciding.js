import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Deciding = () => {
    return (
        <div>
            <Link to='/DriverLogin'>
                <button>DriverLogin</button>
            </Link>
            <Link to='/UserLogin'>
                <button>UserLogin</button>
            </Link>
        </div>
    )
}

export default Deciding