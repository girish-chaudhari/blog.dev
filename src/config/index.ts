import axiosConfig from "axios"


const axios = axiosConfig.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})


export default axios