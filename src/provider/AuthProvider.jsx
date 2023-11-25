import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateCurrentUser, updateProfile } from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const  AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const createUser =(email, password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL: photo
        })
    }

    const loginWithEmailAndPassword=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const loginWithGoogle = () => {
         setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
            // if(currentUser){
               
            //     axiosSecure.post("/jwt", {email:currentUser.email})
            //     .then(res => {
            //         console.log(res.data.token);
            //         if(res.data.token){
            //             localStorage.setItem('token', res.data.token)
            //         }
                   
            //     })
            // }else{
            //     localStorage.removeItem('token')
            // }
        })

        return () => unSubscribe()
    },[])
    console.log(user);

    const value = {createUser,updateUserProfile,user, loginWithEmailAndPassword,loginWithGoogle,loading}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;