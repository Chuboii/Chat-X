import statImg from "/src/assets/html.webp"
import "./UsersOnline.scss"
import {useContext, useState, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import {doc, onSnapshot, collection} from "firebase/firestore"
import {ToggleContext} from "/src/context/ToggleContext"
import {db} from "/src/utils/appwrite/appwrite"

export default function UsersOnline(){
let {userInfo} = useContext(UserContext)
const {toggleMenu,dispatch, state, setToggleMenu} = useContext(ToggleContext)
const [data, setData] = useState(null)

useEffect(() =>{
  const getUserInfo = async() =>{
    const getExistingUser  = await db.getDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", userInfo.uid)
  setData(getExistingUser.user)
  console.log(getExistingUser)
  }
  
  getUserInfo()
},[])

  return(
  
    <div style={{background:state.toggleBg ? "white" : "black", color:state.toggleBg ? "black" : "white"}} className="useronline-container">
    <div className="useronline-user">
    <div className="useronline-image">
    <img src={data ? JSON.parse(data).photoURL : ""} className="useronline-img" />
    </div>
    <div className="useronline-name">
    {data ? JSON.parse(data).username : ""}
    </div>
    <div className="useronline-dot"> </div>
    </div>
   
    <div className="useronline-user">
    <div className="useronline-image">
    <img src={userInfo.photoURL} className="useronline-img" />
    </div>
    <div className="useronline-name">
    {userInfo.displayName}
    </div>
    <div className="useronline-dot"> </div>
    </div>
    </div>
)
}