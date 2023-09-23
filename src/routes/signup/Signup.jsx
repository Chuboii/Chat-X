import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, createUserDocRef, createUserWithEmailAndPass, signInWithGooglePopup } from "../../utils/firebase/firebase";
import './Signout.css'
import { Link } from "react-router-dom";
import signupImg from '/src/assets/html.webp'
import {useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';
import {AlertContext} from "/src/context/AlertContext"
import Err from "/src/component/alert/err alert/Err"
import AddImageSvg from "/src/component/svgs/AddImageSvg"

export default function Signup(){
const {handleSigninLink} = useContext(UserContext)
const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
const {isValidationToggled, setErrMessage, setIsValidationToggled} = useContext(AlertContext)
 
const registerOptions = {
    fullName:
    {
    required: "You must provide a full name"
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
      message: "Password must be 8 to 20 characters long and include at least one letter and one number"
                    
        }
    },
    confirmPassword:{
        required: "You must confirm your password"
    }

}

const googleBtn = async () =>{
    const {user} = await signInWithGooglePopup()
    await createUserDocRef(user)
    
}
const submitForm = async (data)=>{
  
  if(data.password === data.confirmPassword){
  try{
   const {user} = await createUserWithEmailAndPass(auth, data.email, data.password)
   let displayName = data.fullName
   const otherParams = {displayName}
   const file = data.file[0]
   await createUserDocRef(user, otherParams, file)
  }
  catch(e){
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
      {isValidationToggled && <Err/>}
        <form onSubmit={handleSubmit(submitForm)} className="signup-form">
        <div className="signup-image">
        <img className="signup-img" src={signupImg}/>
        </div>
        <div className="inputs">
<div className="signup-firstn">


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
label="Display Name" variant="outlined"  name="firstName"  {...register("fullName", registerOptions.fullName)} />


{errors.fullName && <p className="signup-err">{errors.fullName.message}</p>}
</div>



<div className="signup-email">

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

{errors.email && <p className="signup-err">{errors.email.message} </p>}
</div>

<div className='signup-password'>

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
type="password" label="Password" variant="outlined"  {...register("password", registerOptions.password)}/>

{errors.password && <p className="signup-err">{errors.password.message} </p>}
</div>


<div className="signup-cp">

<TextField InputProps={{
    style: {
      color: 'white',
    },
  }}  
  InputLabelProps={{
    style: {
      color: 'black',
    },
  }} type="password"  label="Confirm Password" variant="outlined" name="confirmPassword"  {...register("confirmPassword", registerOptions.confirmPassword)} />

{errors.confirmPassword && <p className="signup-err">{errors.confirmPassword.message} </p>}
</div>
<div className="signup-avatar">
<AddImageSvg/>
<div className="signup-file-box">
<p>Add an avatar </p>
<input type="file" className="signup-file"/>
</div>
</div>
<div className="signup-btn-container">
<button className="signup-btn">Sign up</button>
<GoogleIcon className="signup-google" type="button" onClick={googleBtn}/>
</div>

    <p className="signup-acct">Already got an account? <button type="button" className="signup-link" onClick={handleSigninLink} >Sign in</button></p>
</div>
        </form>
        </>
    )
}