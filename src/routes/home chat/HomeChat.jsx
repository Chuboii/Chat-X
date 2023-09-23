import "./HomeChat.scss"
import HomeChatHeader from "/src/component/home header/HomeChatHeader"
import HomeChatBody from "/src/component/home body/HomeChatBody"

export default function HomeChat(){

    return(
      <>
        <div class="homeChat-body">
        <HomeChatHeader/>
        <HomeChatBody/>
        
       
        </div>
        
        </>
    )
}