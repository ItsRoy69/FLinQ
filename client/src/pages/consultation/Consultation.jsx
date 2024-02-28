import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/doctors`)
      .then(response => {
        setDoctors(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return (
    <div>
      <h2>Doctors for Consultation</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor._id}>
            <Link to={`/chat/${doctor._id}`}>
              <img src={doctor.image} alt={doctor.name} />
              <p>Name: {doctor.name}</p>
              <p>Specialisation: {doctor.specialisation || "Not yet specified"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Consultation;
