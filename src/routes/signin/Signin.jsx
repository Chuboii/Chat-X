import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField'
import { auth, signInWithEmailAndPass, signInWithGooglePopup} from "../../utils/firebase/firebase";
import './Signin.scss'
import signinImg from '/src/assets/html.webp'
import { Link } from "react-router-dom";
import {useContext, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';
import Err from "/src/component/alert/err alert/Err"
import {AlertContext} from "/src/context/AlertContext"
import {useNavigate} from "react-router-dom"
import {db} from "/src/utils/appwrite/appwrite"
import Bg from "/src/component/bg/Bg"
export default function Signin(){
    const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
    const navigate = useNavigate()
    const {setUserInfo} = useContext(UserContext)
   const [done, setDone] = useState(false)
   
   const {isValidationToggled, setErrMessage, setIsValidationToggled} = useContext(AlertContext)
 
   
    const registerOptions = {
        email: {
            required: "You must a provide an email",
            pattern:{
                     value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                 message: "Invalid email address  message"
            }
        },
        password:{
            required: "You must provide a password",
        },
    }

const submitForm = async (data) =>{
  setDone(true)
  try{
  let {user} = await signInWithEmailAndPass(auth, data.email, data.password)
  
 localStorage.setItem("xChatUserInfo", JSON.stringify(user))
   const storage = localStorage.getItem("xChatUserInfo")
   setUserInfo(storage ? JSON.parse(storage) : null)
   setDone(false)
  navigate("/")
  }
  catch(e){
    if(e.code === "auth/invalid-login-credentials"){
      setIsValidationToggled(true)
      setErrMessage("Invalid credentials")
      setDone(false)
    }
  }
   
}

const googleBtn = async () =>{
  setDone(true)
  
  try{
    const {user} = await signInWithGooglePopup()
 console.log(user)
   localStorage.setItem("xChatUserInfo", JSON.stringify(user))
   const storage = localStorage.getItem("xChatUserInfo")
   setUserInfo(storage ? JSON.parse(storage) : null)
   
  
 const getExistingUser  = await db.getDocument("653d5e27b809bb998478","653d5e2e06524e9b0510", user.uid)
 
 setDone(false)
    navigate("/")
  }
  catch(e){
    console.log(e)
    if(e.code === 404){
      setDone(false)
       navigate("/setting+up")
       
    }
    else if(e.code === "auth/popup-closed-by-user"){
      setErrMessage("connection timeout")
      setIsValidationToggled(true)
      setDone(false)
    }
  }
}



const acct  = "Don't have an account?"

    return (
      <>
      {done && <Bg/>}
     {isValidationToggled && <Err/>}

        <form className="signin-form" onSubmit={handleSubmit(submitForm)}>
         <h2 style={{marginBottom:"3rem",textAlign:"center"}}> Welcome Back </h2>
        <div className="signin-image">
        <img src={signinImg} className="signin-img"/>
        </div>
        <div className="si-inp-groups">
<div className='signin-box'>
<label> Email </label>
<input className="si-inp"  type="text" name="email" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p className="signin-err">{errors.email.message} </p>}
</div>

<div className='signin-box'>
<label htmlFor=""> Password </label>
<input className="si-inp"  type="password" name="password"  {...register("password",registerOptions.password)} />

{errors.password && <p className="signin-err">{errors.password.message} </p>}
</div>
</div>
<div className="signin-btn-container">
<button className="signin-btn">Sign in</button>
<GoogleIcon sx={{fontSize:"30px"}}  className="signin-google" type="button" onClick={googleBtn}/>
</div>
<p className="si-acct-link">{acct} <Link to={"/signup"} className="si-link">Sign up</Link></p>

        </form>
        </>
    )
}