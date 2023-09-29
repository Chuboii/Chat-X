import img from "/src/assets/html.webp"
import "./MessageBox.scss"
import ChatBody from "/src/routes/chat body/ChatBody"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

export default function MessageBox(){
  const navigate = useNavigate()
const [smallScreenFunc, setSmallScreenFunc] = useState(null)
  //const [isClicked, setIsClicked] = useState(false)
  useEffect(()=>{
    const messageBody = document.querySelector(".message-container")
    function resizeScreen(){
  const screenWidth = window.innerWidth
  const threshold = 700
  
  if(screenWidth <= 700){
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
  
  
  return (
    <>
    <div className='message-container'>
    <div className="message-image">
    <img src={img} className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    joe doe
    </div>
    <div className="message-text">
    Hey john, longest time hehej hehd udhd ud
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
    
        <div className='message-container'>
    <div className="message-image">
    <img src={img} className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    joe doe
    </div>
    <div className="message-text">
    Hey john, longest time hehej hehd udhd ud
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
    </>
    )
}