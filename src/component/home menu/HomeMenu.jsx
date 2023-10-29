import "./HomeMenu.scss"
import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import {ToggleContext} from "/src/context/ToggleContext"

export default function HomeMenu(){
  const {triggerSignout} = useContext(UserContext)
  const {toggleMenu,dispatch, state, setToggleMenu} = useContext(ToggleContext)
  
  return(
    <div style={{color:` ${state.toggleBg ? "white" : " black"}`}} className= "home-menu-container">
    <nav className="home-menu-nav">
    <Link to={"/addFriends"} style={{color:` ${state.toggleBg ? "black" : " white"}`}} className="home-menu-link"> Add Friends </Link>
    <Link to={"/profile"} style={{color:` ${state.toggleBg ? "black" : " white"}`}} className="home-menu-link"> Profile </Link>
    <Link to={"/settings"} style={{color:` ${state.toggleBg ? "black" : " white"}`}} className="home-menu-link"> Settings</Link>
    <button style={{color:` ${state.toggleBg ? "white" : " black"}`, background: state.toggleBg ? "black" : " white"}} className="home-menu-btn" onClick={triggerSignout}> Logout </button>
    </nav>
    </div>
    )
}