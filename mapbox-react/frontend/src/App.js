import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLogin from './Auth/UserLogin'
import Register from './Auth/Register'
import Home from './userPages/Home'
import PickUpDrop from './userPages/PickUpDrop'
import Error from './Error'
import CarModelChoose from './userPages/CarModelChoose'
import ShowDrivers from './userPages/ShowDrivers'
import Deciding from './Deciding'
import DriverLogin from './Auth/DriverLogin'
import WaitingDriver from './cabPages/WaitingDriver'
import DriverToPick from './cabPages/DriverToPick'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Deciding />}/>
        <Route path='/driverlogin' element={<DriverLogin />}/>
        <Route path='/userlogin' element={<UserLogin />}/>
        <Route path='/' element={<Deciding />}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/carModelChoose/:id' element={<CarModelChoose/>}/>
        <Route path='/showDrivers/:userId/:carType' element={<ShowDrivers/>}/>
        <Route path='/level2/:id' element={<PickUpDrop/>}/>
        <Route path='/waitingDriver/:id' element={<WaitingDriver/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/driverToPick/:id' element={<DriverToPick/>}/>
      </Routes>
    </div>
  )
}

export default App










// import React from 'react';
// import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
// import Geocoder from './components/Geocoder';
// import Direction from './components/Direction';

// function App() {

//   const ll = [80.270186, 13.083694];
//   return (
//     <div>
//       <Map
//         mapboxAccessToken='pk.eyJ1Ijoic25la2FuNyIsImEiOiJjbGo0ZTBndXYwMWl2M2pxeWp1eDQ2NG9uIn0.bE3IY5XI57Qrtck_EfsMxg'
//         style={{
//           width: "100vw",
//           height: "100vh",
//           border: "2px solid red"
//         }}
//         initialViewState={{
//           longitude: ll[0],
//           latitude: ll[1],
//           zoom: 8
//         }}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//       >
//         <Marker
//           longitude={ll[0]}
//           latitude={ll[1]}
//           draggable
//         />

//         <NavigationControl position='bottom-right' />

//         <GeolocateControl
//           position='top-left'
//           trackUserLocation
//           showUserHeading
//         />

//         <Geocoder />

//         <Direction />




//       </Map>
//     </div>
//   );
// }

// export default App;
