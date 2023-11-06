import "./ImageDisplay.scss"
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import img from "/src/assets/html.webp"
import {useEffect, useState, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {db} from "/src/utils/appwrite/appwrite"
import {v4 as uuidv4} from "uuid"

export default function ImageDisplay({photoUrl, displayPhoto, imageComp, resetPhotoUrl}){
  const {userInfo, xProfile, xId} = useContext(UserContext)
  const [value, setValue] = useState("")
  
  useEffect(()=>{
    resetPhotoUrl(null)
  },[])
 
const sendForm = async () =>{
  if(photoUrl){
  try{
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
         textMessage:"",
         imageMessage:photoUrl,
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
  return {...JSON.parse(el), textMessage:"", time: date, imageMessage:photoUrl}
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

//console.log(res)
console.log("updateUser")

}

 
if(!friendDuplicate){
  
     const msgFriendData = JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: userInfo.photoURL,
         textMessage: "",
         imageMessage:photoUrl,
         unreadMsgs:[],
         unread: 0,
         time: date,
         lastMsg: [],
         isTyping: "",
         isOnline: false,
         idCombined: combinedId
       })

msgFriendUserDoc.msgPrev.push(msgFriendData)


const mapped = msgFriendUserDoc.msgPrev.map(el => {
  return {...JSON.parse(el), textMessage: "",imageMessage: photoUrl,  unread:1}
})

 const updatedMsgFPrevData = {
   msgPrev: [...mapped.map(el => JSON.stringify(el))]
 }
 
 
const res2 =  await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId, updatedMsgFPrevData)


}
else{
  console.log("item exists")

 const msgFriendUserDoc = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId)
 
const date = new Date()

const updateFriend = msgFriendUserDoc.msgPrev.map(el =>{
  if(JSON.parse(el).userId === userInfo.uid){
  return {...JSON.parse(el), time: date,imageMessage:photoUrl, textMessage: "", unread: 1}
  }
  else{
    return JSON.parse(el)
  }
})
//console.log(updateFriend)

const updatedFriend = {
  msgPrev: [...updateFriend.map(el => JSON.stringify(el))]
}
console.log(updatedFriend)

const res = await db.updateDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", xProfile.userId, updatedFriend)

console.log(res)
console.log("updateFriend")
}
} catch(e){
  console.log(e)
}

  try{
    
  const currUserId = userInfo.uid.split("").slice(0, 15).join("")
     const friendId = xId.split("").slice(0, 15).join("")
     const combinedId = [currUserId, friendId].sort().join("")
     
  const existingUserMsg = await db.getDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId)
  
  const date = new Date()
 const data = JSON.stringify({
         id: uuidv4(),
         userId: userInfo.uid,
         displayName: userInfo.displayName,
         photoURL: userInfo.photoURL,
         textMessage: "",
         imageMessage: photoUrl,
         unread: 0,
         time: date,
         lastMsg: [],
         isTyping: "",
         isOnline: false,
         caption: value,
         idCombined: combinedId
       })
  existingUserMsg.messages.push(data)

const updatedData = {
   messages: existingUserMsg.messages
 }
 
 await db.updateDocument("653d5e27b809bb998478", "654283639f58b9326706", combinedId, updatedData)

  console.log("done")
  imageComp(false)
    
  }
  catch(e){
    console.log(e)
  }
  }
}

const changeValue = (e) =>{
   setValue(e.target.value)
}
  
  return(
    <>
    <div className="imagedisplay-container">
    <header className="id-header">
    <CloseIcon onClick={() => imageComp(false)}/>
    </header>
    <main className="id-main">
  {photoUrl ?  <img src={photoUrl} className="id-main-img"/> : "loading"}
    </main>
    
    <footer className="id-footer">
    <div style={{padding:".5rem", width:"100%"}}>
    <input value={value} onChange={changeValue} placeholder="Add a caption..." className="idf-input" type="text"/>
    </div>
    <div className="idf-second">
    <p className="idf-name">{xProfile.displayName}</p>
    <button onClick={sendForm} className="idf-button"> <SendIcon/> </button>
    </div>
    </footer>
    </div>
    </>
    )
}