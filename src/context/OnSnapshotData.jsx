import {createContext, useState} from "react"

export const OnSnapshotContext = createContext()

export const OnSnapshotProvider = ({children}) =>{
  const [friendChatInfo, setFriendChatInfo] = useState({
    photoURL:""
  })
  
  const value = {friendChatInfo, setFriendChatInfo}
  
  return (
    <OnSnapshotContext.Provider value={value}>
    {children}
    </OnSnapshotContext.Provider>
    )
}