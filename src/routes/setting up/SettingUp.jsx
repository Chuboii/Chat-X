import "./SettingUp.scss"
import { useForm} from "react-hook-form"
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import {AlertContext} from "/src/context/AlertContext"
import {useNavigate} from "react-router-dom"
import AddImageSvg from "/src/component/svgs/AddImageSvg"
import {db, storage} from "../../utils/appwrite/appwrite"
import {v4 as uuidv4} from "uuid"
import {updateProfile} from "firebase/auth"

export default function SettingUp(){
  const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
    const navigate = useNavigate()
    const {setUserInfo, userInfo} = useContext(UserContext)
    const [imageUrl, setImageUrl] = useState(null)
   const {isValidationToggled, setErrMessage, setIsValidationToggled} = useContext(AlertContext)
  
   
    const registerOptions = {
        username: {
            required: "You must a provide an username",
         
        },
        bio:{
            required: "You must provide a bio",
        },
    }
  
  
  
  
  
  
const submitForm = async (data) =>{
  
 try{
  
await storage.createFile('653d953494837028fddf', userInfo.uid, imageUrl);
  const imgHref = await storage.getFileView("653d953494837028fddf", userInfo.uid);
//console.log(imgHref)
     const date = new Date()
     
 const userDoc = {
   user: [JSON.stringify({
    id: uuidv4(),
    displayName: userInfo.displayName,
    email:userInfo.email,
    dateCreated: date,
    photoURL: imgHref.href,
    friends: [],
    about:data.bio,
    username:data.username,
    isOnline: false,
    userId: userInfo.uid
   })]
 }

   
//console.log(user)
 await db.createDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", userInfo.uid, userDoc)
 navigate("/")
 console.log("done")
 }
 catch(e){
   console.log(e)
 }
}

const uploadImage = (e) =>{
  setImageUrl(e.target.files[0])
 // console.log(e.target.files[0])
}

  return(
<>
<div className="settingup-container">
<h3 style={{textAlign:"center", marginBottom:"2.5rem"}}> Almost Done! </h3>
<form className="seu-form" onSubmit={handleSubmit(submitForm)}>
<div className="seu-box">
<label className="seu-lab"> Username </label>
<input type="text" name="username" className="seu-inp"  {...register("username", registerOptions.username)}/>
{errors.username && <p className="signup-err">{errors.email.username} </p>}
</div>

<div className="seu-box">
<label className="seu-lab"> Bio </label>
<input type="text" name="bio" className="seu-inp"   {...register("bio", registerOptions.bio)}/>

{errors.bio && <p className="signup-err">{errors.bio.message} </p>}
</div>

<div className="signup-avatar">
<AddImageSvg/>
<div className="signup-file-box">
<p style={{marginLeft:".5rem"}}>Add an avatar </p>
<input onChange={uploadImage}  type="file" accept="image/*" className="signup-file"/>
</div>
</div>

<button className="seu-btn"> Finish Up </button>
</form>
</div>
</>
    )
}