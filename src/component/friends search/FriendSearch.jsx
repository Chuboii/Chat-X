import SearchIcon from '@mui/icons-material/Search';
import "./FriendSearch.scss"
import {useState, useEffect} from "react"
import CloseIcon from '@mui/icons-material/Close';
export default function FriendSearch({toggleSearch, setFilterSearch, filterSearchData, setValu}){
 const [value, setValue] = useState("")

   
   
   
 
  const toggle = () =>{
    toggleSearch(false)
  }
  
  const changeValue = (e) =>{
    setValu(e.target.value)
    setValue(e.target.value)

  }
  return (
    <form className="friend-search-container" onSubmit={(e)=> e.preventDefault()}>
    <CloseIcon sx= {{fontSize:"40px", borderRadius:"50%"}} onClick={toggle}/>
    <input value={value} onChange={changeValue} type="search" name="search" className="friend-search-input" />
    <SearchIcon sx={{fontSize:"30px", padding:".5rem", background:"green", borderRadius:"50%"}}/>    
    </form>
    )
}