import "./MessageBox.scss"
import {useNavigate} from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { ToggleContext } from "../../context/ToggleContext"
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import {db} from "/src/utils/firebase/firebase"
import {OnSnapshotContext} from "/src/context/OnSnapshotData"
import {UserContext} from "/src/context/UserContext"

function getData() {
  const storage = localStorage.getItem('friendsInfo')

  return storage ? JSON.parse(storage) : {messagePreview:[{}]}
}

function getFriendConvo() {
  let stored = localStorage.getItem("friendConvo")
  return stored ? JSON.parse(stored) : {}
}

export default function MessageBox(){
  const navigate = useNavigate()
const {setToggleChat} = useContext(ToggleContext)
const {userInfo, loaded} = useContext(UserContext)
const [getFriendsInfo, setGetFriendsInfo] = useState(null)
const [friendConvoInfo, setFriendConvoInfo] = useState(getFriendConvo())
const [isClicked, setIsClicked] = useState(false)

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
  

useEffect(()=>{
if(loaded){
  const unsub = onSnapshot(doc(db, "friendsPreview", userInfo.uid), (doc) => {
    
  setGetFriendsInfo(doc.data())
    });

}
  
}, [userInfo, getFriendsInfo])


// useEffect(()=>{
//   if(loaded){
//     if(friendConvoInfo){
//   const setConversation = async() =>{
//     const conversationRef = doc(db, 'conversations', `${userInfo.uid}-${friendConvoInfo.friendsId}`)
//  try{
//     const getDocRef = await getDoc(conversationRef)
 
 
//     if(!getDocRef.exists()){
//      await setDoc(conversationRef, {
//        usersMessage:[],
//       friendMessage:[]
//      })
 
 
//     }
//   }
//   catch(e){
//     console.log(e);
//   }
// }
// setConversation()
// }
//   }
// },[isClicked, friendConvoInfo])

const enableChats = async (el) =>{
  setIsClicked(true)

localStorage.setItem("friendsChatInfo", JSON.stringify(el))

localStorage.setItem("friendConvo", JSON.stringify(el))
const getConvo = localStorage.getItem("friendConvo")
setFriendConvoInfo(JSON.parse(getConvo))
setToggleChat(true)

    const conversationRef = doc(db, 'conversations', `${userInfo.uid}-${el.friendsId}`)
 try{
    const getDocRef = await getDoc(conversationRef)
 
 
    if(!getDocRef.exists()){
     await setDoc(conversationRef, {
      messages: {
        usersChat:[],
          friendsChat:[]
        }
     })
 
     navigate('/chat')
 
    }
    else{
      navigate('/chat')
    }
  }
  catch(e){
    console.log(e);
  }

}






  return (
    <>

 {
  getFriendsInfo ?
  getFriendsInfo.messagePreview.slice().reverse().map(el =>    
   <div key={el.friendsId}  className='message-container' onClick={() =>{
    enableChats(el)
   }}>
    <div className="message-image">
    <img src={el.friendsImage}  className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
  {el.friendsName}
    </div>
    <div className="message-text">
     {}
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
 : ""
  }
    </>
    )
}