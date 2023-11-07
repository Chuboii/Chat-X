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
import {useState,useRef, useContext, useEffect, useReducer} from "react"
import {UserContext} from "/src/context/UserContext"
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {v4 as uuidv4} from "uuid"
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "/src/utils/firebase/firebase"
import ImageDisplay from "/src/component/chat img display/ImageDisplay"
import ChatImageHeader from "/src/component/chat image header/ChatImageHeader"
import Loader from "/src/component/loader/Loader"
export default function ChatBody(){
  const navigate = useNavigate()
  const {userInfo,xProfile, xId} = useContext(UserContext)
  const [value, setValue] = useState("")
 const goToHome = () => navigate("/")
 const [msgs, setMsgs] = useState(null)
 const [clicked, setClicked] = useState(null)
 // console.log(userInfo.uid)
 const scrollRef = useRef()
  const [otherUserIsTyping, setOtherUserIsTyping] = useState(false);
  const [sent, setSent] = useState(false)
  const [count, setCount] = useState(null)
  const [viewFile, setViewFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [enableImageComp, setEnableImageComp] = useState(false)
  const [enableChatImg, setEnableChatImg] = useState(false)
/*
  const sendTypingStatus = () => {
    client.sendEvent('custom-typing-channel', { userId: userInfo.uid, isTyping: true });
  };

  const stopTypingStatus = () => {
    client.sendEvent('custom-typing-channel', { userId: userInfo.uid, isTyping: false });
  };

  useEffect(() => {
    client.subscribe(['custom-typing-channel']).then(() => {
      client.on('custom-typing-channel', (event) => {
        if (event.eventData.userId === xId) {
          if (event.eventData.isTyping) {
            setOtherUserIsTyping(true);
          } else {
            setOtherUserIsTyping(false);
          }
        }
      });
    });
  }, []);
*/
 useEffect(()=>{
   
   const getMsgs = async () => {
     const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     const databaseId = "653d5e27b809bb998478"
     const collectionId = "654283639f58b9326706"
   
     try{
     const date = new Date()
     
     const data = {
       messages:[]
     }
     
  
const userMsgs = await db.createDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId , data)

     }
     catch(e){
      // console.log(e)
     }
     
     
   try{
     const msgUserData = {
       msgPrev:[]
     }
     
     const msgFriendData = {
       msgPrev:[]
     }
     
  

  await db.createDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId , msgFriendData)

  await db.createDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid , msgUserData)

   }
   catch(e){
    // console.log(e)
   }
   
   
     try{
       
          const res = await db.getDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId)
        
       
     const filtered = res.messages.map(el => JSON.parse(el))
     
     setMsgs(filtered)
     
     
       
     client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${combinedId}`, response => {

         setClicked(response)
      

       const b = response.payload.messages.map(el => JSON.parse(el))
       setMsgs(b)
      
      })

      
      scrollRef.current.scrollIntoView({ behavior: 'smooth'})

     
     }catch(e){
     //  console.log(e)
     }
     
   }
   getMsgs()
 },[clicked])
 
 
 useEffect(()=>{
   const resetUnread = async () =>{
     try{
 const msgFriendUserDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid)
 
const date = new Date()

const updateFriend = msgFriendUserDoc.msgPrev.map(el =>{
 
  if(JSON.parse(el).userId === xProfile.userId){
  return {...JSON.parse(el), unread: 0}
  }
  else{
    return JSON.parse(el)
  }
})
//console.log(updateFriend)

const updatedFriend = {
  msgPrev: [...updateFriend.map(el => JSON.stringify(el))]
}
//console.log(updatedFriend)

const res = await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid, updatedFriend)
setClicked(res)
//console.log(res)
}
catch(e){
  console.log(e)
}
   }
   resetUnread()
 }, [])
 
 
 
  const sendMsg = async () => {
   if(value){
     try{
       //console.log("clicked")
     const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     
     const date = new Date()
     
     const res = await db.getDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId)
     
 const user = await db.getDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", userInfo.uid)
// console.log(JSON.parse(user.user[0]))

 const data = JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: JSON.parse(user.user[0]).photoURL,
         textMessage: value,
         imageMessage: null,
         unread: 0,
         time: date,
         lastMsg: [],
         isTyping: "",
         caption: "",
         isOnline: false,
         idCombined: combinedId
       })
       
       
res.messages.push(data)

const updatedData = {
   messages: res.messages
 }
 
 const updatedMsgPrevRes = await db.updateDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId, updatedData)
 
 setClicked(updatedMsgPrevRes)

   const msgUserPrevDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid) 

 const msgFriendUserDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId)
 
// console.log(res)

const friendDuplicate = msgFriendUserDoc.msgPrev.some(el => JSON.parse(el).userId === userInfo.uid)

const userDuplicate = msgUserPrevDoc.msgPrev.some(el => JSON.parse(el).userId === xProfile.userId)

//console.log(msgFriendUserDoc)
//console.log(userDuplicate)
 // console.log(friendDuplicate)    
 
if(!userDuplicate){
  
 const msgUserData = JSON.stringify({
         id: uuidv4(),
         userId: xProfile.userId,
         displayName: xProfile.displayName,
         photoURL: xProfile.photoURL,
         textMessage: value,
         imageMessage:null,
         unreadMsgs: [],
         unread: 0,
         time: date,
         lastMsg: [],
         isTyping: "",
         isOnline: false,
         idCombined: combinedId
       })
     

msgUserPrevDoc.msgPrev.push(msgUserData)

 const updatedMsgUPrevData = {
   msgPrev: msgUserPrevDoc.msgPrev
 }
 
 
  await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid, updatedMsgUPrevData)
 
}
else{
  console.log("item exists")

const msgUserPrevDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid)

const date = new Date()

const updateUser = msgUserPrevDoc.msgPrev.map(el =>{
  if(JSON.parse(el).userId === xProfile.userId){
  return {...JSON.parse(el), time: date, textMessage: value}
  }
  else{
    return JSON.parse(el)
  }
})
//console.log(updateUser)

const updatedUser = {
  msgPrev: [...updateUser.map(el => JSON.stringify(el))]
}

const res = await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid, updatedUser)
setClicked(res)
//console.log(res)
console.log("updateUser")

}

 
if(!friendDuplicate){
  
     const msgFriendData = JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: JSON.parse(user.user[0]).photoURL,
         textMessage: value,
         imageMessage:null,
         unreadMsgs:[],
         unread: 0,
         time: date,
         lastMsg: [],
         isTyping: "",
         isOnline: false,
         idCombined: combinedId
       })

msgFriendUserDoc.msgPrev.push(msgFriendData)


const unRead = msgFriendUserDoc.msgPrev.map(el =>{
  if(JSON.parse(el).userId === xProfile.userId){
  return JSON.parse(el).unreadMsgs
}
})
//console.log(...unRead)
const arr = [...unRead]
arr.push(value)

const mapped = msgFriendUserDoc.msgPrev.map(el => {
  return {...JSON.parse(el), unreadMsgs: arr, unread: arr.length}
})

 const updatedMsgFPrevData = {
   msgPrev: [...mapped.map(el => JSON.stringify(el))]
 }
 
 
const res2 =  await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId, updatedMsgFPrevData)
setClicked(res2)
}
else{
  console.log("item exists")

 const msgFriendUserDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId)
 
const date = new Date()

const updateFriend = msgFriendUserDoc.msgPrev.map(el =>{
  if(JSON.parse(el).userId === userInfo.uid){
  return {...JSON.parse(el), time: date, textMessage: value, unread: 1}
  }
  else{
    return JSON.parse(el)
  }
})
//console.log(updateFriend)

const updatedFriend = {
  msgPrev: [...updateFriend.map(el => JSON.stringify(el))]
}
//console.log(updatedFriend)

const res = await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId, updatedFriend)
setClicked(res)
//console.log(res)
console.log("updateFriend")

}

     }
     catch(e){
       console.log(e)
       
     }
   }
 setValue("")
  }





  
  const changeValue = (e) =>{
    setValue(e.target.value)
    
  }
  
  
  
  
  const getFile = (e) =>{
    
    const file = e.target.files[0]
    
    setViewFile(file)
    
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'

if(file){
  
  setEnableImageComp(true)
  
const storageRef = ref(storage, `${uuidv4()}`);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error )
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
   setImageUrl(downloadURL)
    });
  }
);

}
  }
 // console.log(xProfile)
 
 const isUserTyping = (e) =>{
   if(userInfo.uid === xProfile.userId){
     setOtherUserIsTyping(true)
   console.log("typing")
   }
 }
 
 
const increImage = (idx) =>{
  const item = document.querySelectorAll(".chatbody-chat-img")[idx]
  console.log(item)
//  item.style.width = "100vw"
}

  return(
    <>
  { enableChatImg && <ChatImageHeader/>}
  {enableImageComp &&  <ImageDisplay photoUrl={imageUrl} displayPhoto={viewFile} imageComp={setEnableImageComp} resetPhotoUrl={setImageUrl}/>}
    <div className="chatbody-container">
    <header className="chatbody-header">
    <div className="chatbody-profile-pic" onClick={goToHome}>
    <ArrowBackIcon className="chatbody-arrow"/>
    <div className="chatbody-image">
    <img src={xProfile.photoURL} className="chatbody-img"/>
    </div>
    </div>
    
    
    <div className="chatbody-descript">
    <div className="chatbody-name"> {xProfile.displayName}</div>
    <div className="chatbody-online" style={{fontSize:"10px", color:"lawngreen"}}> {otherUserIsTyping ? "Typing" : "Online"} </div>
    </div>
    
    <div className="chatbody-icons">
    <CallIcon className="chatbody-call"/>
    <VideocamIcon className="chatbody-video"/>
    <MoreVertIcon className="chatbody-more"/>
    </div>
    </header>
    
    
    
    <main className="chatbody-main" > 
    
{ msgs ?   msgs.map((el, index)=>{
const date = new Date(el.time)
const hr = date.getHours() > 0 && date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
const mins = date.getMinutes() > 0 && date.getMinutes() < 10 ? "0" + date.getHours() : date.getMinutes()
console.log(el.photoUrl)
const extract = `${hr}:${mins}`
return(
<div key={el.id}>
{el.textMessage ? <div className={userInfo.uid === el.userId ? "chatbody-user-chat" : "chatbody-friends-chat"}>
<div style={{display:"flex"}}>
  {userInfo.uid !== el.userId ?
  ( <div ref={scrollRef} className={userInfo.uid === el.userId ? "chatbody-user-image" : "chatbody-friends-image"}>
    <img src={el.photoURL} className={userInfo.uid === el.userId ? "chatbody-user-img" : "chatbody-friends-img"}/>
    </div>) : ""}
    
    <div className={userInfo.uid === el.userId ? "chatbody-main-user-chat":"chatbody-main-friend-chat"}>
    {el.textMessage}
    
    <div className={userInfo.uid === el.userId ? "chatbody-user-chat-time": "chatbody-friends-chat-time"}>
   <span>  {extract} </span>
   {userInfo.uid === el.userId  ? (el.isOnline ?    <DoneIcon sx={{fontSize:"13px", marginLeft:".2rem"}}/> : <DoneAllIcon sx={{fontSize:"13px", marginLeft:".2rem"}}/>) : ""}
    </div>

    </div>
      {userInfo.uid === el.userId ?
  ( <div className={userInfo.uid === el.userId ? "chatbody-user-image" : "chatbody-friends-image"}>
    <img src={el.photoURL} className={userInfo.uid === el.userId ? "chatbody-user-img" : "chatbody-friends-img"}/>
    </div>) : ""}
    </div>
</div> : ""
}
{el.imageMessage ? (
    <div  className={userInfo.uid === el.userId ? "chatbody-Uimage-box" : "chatbody-Fimage-box"}>
  { userInfo.uid !== el.userId  ? <div className={userInfo.uid !== el.userId ? "chatbody-friends-image" : "chatbody-users-image"}>
    <img src={el.photoURL} className="chatbody-friends-img"/>
    </div> : ""}
  
    <div className="chatbody-chat-img" onClick={()=>{
      increImage(index)
    }}>
    <div className="chatbody-cap">
    <div >

    <img className="chatbody-chat-imgg" src={el.imageMessage}/>
    </div>
   {el.caption ? <div className="caption"> {el.caption} </div>: ""}
   <div className="cap-sec">
       <div className="chatbody-chat-img-time">
    {extract}
    </div>
  
       {el.isOnline ? <DoneIcon/> : <DoneAllIcon sx={{fontSize:"13px", marginRight:".2rem"}} />}
 

    </div>
</div>
    </div>
    
      { userInfo.uid === el.userId  ? 
      <div className={userInfo.uid === el.userId ? "chatbody-users-image" : "chatbody-friends-image"}>
    <img src={el.photoURL} className="chatbody-users-img"/>
    </div> : ""}
        </div>) : ""
}
    </div>
)}) : <Loader/>}
    </main>
  
    <footer className="chatbody-footer">
    <div className="chatbody-input-box">
    <textarea onKeyDown={isUserTyping} value={value} onChange={changeValue} className="chatbody-input"></textarea>
   <div className="chatbody-inicon-box">
   <div style={{overflow:"hidden",position:"relative" ,width:"20px", marginRight:".7rem"}} >
  <input className="image" style={{position:"absolute", opacity:0}}  onChange={getFile} type="file"/>
  <AttachFileIcon />
  </div>
     <div style={{overflow:"hidden",position:"relative" ,width:"30px"}} >
  <input style={{position:"absolute", opacity:0}} type="file" capture="user"/>
    <CameraAltIcon/>
   </div>
    </div>
    </div>
    <SendIcon  onClick={sendMsg} className="chatbody-send-btnn"/>
    </footer>
    </div>
    </>
)
}