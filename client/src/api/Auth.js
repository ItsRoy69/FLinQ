import axios from 'axios';
import React from 'react';

const API = process.env.NODE_ENV === 'production' ? "https://flinq.vercel.app" : "http://localhost:5173";

export const userRegister = async (creds) => {
    try {
        const response = await axios.post(`${API}/user/register`, creds);
        return response
    }
    catch (error) {
        console.log(error)
    }
}