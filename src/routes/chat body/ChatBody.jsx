import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./ChatBody.scss"
import img from "/src/assets/html.webp"
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function ChatBody(){
  
  return(
    <div className="chatbody-container">
    <header className="chatbody-header">
    <div className="chatbody-profile-pic">
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
    
    </main>
    
    
    </div>
)
}