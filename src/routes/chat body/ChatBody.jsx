import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./ChatBody.scss"
import img from "/src/assets/html.webp"
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import {useNavigate} from "react-router-dom"
import client, {db} from "/src/utils/appwrite/appwrite"
import {useState, useContext, useEffect, useReducer} from "react"
import {UserContext} from "/src/context/UserContext"
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {v4 as uuidv4} from "uuid"
export default function ChatBody(){
  const navigate = useNavigate()
  const {userInfo, xId} = useContext(UserContext)
  const [value, setValue] = useState("")
 const goToHome = () => navigate("/")
 const [msgs, setMsgs] = useState(null)
 const [clicked, setClicked] = useState(null)
 // console.log(userInfo.uid)
 
 
 useEffect(()=>{
   const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     const databaseId = "653d5e27b809bb998478"
     const collectionId = "653f9e65c3b8f536647f"
   
     client.subscribe(`databases.${databaseId}.colections.${collectionId}.documents.${combinedId}`, response => {
        console.log(response)
      })
     
      
 },[])
 
 
 
 useEffect(()=>{
   
   const getMsgs = async () => {
     const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     const databaseId = "653d5e27b809bb998478"
     const collectionId = "653f9e65c3b8f536647f"
   
     
      
     try{
      
     const res = await db.getDocument("653d5e27b809bb998478", "653f9e65c3b8f536647f", combinedId)
     const filtered = res.messages.map(el => JSON.parse(el))
     
     setMsgs(filtered)
     }catch(e){
       console.log(e)
     }
   }
   getMsgs()
 },[clicked])
 
  const sendMsg = async () => {
   if(value){
     try{
       
     const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     
     const date = new Date()
     
     const data = {
       messages:[JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: userInfo.photoURL,
         textMessage: value,
         imageMessage:null,
         unread: 0,
         time: date,
         lastMsg: [],
         idCombined: combinedId
       })]
     }
     //console.log(combinedId)
  const res = await db.createDocument("653d5e27b809bb998478", "653f9e65c3b8f536647f", combinedId , data)
    
   setClicked(res)
     console.log("done")
     }
     catch(e){
       if(e.code === 409){
      const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     
 const res = await db.getDocument("653d5e27b809bb998478", "653f9e65c3b8f536647f", combinedId)
 console.log(res)
 const date = new Date()
 
 const data = JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: userInfo.photoURL,
         textMessage: value,
         imageMessage:null,
         unread: 0,
         time: date,
         lastMsg: [],
         idCombined: combinedId
       })
 
res.messages.push(data)
 
 const updatedData = {
   messages: res.messages
 }
 const updatedRes = await db.updateDocument("653d5e27b809bb998478", "653f9e65c3b8f536647f", combinedId, updatedData)
 setClicked(updatedData)
 console.log("updated")
       }
       
       
       
     }
     setValue("")
   }
  }
  
  const changeValue = (e) =>{
    setValue(e.target.value)
  }
  return(
    <div className="chatbody-container">
    <header className="chatbody-header">
    <div className="chatbody-profile-pic" onClick={goToHome}>
    <ArrowBackIcon className="chatbody-arrow"/>
    <div className="chatbody-image">
    <img src={img} className="chatbody-img"/>
    </div>
    </div>
    
    
    <div className="chatbody-descript">
    <div className="chatbody-name"> Joe doe </div>
    <div className="chatbody-online"> online </div>
    </div>
    
    <div className="chatbody-icons">
    <CallIcon className="chatbody-call"/>
    <VideocamIcon className="chatbody-video"/>
    <MoreVertIcon className="chatbody-more"/>
    </div>
    </header>
    
    
    
    <main className="chatbody-main"> 
    
{ msgs ?   msgs.map(el =>(
<div>
<div className={userInfo.uid === el.userId ? "chatbody-user-chat" : "chatbody-friends-chat"}>
<div style={{display:"flex"}}>
  {userInfo.uid !== el.userId ?
  ( <div className={userInfo.uid === el.userId ? "chatbody-user-image" : "chatbody-friends-image"}>
    <img src={el.photoURL} className={userInfo.uid === el.userId ? "chatbody-user-img" : "chatbody-friends-img"}/>
    </div>) : ""}
    
    <div className={userInfo.uid === el.userId ? "chatbody-main-user-chat":"chatbody-main-friend-chat"}>
    {el.textMessage}
    
    <div className={userInfo.uid === el.userId ? "chatbody-user-chat-time": "chatbody-friends-chat-time"}>
   <span>  11:37 AM </span>
   {userInfo.uid === el.userId ? <DoneIcon sx={{fontSize:"13px", marginLeft:".2rem"}}/> : ""}
    </div>

    </div>
      {userInfo.uid === el.userId ?
  ( <div className={userInfo.uid === el.userId ? "chatbody-user-image" : "chatbody-friends-image"}>
    <img src={el.photoURL} className={userInfo.uid === el.userId ? "chatbody-user-img" : "chatbody-friends-img"}/>
    </div>) : ""}
    </div>
</div>
{el.imageMessage ? (
    <div className="chatbody-image-box">
      <div className="chatbody-friends-image">
    <img src={img} className="chatbody-friends-img"/>
    </div>
  
    <div className="chatbody-chat-img">
    <img className="chatbody-chat-imgg" src={img} />
        <DoneIcon/>
    <div className="chatbody-chat-img-time">
    11:37 AM
    </div>

    </div>
        </div>) : ""
}
    </div>
)) : ""}
    </main>
{/*   
    <div className="chatbody-user-chat">
    <div className="chatbody-main-user-chat">
    Hello John.. How are you?
    <div className="chatbody-user-chat-time">
    11:37 AM
    </div>
    </div>
            <div className="chatbody-user-image">
    <img src={img} className="chatbody-user-img"/>
    </div>
    </div>
    */}

    
    <footer className="chatbody-footer">
    <div className="chatbody-input-box">
    <textarea value={value} onChange={changeValue} className="chatbody-input"></textarea>
   <div className="chatbody-inicon-box">
    <AttachFileIcon sx={{marginRight:'.5rem'}}/>
    <CameraAltIcon/>
    </div>
    </div>
    <SendIcon  onClick={sendMsg} className="chatbody-send-btnn"/>
    </footer>
    </div>
)
}