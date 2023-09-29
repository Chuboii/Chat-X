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
const {setToggleMenu} = useContext(ToggleContext)
const seeFriends = () =>{
  navigate("/friends")
}

    return(
      <>
        <div className="homechat-main-body" onClick={() =>{ setToggleMenu(false)}}>

        <div className="homechat-divider">
       <div className="homechat-first">
        <HomeChatBody/>
        </div>
        <div className="homechat-second">
      <ChatBody/>
        </div>
        </div>
       <ChatIcon onClick={seeFriends} sx={{position:"fixed", bottom:"40px",  right:"40px", background:"green", padding:"1rem", borderRadius:"50%", fontSize:"30px"}}/>
        </div>
        
        </>
    )
}