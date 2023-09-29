import "./HomeChatBody.scss"
import UsersOnline from "/src/component/users online/UsersOnline"
import MessageBox from "/src/component/message body/MessageBox"

import HomeChatHeader from "/src/component/home header/HomeChatHeader"
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import HomeMenu from "/src/component/home menu/HomeMenu"
import {ToggleContext} from "/src/context/ToggleContext"
export default function HomeChatBody(){
  const {setToggleMenu} = useContext(ToggleContext)
  
  const turnOffMenu = () =>{
    setToggleMenu(false)
  }
  return (
   <main className="homechat-body" onClick={turnOffMenu}>
   <HomeChatHeader/>
   <UsersOnline/>
   <MessageBox/>
   </main>
   )
}