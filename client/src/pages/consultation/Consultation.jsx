import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors' details from the backend
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
            <img src={doctor.image} alt={doctor.name} />
            <p>User ID: {doctor._id}</p>
            <p>Name: {doctor.name}</p>
            <p>Specialisation: {doctor.specialisation || "Not yet specified"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Consultation;
