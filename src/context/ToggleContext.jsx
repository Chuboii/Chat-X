import {createContext, useState} from "react"

export const ToggleContext = createContext()


export const ToggleProvider = ({children}) =>{
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleChat, setToggleChat] = useState(false)
  
  const value = {toggleMenu, setToggleMenu, setToggleChat, toggleChat}
  
  return (
    <ToggleContext.Provider value={value}>
    {children}
    </ToggleContext.Provider>
    )
}