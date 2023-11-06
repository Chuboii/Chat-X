import SearchIcon from '@mui/icons-material/Search'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import "./HomeChatHeader.scss"
import {useNavigate} from "react-router-dom"
import BedtimeIcon from '@mui/icons-material/Bedtime';
import {useContext, useEffect, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import HomeMenu from "/src/component/home menu/HomeMenu"
import {ToggleContext} from "/src/context/ToggleContext"
import {db} from "/src/utils/appwrite/appwrite"


export default function HomeChatHeader(){
  const navigate = useNavigate()
  const {userInfo} = useContext(UserContext)
  const {toggleMenu,dispatch, state, setToggleMenu} = useContext(ToggleContext)
  const [data, setData] = useState(null)
  const enableSearch = () => {
    navigate("/search")
  }
  
const turnOnMenu = (e) =>{
  e.stopPropagation()
  setToggleMenu(true)
}

useEffect(()=>{
  document.body.style.background = state.toggleBg ? "white" : "black"
  document.body.style.color = state.toggleBg ? "black" : "white"
  
},[state.toggleBg])


useEffect(() =>{
  const getUserInfo = async() =>{
    const getExistingUser  = await db.getDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", userInfo.uid)
  setData(getExistingUser.user)
 // console.log(getExistingUser)
  }
  
  getUserInfo()
},[])
const toggleBgColor = () =>{
  dispatch({type: "TOGGLE_BG_COLOR"})
}
  return(
    <>

    {toggleMenu && <HomeMenu/>}
  <header style={{background:state.toggleBg ? "white" : "black", color: state.toggleBg ? "black" : "white"}} className="homechat-header">
  <div className="homeheader-bio">
    <BedtimeIcon onClick={toggleBgColor}/>
    <div className="homeheader-bio-divider">
    <div className="homeheader-name"> {data ? JSON.parse(data).username : ""}</div>
    <div className= "homeheader-stat">{data ? JSON.parse(data).about : ""}</div>
  </div>
  </div>
  
  <div className="homeheader-icons">
  
  <SearchIcon onClick = {enableSearch} className="homeh-icon-search"/>
  <div className="hh-cam-box" >
  <CameraAltIcon className="homeh-icon-camera"/>
  <input type="file" capture="user" className="hh-inp"/>
  </div>
  <MoreVertIcon onClick={turnOnMenu}  className="homeh-icon-ellips"/>
  </div>
  </header>
  </>
  )
}