import { createContext, useEffect, useState } from "react";
import {auth, onAuthStateChange, signOutUser } from "../utils/firebase/firebase";
import {useNavigate} from 'react-router-dom'

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
 const [userInfo, setUserInfo] = useState(null)
 const navigate = useNavigate()
 const a = async() =>{
    const b = await signOutUser()
    console.log(b);
 }
 useEffect(() =>{
    const authChanged = onAuthStateChange((user) =>{
        if(!user && window.location.pathname !== '/signup'){
            navigate('/signin')
    
        }
        else{
            navigate('/')
            setUserInfo(user)

        }
    })
    

    return authChanged
 }, [navigate])



 const value = {userInfo}
    return(
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    )
}