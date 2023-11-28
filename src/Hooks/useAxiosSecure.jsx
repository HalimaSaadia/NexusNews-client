import axios from "axios";

const axiosSecure = axios.create({
    baseURL:"https://nexus-news-server.vercel.app"
})

const useAxiosSecure = () => {
    
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('token')
        config.headers.authorization = token
        return config
    },(error)=>{
        return Promise.reject(error)
    })
    axiosSecure.interceptors.response.use((response)=>{
        return response
    },(error)=>{
        return Promise.reject(error)
    })
    
    return axiosSecure
};

export default useAxiosSecure;