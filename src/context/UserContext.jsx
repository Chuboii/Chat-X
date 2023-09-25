import { createContext, useEffect, useState } from "react";
import {auth, createUserDocRef, onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
import {useNavigate, useLocation} from 'react-router-dom'

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
 const [userInfo, setUserInfo] = useState(null)
 const navigate = useNavigate()
 const location = useLocation()
 const [isClicked, setIsClicked] = useState(false)
 const [chatClicked, setChatClicked] = useState(true)

 const triggerSignout = async() =>{
    await signOutUser()
 }
 
const handleSignupLink = ()=>{
  
setIsClicked(true)
   navigate("/signup")
  }
  const handleSigninLink = ()=>{
setIsClicked(!isClicked)
   navigate("/signin")
  }

 useEffect(() =>{
    const authChanged = onAuthStateChange((user) =>{
      setUserInfo(user)
     if(user){
     /* if(chatClicked){
         navigate("/chat")
       }
       else{
       navigate('/')
            setUserInfo(user)
       }*/
     }
        else{
          if(isClicked){
            navigate('/signup')
          }
          else{
            navigate('/signin')
          }
        }
    })
    
  
    return authChanged
 }, [navigate])



 const value = {userInfo, setUserInfo, handleSignupLink, handleSigninLink, triggerSignout}
    return(
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    )
}