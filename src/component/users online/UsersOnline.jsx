import statImg from "/src/assets/html.webp"
import "./UsersOnline.scss"
import {useContext, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "/src/utils/firebase/firebase"

export default function UsersOnline(){
let {userInfo} = useContext(UserContext)

useEffect(()=>{
const unsub = onSnapshot(doc(db, "userFriends", userInfo.uid), (doc) => {
  doc.data().friends.forEach(el =>{
    console.log("Current data: ", el[0]);
  })
})
 
  



return unsub
}, [])






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