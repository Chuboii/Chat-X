import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField'
import { auth, signInWithEmailAndPass, signInWithGooglePopup} from "../../utils/firebase/firebase";
import './Signin.css'
import signinImg from '/src/assets/html.webp'
import { Link } from "react-router-dom";
import {useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';
import Err from "/src/component/alert/err alert/Err"
import {AlertContext} from "/src/context/AlertContext"

export default function Signin(){
    const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
    const {handleSignupLink} = useContext(UserContext)
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
  try{
  let {user} = await signInWithEmailAndPass(auth, data.email, data.password)
  }
  catch(e){
    if(e.code === "auth/invalid-login-credentials"){
      setIsValidationToggled(true)
      setErrMessage("Invalid credentials")
    }
  }
   
}

const googleBtn = async (data) =>{
    const {user} = await signInWithGooglePopup()
}



const acct  = "Don't have an account?"

    return (
      <>
     {isValidationToggled && <Err/>}
     
        <form className="signin-form" onSubmit={handleSubmit(submitForm)}>
        <div className="signin-image">
        <img src={signinImg} className="signin-img"/>
        </div>
        <div className="sigin-inputs">
        <div className="signin-email">

<TextField
InputProps={{
    style: {
      color: 'white',
    },
  }}  
  InputLabelProps={{
    style: {
      color: 'black',
    },
  }}
 label="Email" variant="outlined" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p className="signin-err">{errors.email.message} </p>}
</div>

<div className='signin-password'>

<TextField InputProps={{
    style: {
      color: 'white',
    },
  }}  
  InputLabelProps={{
    style: {
      color: 'black',
    },
  }}
  type="password" label="Password" variant="outlined"  {...register("password",registerOptions.password)} />


{errors.password && <p className="signin-err">{errors.password.message} </p>}
</div>

<div className="signin-btn-container">
<button className="signin-btn">Sign in</button>
<GoogleIcon className="signin-google" type="button" onClick={googleBtn}/>
</div>
<p className="signin-acct">{acct} <button type="button" className="signin-link" onClick={handleSignupLink}>Sign up</button></p>
</div>

        </form>
        </>
    )
}