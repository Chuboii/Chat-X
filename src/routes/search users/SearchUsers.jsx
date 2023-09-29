import img from "/src/assets/html.webp"
import "./SearchUsers.scss"
import {useState, useEffect} from "react"
import {collection, query, where, getDocs, getFirestore} from 'firebase/firestore'
import {createUserFriendRef} from "/src/utils/firebase/firebase"
import SearchIcon from '@mui/icons-material/Search';
import {useContext} from "react"
import {UserContext} from "/src/context/UserContext"

export default function SearchUsers(){
 const [firstNameSearch, setFirstNameSearch] = useState("")
 const [lastNameSearch, setLastNameSearch] = useState("")
 const [fullNameSearch, setFullNameSearch] = useState("")
 const [value, setValue] = useState("")
 const [user, setUser] = useState([])
const {userInfo} = useContext(UserContext)
const [addUser, setAddUser] = useState([])
const [hasUserAdded, setHasUserAdded] = useState(false)

 const db = getFirestore()
 
 
 const changeValue = (e)=>{
   setValue(e.target.value)
   setFirstNameSearch(e.target.value)
   setLastNameSearch(e.target.value)
   setFullNameSearch(e.target.value)
 }
 
 const submitForm = async (e)=>{
   e.preventDefault()
   try{
   await searchUsersFromDb(firstNameSearch, lastNameSearch, fullNameSearch)
   }
   catch(e){
     console.log(e)
   }
 }
 
 
 useEffect(()=>{
   const add = async () => {
     try{
await createUserFriendRef(userInfo, addUser)
   }
   catch(e){
     console.log(e)
   }
   }
   add()
   console.log(addUser)
 }, [addUser])

 
const addFriends = async (idx) => {
  const findItem = user.find(el => el.uid === idx)
  if(findItem){
 
 const changeBtn = user.map(el => {
      if(el.uid === idx){
        return {...el, isFriend:true}
      }
      else{
        return el
}
    })
    setAddUser(changeBtn)
    }

}

  
 const searchUsersFromDb = async (firstNamSearch, lastNamSearch, fullNamSearch) => {
   
   const first = [firstNamSearch]
   const last = [lastNamSearch]
   const full = [fullNamSearch]
   
  const userLocalRef = collection(db, "user global");
try{
  const query1 = await getDocs(query(userLocalRef, where("firstName", "array-contains-any", first)));
  const query2 = await getDocs(query(userLocalRef, where("lastName", "array-contains-any", last)));
  const query3 = await getDocs(query(userLocalRef, where("fullName", "array-contains-any", full)));

  const dataArray = [];

  query1.forEach((doc) => {
    dataArray.push({ id: doc.id, ...doc.data() });
  });

  query2.forEach((doc) => {
    dataArray.push({ id: doc.id, ...doc.data() });
  });

  query3.forEach((doc) => {
    dataArray.push({ id: doc.id, ...doc.data() });
  });

  setUser(dataArray);
}
catch(e){
  console.log(e)
}
 
}

  return (

    <div className="search-user-container">
<div className="search-user-divider">   
   <form onSubmit={submitForm} className="search-user-input-container">
    <input placeholder="Search here to meet people..." value={value} onChange={changeValue} type="search" className="search-user-input"/>
   <button> <SearchIcon className="search-user-ic"/></button>
    </form>
    
    <div className="display-searchItems">
    {user.map((el) => (
    <div key={el.uid} className="search-user-box"> 
    <div className="search-user-image">
    <img src={el.photoURL} className="search-user-img"/>
    </div>
    
    <div className="search-user-descript">
<div className="search-user-name">
{el.displayName}
</div>
<div className="search-user-stat">
sleeping
</div>

<div className="search-user-btn-box">
<button className="search-user-btn" 
onClick = {()=>{
  addFriends(el.uid)
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
))}
    </div>
    </div>
    <div className="search-user-second-divder">

    </div>
    </div>
    )
}