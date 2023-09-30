import {createContext, useState} from "react"

export const OnSnapshotContext = createContext()

export const OnSnapshotProvider = ({children}) =>{
  const [previewFriendsData, setPreviewFriendsData] = useState({
     friendsID: "",
      friendsName: "",
      friendsImg: "",
      friendsOnline: "",
      friendsPreviewMsg: "",
      dateSent: ""
  })
  
  const value = {previewFriendsData, setPreviewFriendsData}
  
  return (
    <OnSnapshotContext.Provider value={value}>
    {children}
    </OnSnapshotContext.Provider>
    )
}