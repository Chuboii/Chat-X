import { Route, Routes } from "react-router-dom"
import Signin from "./routes/signin/Signin"
import Signup from "./routes/signup/Signup"
import HomeChat from "./routes/home chat/HomeChat"
import ChatBody from "/src/routes/chat body/ChatBody"
import SearchUsers from "/src/routes/search users/SearchUsers"
import AddedFriends from "./routes/added friend page/AddedFriends"


function App() {
 
  return (
    <>
<Routes>
<Route path='/' element={<HomeChat/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/signin" element={<Signin/>}/>
<Route path="/chat" element={<ChatBody/>}/>
<Route path="/search" element={<SearchUsers/>}/>
<Route path="/friends" element={<AddedFriends/>}/>
  
</Routes>
    </>
  )
}

export default App
