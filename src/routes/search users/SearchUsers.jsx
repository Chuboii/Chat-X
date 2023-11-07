import img from "/src/assets/html.webp"
import "./SearchUsers.scss"
import {useState, useEffect, useReducer} from "react"
import SearchIcon from '@mui/icons-material/Search';
import {useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {ToggleContext} from "/src/context/ToggleContext"
import {db} from "/src/utils/appwrite/appwrite"
import Loader from "/src/component/loader/Loader"
export default function SearchUsers(){
 const [value, setValue] = useState("")
 const [user, setUser] = useState(null)
const {userInfo} = useContext(UserContext)
const [hasUserAdded, setHasUserAdded] = useState(false)
const [searched, setSearched] = useState(null)
const [isFriend, setIsFriend] = useState(false)
const [isLoaded, setIsLoaded] = useState(false)
 const {toggleMenu,dispatch, state, setToggleMenu} = useContext(ToggleContext)
 
useEffect(()=>{
  const checkFriends = async() =>{
    try{
      if(value){
        const res = await db.getDocument("653d5e27b809bb998478", "653d5e2e06524e9b0510", userInfo.uid)
        
     const allUsers = await db.listDocuments("653d5e27b809bb998478","653d5e2e06524e9b0510")
const store = []

const updateUserFriend = allUsers.documents.map(el =>{

  const findI =JSON.parse(res.user).friends.filter( doc => el.$id === doc.userId)

  if(findI){
   const mapped = findI.map(el => {
     return {...el, isFriend: true}
    })
   store.push(...mapped)
   return mapped
  }
  else{
    return { ...el, isFriend: false };
  }
})
//console.log(store)
const b = allUsers.documents.filter(el => store.every(e => e.userId !== el.$id))
//console.log(b)
const mappedUsers = b.map(el =>{
  return JSON.parse(el.user)
})

const combinedData =[...store, ...mappedUsers]
const getUsers = combinedData.filter(el => {
     return el.displayName.toLowerCase().includes(value.toLowerCase())
   })
setUser(getUsers)
setIsLoaded(false)
}
}
catch(e){
  console.log(e)
}

  }
  checkFriends()
},[searched])

 
 //console.log(user)
 
 
 const changeValue = (e)=>{
   setValue(e.target.value)
 }
 
 
 
 const submitForm = async (e)=>{
   e.preventDefault()
   try{
     if(value){
   
   const res = await db.listDocuments("653d5e27b809bb998478", "653d5e2e06524e9b0510")
  
   setIsLoaded(true)
 //  setUser(getUsers)
     setSearched(res)
  
     }

   }
   catch(e){
     console.log(e)
   }
 }
 
const addFriends = async (idx, friend) => {
  try{
  //  console.log(userInfo.uid)
 const getExistingFriends = await db.getDocument("653d5e27b809bb998478", "653d5e2e06524e9b0510", userInfo.uid)
const duplicate = JSON.parse(getExistingFriends.user).friends.some(el => el.id === friend.id)

 let arr = [...JSON.parse(getExistingFriends.user).friends]
 
if(!duplicate){

arr.push(friend)

 const m = [JSON.parse(getExistingFriends.user)].map(el => {
   return {...el, friends: arr}
 })
 
 //console.log(m)
 const friendData = {
   user:[JSON.stringify(...m)]
 }
// console.log(friendData)

const res = await db.updateDocument("653d5e27b809bb998478", "653d5e2e06524e9b0510", userInfo.uid, friendData)



const allUsers = await db.listDocuments("653d5e27b809bb998478","653d5e2e06524e9b0510")
const store = []

const updateUserFriend = allUsers.documents.map(el =>{

  const findI =JSON.parse(res.user).friends.filter( doc => el.$id === doc.userId)

  if(findI){
   const mapped = findI.map(el => {
     return {...el, isFriend: true}
    })
   store.push(...mapped)
   return mapped
  }
  else{
    return { ...el, isFriend: false };
  }
})
//console.log(store)
const b = allUsers.documents.filter(el => store.every(e => e.userId !== el.$id))
console.log(b)
const mappedUsers = b.map(el =>{
  return JSON.parse(el.user)
})

const combinedData =[...store, ...mappedUsers]
if(value){
const getUsers = combinedData.filter(el => {
     return el.displayName.toLowerCase().includes(value.toLowerCase())
   })
setUser(getUsers)
}

console.log("friend added")
}else{
  console.log("friend exists already")
}
  }
  catch(e){
    console.log(e)
  }
}




  return (
<>

    <div className="search-user-container" style={{background: state.toggleBg ? "white" : "black"}}>
<div className="search-user-divider">   
   <form onSubmit={submitForm} className="search-user-input-container">
    <input placeholder="Search here to meet people..." value={value} onChange={changeValue} type="search" className="search-user-input"/>
   <button> <SearchIcon className="search-user-ic"/></button>
    </form>
    
    <div className="display-searchItems">
{isLoaded && <Loader/>}
    {user ? user.length === 0 ? "No such user found" : "" : ""}
    {user ? user.map((el) => (
    <div key={el.user ? JSON.parse(el.user).id : el.id} className="search-user-box"> 
    <div className="search-user-image">
    <img src={el.user ? JSON.parse(el.user).photoURL: el.photoURL} className="search-user-img"/>
    </div>
    
    <div className="search-user-descript">
<div className="search-user-name">
{el.user ? JSON.parse(el.user).displayName : el.displayName }
</div>
<div className="search-user-stat">
{el.user ? JSON.parse(el.user).about : el.about}
</div>

<div className="search-user-btn-box">
<button className="search-user-btn" 
onClick = {()=>{
  addFriends(el.user ? JSON.parse(el.user).userId : el.userId, el.user ? JSON.parse(el.user) : el)
}
} >
  {el.isFriend ? "Friend Added" : "Add Friend"}
</button>

<button className="search-user-btn" >
 View Profile
</button>
</div>
</div>
</div>
)) : "Nothing to see here"}
    </div>
    </div>
    <div className="search-user-second-divder">

    </div>
    </div>
    </>
    )
}