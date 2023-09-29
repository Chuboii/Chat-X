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


export default function ChatBody(){
  const navigate = useNavigate()
  
  
  return(
    <div className="chatbody-container">
    <header className="chatbody-header">
    <div className="chatbody-profile-pic" onClick={()=>{
      navigate("/")
    }}>
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
    <div className="chatbody-friends-chat">
    <div className="chatbody-friends-image">
    <img src={img} className="chatbody-friends-img"/>
    </div>
    
    <div className="chatbody-main-friend-chat">
    Hello John.. How are you?
    
    <div className="chatbody-friends-chat-time">
    11:37 AM
    </div>
    </div>
    </div>
    
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
    
    </main>
    
    <footer className="chatbody-footer">
    <div className="chatbody-input-box">
    <textarea className="chatbody-input"></textarea>
   <div className="chatbody-inicon-box">
    <AttachFileIcon sx={{marginRight:'.5rem'}}/>
    <CameraAltIcon/>
    </div>
    </div>
    <SendIcon className="chatbody-send-btn"/>
    </footer>
    </div>
)
}