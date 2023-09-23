import "./HomeChatBody.scss"
import UsersOnline from "/src/component/users online/UsersOnline"
import MessageBox from "/src/component/message body/MessageBox"

export default function HomeChatBody(){
  
  return (
   <main className="homechat-body">
   <UsersOnline/>
   <MessageBox/>
   </main>
   )
}