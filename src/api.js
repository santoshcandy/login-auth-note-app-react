// import axios from "axios"

// import { ACCESS_TOKEN } from "./constants"
// import React from 'react'

//  const api =axios.create(
//     {
//         baseURL : process.env.REACT_APP_API_URL
//     }
//  )
// console.log(api)
//  api.interceptors.request.use(
//     (config)=>{
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         if(token){
//             config.headers.Authorization=`Bearer ${token}`
//         }
//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
//  )

//  export default api


import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to attach token for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // Apply token only for protected routes
    if (token && !config.url.includes('/api/user/register') && !config.url.includes('/api/token/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
