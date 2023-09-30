import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AddeFriends.scss'
import  VerifiedUser  from '@mui/icons-material/VerifiedUser';
import img from '/src/assets/html.webp'
import {doc, getDoc,setDoc,query, getDocs, serverTimestamp, onSnapshot, updateDoc, arrayUnion} from 'firebase/firestore'
import {UserContext} from "/src/context/UserContext"
import {db} from '/src/utils/firebase/firebase'
import {useEffect,useRef,useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import FriendSearch from "/src/component/friends search/FriendSearch"
import {OnSnapshotContext} from "/src/context/OnSnapshotData"

function getData(){
  const storage = localStorage.getItem("friendsInfo")

return storage ? JSON.parse(storage) : {
  friendsID: "",
      friendsName: "",
      friendsImg: "",
      friendsOnline: "",
      friendsPreviewMsg: "",
}
  
}


export default function AddedFriends(){
const [data, setData] = useState([])
const {userInfo} = useContext(UserContext)
const navigate = useNavigate()
const [toggleSearch, setToggleSearch] = useState(false)
const [val, setVal] = useState("")
const [friendsInfo, setFriendsInfo] = useState({
  friendsID: "",
      friendsName: "",
      friendsImg: "",
      friendsOnline: "",
      friendsPreviewMsg: "",
})
const {setPreviewFriendsData, previewFriendsData} = useContext(OnSnapshotContext)


const getFriendsFromDoc = async()=>{
 const userFriendsRef = doc(db, "userFriends", userInfo.uid)
 const getDocRef = await getDoc(userFriendsRef)
 if(getDocRef.exists()){
   const dataRef = getDocRef.data()
   const filteredData = dataRef.friends.filter((el,idx) => idx > 0)
  const filtered = filteredData.filter(el =>{
    return el[0].displayName.toLowerCase().includes(val.toLowerCase())
  })
  setData(filtered)
 }
}

useEffect(()=>{
  const getDocFromDb = async () =>{
    try{
 const friendsPreviewRef = doc(db, "friendsPreviewChat", userInfo.uid)
  const getDocRef = await getDoc(friendsPreviewRef)
  
  if(!getDocRef.exists()){
      await setDoc(friendsPreviewRef, {
       messagePreview:[]
    })
  }
    }
  catch(e){
    console.log(e)
  }
  }
  getDocFromDb()
},[])
/*
useEffect(()=>{
  localStorage.setItem("friendsInfo", JSON.stringify({friendsID: "",
      friendsName: "",
      friendsImg: "",
      friendsOnline: "",
      friendsPreviewMsg: "",
}))
},[])*/
useEffect(()=>{
  
async function friendsPreview(){
  const friendsPreviewRef = doc(db, "friendsPreviewChat", userInfo.uid)
  const getDocRef = await getDoc(friendsPreviewRef)
  console.log(friendsInfo)
  if(getDocRef.exists()){
    if(friendsInfo.uid !== ""){
   const updatedData = {
    messagePreview: arrayUnion({
      friendsID: friendsInfo.uid,
      friendsName: friendsInfo.displayName,
      friendsImg: friendsInfo.photoURL,
      friendsOnline: friendsInfo.isOnline,
      friendsPreviewMsg: "",
    }),
    
    
  };
  
   await updateDoc(friendsPreviewRef, updatedData)
  }
  }
}
 friendsPreview()
}, [friendsInfo])



function getFriendsPreviewUpdated(){
const unsub = onSnapshot(doc(db, "friendsPreviewChat", userInfo.uid), (doc) => {
 // console.log(doc.data())
    setPreviewFriendsData(doc.data())
})
}



useEffect(()=>{
  const getDocFromDb = async()=>{
    try{
 
    await getFriendsFromDoc()
   
    }
    catch(e){
      console.log(e)
    }
  }
  getDocFromDb()
  
  
},[data])

const backToHome = () =>{
  navigate("/")
}
const toggleSearchBtn = () =>{
  setToggleSearch(true)
}

const selectedUser =  (el) =>{
// setFriendsInfo(() => el)
 getFriendsPreviewUpdated()
 localStorage.setItem("friendsInfo", JSON.stringify(el))
 if(el){
   console.log(el)
   navigate("/chat")
 }
 

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
       {
       data.map((el,idx) =>
        <div key={el.uid} className='added-friends-chat-box' onClick={()=>{
        selectedUser(el[0])
       
        }
        }>
        <div className='added-friends-image'>
        <img src={el[0].photoURL} className='added-friends-img'/>
        </div>
        <div className='added-friends-user-info'>
        <p  className='added-friends-user-name'>
        {el[0].displayName}
        </p>
        <p className='added-friends-user-stat'>
        sleeping
        </p>
        </div>
        </div>
     )  }
        </main>
        </div>

        <div className='added-friends-second'>
        hello
        </div>
        </div>
        </>
    )
}