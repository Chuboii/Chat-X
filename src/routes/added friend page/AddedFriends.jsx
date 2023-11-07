import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AddeFriends.scss'
import  VerifiedUser  from '@mui/icons-material/VerifiedUser';
import img from '/src/assets/html.webp'
import {doc, getDoc, query} from 'firebase/firestore'
import {UserContext} from "/src/context/UserContext"

import {useEffect, useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import FriendSearch from "/src/component/friends search/FriendSearch"
import {db} from "/src/utils/appwrite/appwrite"
import Loader from "/src/component/loader/Loader"
export default function AddedFriends(){
const [data, setData] = useState([])
const {userInfo,setXProfile, setXId} = useContext(UserContext)
const navigate = useNavigate()
const [toggleSearch, setToggleSearch] = useState(false)
const [val, setVal] = useState("")

const  toggleSearchBtn = () => {
  setToggleSearch(true)
}

const backToHome = () =>{
  navigate("/")
}


useEffect(()=>{
  const getFriends = async () =>{
    const res = await db.getDocument("653d5e27b809bb998478", "653d5e2e06524e9b0510", userInfo.uid)
    const filtered = JSON.parse(res.user).friends.map(el => el)
    setData(filtered)
  }
  getFriends()
}, [])


const openChat = (idx,el) =>{
  console.log(idx)
  localStorage.setItem("xId",idx)
  localStorage.setItem("xProfile", JSON.stringify(el))
  const storage = localStorage.getItem("xId")
  setXId(storage)
  const storage2 = localStorage.getItem("xProfile")
  setXProfile(JSON.parse(storage2))
 navigate("/chat")
}
    return (
      <>
 
        <div className="added-friends-container">
            {toggleSearch && <FriendSearch
filterSearchData={data} setFilterSearch={setData} toggleSearch={setToggleSearch} setValu={setVal}/>}
        <div className='added-friends-first'>
        <header className='added-friends-header'>
        <div className='added-friends-sub-header'>
        <div className='added-friends-back'>
        <ArrowBackIcon onClick={backToHome}/>
        <div className='added-friends-text'>
        <p className='added-friends-friends'>
        Select friends 
        </p>
        <p className='added-friends-no'>
        {data.length} friend(s)
        </p>

        </div>

        </div>

        <div className='added-friends-icons'>
     <SearchIcon onClick={toggleSearchBtn} sx={{marginRight:"1rem"}}/>
     <MoreVertIcon/>
     </div>
        </div>

        <div className='added-friends-sub-header-two'>
        <div className='added-friends-add-friends'>
        <VerifiedUser sx={{background:"green", padding:'.5rem', borderRadius:'50%'}}/>
        </div>
        
<div className='added-friends-add-friends-text'>
Add Friends
</div>
        </div>
        </header>
        <div className='added-friends-divider-text'>
        Friends on chatty pro (tap to chat)
        </div>

        <main className='added-friends-main'>
       {data ? data.map(el =>(
        <div key={el.id} onClick={()=>{
          openChat(el.userId, el)
        }} className='added-friends-chat-box'>
        <div className='added-friends-image'>
        <img src={el.photoURL} className='added-friends-img'/>
        </div>
        <div className='added-friends-user-info'>
        <p className='added-friends-user-name'>
        {el.displayName}
        </p>
        <p className='added-friends-user-stat'>
        {el.about}
        </p>
        </div>
       </div>
     ) ):<Loader/> }
        </main>
        </div>

        <div className='added-friends-second'>
        hello
        </div>
        </div>
        </>
    )
}