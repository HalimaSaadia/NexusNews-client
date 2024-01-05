import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import useUserState from "../Hooks/useIsAdmin";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  let subtitle;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const location = window.location.pathname
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axiosSecure.post("/jwt", { email: currentUser.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
        });
        axiosSecure.patch(`/check-premiumTakenExpiration/${currentUser?.email}`).then(res =>console.log(res.data))
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => unSubscribe();
  }, [user,axiosSecure]);

  useEffect(() => {
    setTimeout(() => {
      if (count <= 10) {
        setCount(count + 1);
        if (count === 10 && location ==="/") {
          openModal();
        }
      }
    }, 1000);
  }, [count]);


  const value = {
    createUser,
    updateUserProfile,
    user,
    loginWithEmailAndPassword,
    loginWithGoogle,
    loading,
    logout,
    openModal,
    afterOpenModal,
    closeModal,
    modalIsOpen,
    
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
