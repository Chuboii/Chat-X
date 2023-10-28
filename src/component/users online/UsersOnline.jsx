import statImg from "/src/assets/html.webp"
import "./UsersOnline.scss"
import {useContext, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import {doc, onSnapshot, collection} from "firebase/firestore"

export default function UsersOnline(){
let {userInfo} = useContext(UserContext)



  return(
  
    <div className="useronline-container">
    <div className="useronline-user">
    <div className="useronline-image">
    <img src={userInfo.photoURL} className="useronline-img" />
    </div>
    <div className="useronline-name">
    {userInfo.displayName}
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