import SearchIcon from '@mui/icons-material/Search'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import "./HomeChatHeader.scss"
import {useNavigate} from "react-router-dom"
import BedtimeIcon from '@mui/icons-material/Bedtime';
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import HomeMenu from "/src/component/home menu/HomeMenu"
import {ToggleContext} from "/src/context/ToggleContext"

export default function HomeChatHeader(){
  const navigate = useNavigate()
  const {userInfo} = useContext(UserContext)
  const {toggleMenu, setToggleMenu} = useContext(ToggleContext)
  const enableSearch = () => {
    navigate("/search")
  }
  
const turnOnMenu = (e) =>{
  e.stopPropagation()
  setToggleMenu(true)
}
  return(
    <>
    {toggleMenu && <HomeMenu/>}
  <header className="homechat-header">
  <div className="homeheader-bio">
    <BedtimeIcon/>
    <div className="homeheader-bio-divider">
  <div className="homeheader-name"> {userInfo.displayName}</div>
  <div className= "homeheader-stat">sleeping</div>
  </div>
  </div>
  
  <div className="homeheader-icons">
  
  <SearchIcon onClick = {enableSearch} className="homeh-icon-search"/>
  
  <CameraAltIcon className="homeh-icon-camera"/>
  <MoreVertIcon onClick={turnOnMenu}  className="homeh-icon-ellips"/>
  </div>
  </header>
  </>
  )
}