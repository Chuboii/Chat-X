import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, createUserDocRef, storage, createUserWithEmailAndPass, signInWithGooglePopup } from "../../utils/firebase/firebase";
import './Signout.css'
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
import {useNavigate} from "react-router-dom"
export default function Signup(){
const {handleSigninLink} = useContext(UserContext)
const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
const {isValidationToggled, setErrMessage, setIsValidationToggled} = useContext(AlertContext)
const [imageUrl, setImageUrl] = useState(null)
const [done, setDone] = useState(false)
const [googleOtherParams, setGoogleOtherParams] = useState([])
const navigate = useNavigate()
const registerOptions = {
    firstName:
    {
    required: "You must provide a first name"
    },
  lastName:
    {
    required: "You must provide a last name"
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
    const {user} = await signInWithGooglePopup()
    await updateProfile(user, {
    photoURL: user.photoURL,
  })
  const findSpace = user.displayName.split("").indexOf(" ")
  const firstName = user.displayName.split("").splice(0, findSpace)
 const lastName = user.displayName.split("").splice(findSpace, user.displayName.length)
 
  const other = [[firstName.join("")], [lastName.join("")], [user.displayName]]
    await createUserDocRef(user, other)
    if(user){
      navigate("/")
    }
}


useEffect(()=>{
  const fileInput = document.querySelector(".signup-file"); // Assuming you have an input element of type file in your HTML

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
 
  const reader = new FileReader();

  reader.onload = function(event) {

  };

 reader.readAsDataURL(file)
 setImageUrl(file)
});

},[])


const submitForm = async (data)=>{
  
  if(data.password === data.confirmPassword){
  try{
   const {user} = await createUserWithEmailAndPass(auth, data.email, data.password)
   let firstName = data.firstName
   let lastName = data.lastName
   let email = data.email
   let displayName = `${firstName} ${lastName}`
   const fullName = [displayName]
  const additionalNames = [[firstName], [lastName], fullName]
  
  const storageRef = ref(storage, `${displayName} ${user.uid}`);

const uploadTask = uploadBytesResumable(storageRef, imageUrl);

uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');

    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        console.log(progress)
        setDone(true)
        if(progress === 100){
          setDone(false)
        }
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      if(downloadURL){
     await updateProfile(user, {
    displayName,
    email,
    photoURL: downloadURL
     })
     await createUserDocRef(user, additionalNames)
     
      }
      
    })
  }
)
 

 
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
      {done && <Loader/>}
      {done && <DarkBg/>}
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
label="First Name" variant="outlined"  name="firstName"  {...register("firstName", registerOptions.firstName)} />


{errors.firstName && <p className="signup-err">{errors.firstName.message}</p>}
</div>

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
label="Last Name" variant="outlined"  name="lastName"  {...register("lastName", registerOptions.lastName)} />


{errors.lastName && <p className="signup-err">{errors.lastName.message}</p>}
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
<input type="file" accept="image/*" className="signup-file"/>
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