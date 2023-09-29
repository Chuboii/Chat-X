import "./HomeChat.scss"
import HomeChatBody from "/src/component/home body/HomeChatBody"
import ChatBody from "/src/routes/chat body/ChatBody.jsx"
import ChatIcon from '@mui/icons-material/Chat';
import {useNavigate} from "react-router-dom"
import HomeChatHeader from "/src/component/home header/HomeChatHeader"
import {useContext, useState} from "react"
import {ToggleContext} from "/src/context/ToggleContext"

export default function HomeChat(){
const navigate = useNavigate()
const {setToggleMenu, toggleChat} = useContext(ToggleContext)
const seeFriends = () =>{
  navigate("/friends")
}

    return(
      <>
        <div className="homechat-main-body" onClick={() =>{ setToggleMenu(false)}}>

        <div className="homechat-divider">
       <div className="homechat-first">
        <HomeChatBody/>
      <div className="homechat-chat-icon">
         <ChatIcon className="homechat-chat-icons" onClick={seeFriends}/>
        </div>
         </div>
        <div className="homechat-second">
        <p style={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", fontSize:"40px"}}>Keksbot Companies inc.</p>
        {toggleChat && <ChatBody/>}
        </div>
        </div>
        </div>
        
        </>
    )
}