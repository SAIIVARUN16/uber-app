import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/availableDrivers');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  const handleClick = async (driverId) => {
  }
  return (
    <div>
      {users &&
        users.map((user) => (
            <div key={user.id} onClick={()=>handleClick(user.id)}>{user.name}</div>
        ))}
    </div>
  );
};

export default Home;
