import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function getUserInfo(){
  const storage = localStorage.getItem("xChatUserInfo")
return storage ? JSON.parse(storage) : ""
}
function getXId(){
  const storage = localStorage.getItem("xId")
return storage ? storage: null
}
function getXProfile(){
  const storage = localStorage.getItem("xProfile")
return storage ? JSON.parse(storage): null
}
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserInfo);
const [xId, setXId] = useState(getXId)
const [xProfile, setXProfile] = useState(getXProfile)
  const triggerSignout = async () => {
    await signOutUser();
    setUserInfo(null)
    localStorage.setItem("xChatUserInfo", null)
  }
  
  
  useEffect(() => {
    const authChanged = onAuthStateChange(async(user) => {
      if (user) {
        localStorage.setItem("xChatUserInfo", JSON.stringify(user))
      }
      else{
        navigate("/signup")
      }
    });
   
    return () => {
      authChanged();
    }
  }, []);

  const value = {xId, setXId, userInfo, setUserInfo, triggerSignout, xProfile, setXProfile };
  

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
