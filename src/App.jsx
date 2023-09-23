import { Route, Routes } from "react-router-dom"
import Signin from "./routes/signin/Signin"
import Signup from "./routes/signup/Signup"
import HomeChat from "./routes/home chat/HomeChat"


function App() {
  
  return (
    <>
 
<Routes>
<Route path='/' element={<HomeChat/>}>

</Route>
<Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
  </Routes>
    </>
  )
}

export default App
