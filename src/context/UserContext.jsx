import { createContext, useEffect, useState } from "react";
import {  onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function getUserData() {
  let storedData = localStorage.getItem("userInfo");
  return storedData ? JSON.parse(storedData) : {
      uid: "",
      dateCreated: "",
      firstName: "",
      lastName: "",
      fullName: "",
      displayName:"",
      email: "",
      photoURL:"",
      isFriend: false,
      isOnline:false
  }
}

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserData);
  const [loaded, setLoaded] = useState(false)

  const triggerSignout = async () => {
    await signOutUser();
    
  }

  const handleSignupLink = () => {
    setIsClicked(true);
    navigate("/signup");
  }

  const handleSigninLink = () => {
    setIsClicked(!isClicked);
    navigate("/signin");
  }


  useEffect(() => {
    const authChanged = onAuthStateChange(async(user) => {
      if (user) {
        navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(user));
        setUserInfo(user);
        setLoaded(true)
      } else {
        if (isClicked) {
          navigate("/signup");
        } else {
          navigate("/signin");
        }
      }
    });

  
   
    return () => {
      authChanged();
    }
  },[]);

  const value = { userInfo, handleSignupLink, handleSigninLink, triggerSignout, loaded };
  

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
