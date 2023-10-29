import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, createUserWithEmailAndPass, signInWithGooglePopup } from "../../utils/firebase/firebase";
import './Signup.scss'
import signupImg from '/src/assets/html.webp'
import {useContext, useState, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';
import {AlertContext} from "/src/context/AlertContext"
import Err from "/src/component/alert/err alert/Err"
import AddImageSvg from "/src/component/svgs/AddImageSvg"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {updateProfile} from "firebase/auth"
import DarkBg from "/src/component/dark bg/DarkBg"
import Loader from "/src/component/loader/Loader"
import {useNavigate, Link} from "react-router-dom"
import {db, storage} from "../../utils/appwrite/appwrite"
import {v4 as uuidv4} from "uuid"
import SettingUp from "/src/routes/setting up/SettingUp"
export default function Signup(){
const {setUserInfo} = useContext(UserContext)
const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
const {isValidationToggled, setErrMessage, setIsValidationToggled} = useContext(AlertContext)
const [imageUrl, setImageUrl] = useState(null)
const [done, setDone] = useState(false)
const [googleOtherParams, setGoogleOtherParams] = useState([])
const navigate = useNavigate()
const registerOptions = {
    fullName:
    {
    required: "You must provide a firstname"
    },
    email: {
        required: "You must a provide an email",
        pattern:{
                 value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
             message: "Invalid email address  message"

        }
    },
    password:{
        required: "You must provide a password",
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      message: "Password must be 6 to 20 characters long and include at least one letter and one number"
                    
        }
    },
    confirmPassword:{
        required: "You must confirm your password"
    }

}

const googleBtn = async () =>{
  try{
    const {user} = await signInWithGooglePopup()
   
   localStorage.setItem("xChatUserInfo", JSON.stringify(user))
   const userStorage = localStorage.getItem("xChatUserInfo")
   setUserInfo(storage ? JSON.parse(userStorage) : null)
   
    await updateProfile(user, {
    photoURL: user.photoURL,
  })
  /*
  const getExistingUser  = await db.getDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", user.uid)
  
  localStorage.setItem("xChatUserInfo", getExistingUser.user)
   const storage2 = localStorage.getItem("xChatUserInfo")
   setUserInfo(storage ? JSON.parse(storage2) : null)
   */
  
 setTimeout(()=>{
     navigate("/")
    }, 2000)
    
  }
  catch(e){
    console.log(e)
    if(e.code === 404){
      navigate("/setting+up")
      
    }
  }
}




const submitForm = async (data)=>{
  
  if(data.password === data.confirmPassword){
  try{
   const {user} = await createUserWithEmailAndPass(auth, data.email, data.password)
   
await updateProfile(user, {
    displayName: data.fullName
  })
  
localStorage.setItem("xChatUserInfo", JSON.stringify(user))
   const userStorage = localStorage.getItem("xChatUserInfo")
  
   setUserInfo(userStorage ? JSON.parse(userStorage) : null)
  
 setTimeout(()=>{
    navigate("/setting+up")
    }, 2000)

  }
  catch(e){
    console.log(e)
    if(e.code === "auth/email-already-in-use"){
      setIsValidationToggled(true)
      setErrMessage("Email already in use")
    }
  }
  }
  else{
    setIsValidationToggled(true)
    setErrMessage("Passwords do not match")
  }
}





    return (
      <>
      
      {done && <Loader/>}
      {done && <DarkBg/>}
      {isValidationToggled && <Err/>}

        <form onSubmit={handleSubmit(submitForm)} className="signup-form">
           <h2 style={{textAlign:"center", marginBottom:"2rem"}}>Join xChat </h2>
        <div className="signup-image">
        <img className="signup-img" src={signupImg}/>
        </div>
        
        <div className="su-inp-groups">
<div className="signup-box">
<label className="su-label"> Fullname</label>
<input name="fullName" className="su-inp"  {...register("fullName", registerOptions.fullName)} />

{errors.fullName && <p className="signup-err">{errors.fullName.message}</p>}
</div>


<div className="signup-box">
<label className="su-label"> Email</label>
<input className="su-inp" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p className="signup-err">{errors.email.message} </p>}
</div>

<div className='signup-box'>
<label className="su-label"> Password</label>
<input className="su-inp" type="password" name="password"  {...register("password", registerOptions.password)}/>

{errors.password && <p className="signup-err">{errors.password.message} </p>}
</div>


<div className="signup-box">

<label className="su-label"> Confirm Password</label>
<input className="su-inp" type="password" name="confirmPassword"  {...register("confirmPassword", registerOptions.confirmPassword)} />

{errors.confirmPassword && <p className="signup-err">{errors.confirmPassword.message} </p>}
</div>
<div className="signup-btn-container">
<button className="signup-btn">Sign up</button>
<GoogleIcon className="signup-google" sx={{fontSize:"40px"}} type="button" onClick={googleBtn}/>
</div>

    <p className="su-acct-link" style={{color:"white", fontSize:"16px"}}>Already got an account? <Link to={"/signin"} className="su-link" >Sign in</Link></p>
</div>
        </form>
        </>
    )
}