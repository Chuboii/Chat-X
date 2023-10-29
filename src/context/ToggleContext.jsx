import {createContext, useReducer,useState} from "react"

export const ToggleContext = createContext()

const reducer = (state, action) =>{
  const {type} = action
  
  switch(type){
    case "TOGGLE_BG_COLOR":
      return {toggleBg: !state.toggleBg}
    default:
    return state
  }
}

export const ToggleProvider = ({children}) =>{
  const [toggleMenu, setToggleMenu] = useState(false)
  const [state, dispatch] = useReducer(reducer, {toggleBg: false})
  
  const value = {toggleMenu, setToggleMenu,state, dispatch}
  
  return (
    <ToggleContext.Provider value={value}>
    {children}
    </ToggleContext.Provider>
    )
}