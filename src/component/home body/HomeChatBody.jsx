import "./HomeChatBody.scss"
import UsersOnline from "/src/component/users online/UsersOnline"
import MessageBox from "/src/component/message body/MessageBox"

import HomeChatHeader from "/src/component/home header/HomeChatHeader"

export default function HomeChatBody(){
  
  return (
   <main className="homechat-body">
   <HomeChatHeader/>
   <UsersOnline/>
   <MessageBox/>
   </main>
   )
}