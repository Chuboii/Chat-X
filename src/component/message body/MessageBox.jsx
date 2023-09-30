import img from "/src/assets/html.webp"
import "./MessageBox.scss"
import ChatBody from "/src/routes/chat body/ChatBody"
import {useNavigate} from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { ToggleContext } from "../../context/ToggleContext"
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "/src/utils/firebase/firebase"
import {OnSnapshotContext} from "/src/context/OnSnapshotData"
import {UserContext} from "/src/context/UserContext"

export default function MessageBox(){
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)
const {setToggleChat} = useContext(ToggleContext)
const {previewFriendsData, setPreviewFriendsData} = useContext(OnSnapshotContext)
const {userInfo} = useContext(UserContext)
const [a, setA] = useState({
  messagePreview:[]
})


  useEffect(()=>{
    const messageBody = document.querySelectorAll(".message-container")
    function resizeScreen(){
  const screenWidth = window.innerWidth
  const threshold = 700
  
  if(screenWidth <= threshold){
  const navigateToChat = () =>{
    navigate("/chat")
  }
  messageBody.forEach(el =>{
    el.addEventListener("click", navigateToChat)
  })
    }
    }
    resizeScreen()
  window.addEventListener("resize", resizeScreen)
 
  return () =>{
    window.removeEventListener("resize", resizeScreen)
  }
  }, [])
  
 

const enableChats = () =>{
  setToggleChat(true)
}



useEffect(()=>{
function getFriendsPreviewUpdated(){
const unsub = onSnapshot(doc(db, "friendsPreviewChat", userInfo.uid), (doc) => {
 // console.log(doc.data())
//console.log(doc.data())
  // setPreviewFriendsData(doc.data())
  setA(doc.data())
});
}

getFriendsPreviewUpdated()

return getFriendsPreviewUpdated
}, [previewFriendsData])
  return (
    <>
{/*{a.messagePreview.slice().reverse().map(el => {
  
   return ( 
   <div key={el.friendsID} className='message-container' onClick={enableChats}>
    <div className="message-image">
    <img src={el.friendsImg} className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    {el.friendsName}
    </div>
    <div className="message-text">
     {el.friendsPreviewMsg}
     
    </div>
    </div>
    
    <div className="messageBox-third">
    <div className="messageBox-time">
    9:16 AM
    </div>

    <div className="messageBox-online">
    online
    </div>
    
    <div className="messageBox-unread">
    8
    </div>
    </div>
   
    </div>
  )
})}
*/}
    </>
    )
}