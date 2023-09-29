import "./HomeMenu.scss"
import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"


export default function HomeMenu(){
  const {triggerSignout} = useContext(UserContext)
  
  
  return(
    <div className= "home-menu-container">
    <nav className="home-menu-nav">
    <Link to={"/addFriends"} className="home-menu-link"> Add Friends </Link>
    <Link to={"/profile"} className="home-menu-link"> Profile </Link>
    <Link to={"/settings"} className="home-menu-link"> Settings</Link>
    <button className="home-menu-btn" onClick={triggerSignout}> Logout </button>
    </nav>
    </div>
    )
}