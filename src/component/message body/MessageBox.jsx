import img from "/src/assets/html.webp"
import "./MessageBox.scss"
import ChatBody from "/src/routes/chat body/ChatBody"
import {useNavigate} from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { ToggleContext } from "../../context/ToggleContext"
import client, {db} from "/src/utils/appwrite/appwrite"
import {Query} from "appwrite"
import ImageIcon from '@mui/icons-material/Image';
import {UserContext} from "/src/context/UserContext"
import Loader from "/src/component/loader/Loader"
export default function MessageBox(){
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)
const {setToggleChat, state} = useContext(ToggleContext)
const {userInfo, setXId, setXProfile} = useContext(UserContext)
const [data, setData] = useState(null)
const [dataGotten, setDataGotten] = useState(null)
useEffect(()=>{
  const getData = async () =>{
    const updatedData = {
     msgPrev: []
   }
  await db.createDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid, updatedData) 
  }
  getData()
},[])
useEffect(()=>{
  const getMsgPrev = async () =>{
   try{
   
const res = await db.getDocument("653d5e27b809bb998478", "65414b49b5fdab9333dc", userInfo.uid) 
const date = new Date()
const databaseId = "653d5e27b809bb998478"
const collectionId = "65414b49b5fdab9333dc"


//console.log(res)
   const sorted = res.msgPrev.sort((a,b) =>{
     
      return new Date(JSON.parse(b).time) - new Date(JSON.parse(a).time)
     
   })
   setData(sorted)
  // console.log(sorted)
   client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${userInfo.uid}`, response => {
     setDataGotten(response)
  //    console.log(response)
       const b = response.payload.messages.sort((a,b) => {

       return new Date(JSON.parse(b).time) - new Date(JSON.parse(a).time)
       })
       setData(b)
       
   })
   }
   catch(e){
     console.log(e)
     if(e.code === 404){
       setData([])
     }
   }
   
  }
  
  getMsgPrev()
},[dataGotten])

useEffect(()=>{
  if(userInfo){
  const getData = async() =>{
    const res = await db.getDocument("653d5e27b809bb998478","65414b49b5fdab9333dc", userInfo.uid)
   // console.log(res.msgPrev)
  
  const updatedOnlineStat = res.msgPrev.map(el =>{
    if(JSON.parse(el).userId === userInfo.uid){
      return {...JSON.parse(el), isOnline:true}
    }
    return JSON.parse(el)
  })
  
  //console.log(updatedOnlineStat)
  
  const updatedData = {
    msgPrev: [...updatedOnlineStat.map(el => JSON.stringify(el))]
  }
  //console.log(updatedData)
 // console.log(updatedOnlineStat  console.log(updatedData)
  
 await db.updateDocument("653d5e27b809bb998478","65414b49b5fdab9333dc", userInfo.uid, updatedData)
  }
  getData()
  }
 
},[])

/*
  useEffect(()=>{
    const messageBody = document.querySelector(".message-container")
    function resizeScreen(){
  const screenWidth = window.innerWidth
  const threshold = 700
  
  if(screenWidth <= threshold){
  const navigateToChat = () =>{
    navigate("/chat")
  }
  messageBody.addEventListener("click", navigateToChat)
  
  }
    }
    resizeScreen()
  window.addEventListener("resize", resizeScreen)
 
  return () =>{
    window.removeEventListener("resize", resizeScreen)
  }
  }, [])
  */
 
 
 

const enableChats = (idx, el) =>{
//  console.log(el)
 
  localStorage.setItem("xId", idx)
  const storage = localStorage.getItem("xId")
  setXId(storage)
  localStorage.setItem("xProfile", JSON.stringify(el))
  
  const storage2 = localStorage.getItem("xProfile")
  setXProfile(JSON.parse(storage2))
  navigate("/chat")
}
  console.log(data)
  return (
    <>
    
    {data ? data.length === 0 ? <span style={{margin:"1rem", display:"block", fontSize: "14px"}}>Messages appear here. Search for friends to start a conversation</span>: "" : ""}

  {data ? data.map(el=> {
  
const date = new Date(JSON.parse(el).time)
const hr = date.getHours() > 0 && date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
const mins = date.getMinutes() > 0 && date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

//console.log(JSON.parse(el).isOnline)
const extract = `${hr}:${mins}`
    return (
      <>

  <div onClick={() => {
  enableChats(JSON.parse(el).userId, JSON.parse(el))
}} key={JSON.parse(el).id} className='message-container'  style={{borderBottom:`1px solid ${state.toggleBg ? "#00000083" : " #bababa5f"}`}}>
    <div className="message-image">
    <img src={JSON.parse(el).photoURL} className="message-img" />
      <div className="messageBox-unread" style={{opacity:JSON.parse(el).unread > 0 ? 1 : 0}}>
   </div>
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    {JSON.parse(el).displayName}
    </div>
 
    <div className="message-text">
    {JSON.parse(el).textMessage !== "" ?  JSON.parse(el).textMessage :  <span style={{display:"flex", alignItems:"center"}} > <ImageIcon sx={{marginRight:".3rem"}}/> Photo</span>}
     
    </div>
    </div>
    
    <div className="messageBox-third">
    <div className="messageBox-time">
    {extract}
    </div>

    <div className="messageBox-online" style={{color:`${state.toggleBg ? "#02d902" : "lawngreen"}`}}>
    online
    </div>
    

    </div>
   
    </div>
    </>
  )})  : <Loader/>}
    </>
    )
}