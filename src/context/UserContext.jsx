import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function getUserInfo(){
  const storage = localStorage.getItem("xChatUserInfo")
return storage ? JSON.parse(storage) : ""
}
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserInfo);

  const triggerSignout = async () => {
    await signOutUser();
    
  }
  
  
  useEffect(() => {
    const authChanged = onAuthStateChange(async(user) => {
      if (user) {
        
      }
    });
   
    return () => {
      authChanged();
    }
  }, []);

  const value = { userInfo, triggerSignout };
  

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
