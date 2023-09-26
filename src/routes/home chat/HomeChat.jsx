import "./HomeChat.scss"
import HomeChatBody from "/src/component/home body/HomeChatBody"
import ChatBody from "/src/routes/chat body/ChatBody.jsx"
export default function HomeChat(){

    return(
      <>
        <div className="homechat-main-body">
        <div className="homechat-divider">
       <div className="homechat-first">
        <HomeChatBody/>
        </div>
        <div className="homechat-second">
      <ChatBody/>
        </div>
        </div>
       
        </div>
        
        </>
    )
}