import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
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
  const [userInfo, setUserInfo] = useState(getUserData());

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
  /*
localStorage.setItem("userInfo", JSON.stringify({
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
  }))
  */
  useEffect(() => {
    const authChanged = onAuthStateChange(async(user) => {
      if (user) {
    //  await setUserOnlineStatus(userInfo, true)
        navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(user));
        setUserInfo(user);
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
  }, [isClicked]);

  const value = { userInfo, handleSignupLink, handleSigninLink, triggerSignout };
  

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
