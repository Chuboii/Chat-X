import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, createUserDocRef, createUserWithEmailAndPass, signInWithGooglePopup } from "../../utils/firebase/firebase";



export default function Signup(){

const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})

const registerOptions = {
    fullName:
    {
    required: "You must provide a full name"
    },
    username:{
        required: "You must provide a username"
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
   const {user} = await createUserWithEmailAndPass(auth, data.email, data.password)
   let displayName = data.fullName
   let username = data.username
   const otherParams = {displayName, username}
   await createUserDocRef(user, otherParams)
}

    return (
        <form onSubmit={handleSubmit(submitForm)}>
<div className="signup-fnam">


<TextField  label="Firstname" variant="outlined"  name="firstName"  {...register("fullName", registerOptions.fullName)} />


{errors.fullName && <p>{errors.fullName.message}</p>}
</div>

<div className="sf-usernam">

<TextField  label="Username" variant="outlined" name="username" {...register("username", registerOptions.username)}/>

{errors.username && <p>{errors.username.message} </p>}
</div>

<div className="sf-emaill">

<TextField label="Email" variant="outlined" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p>{errors.email.message} </p>}
</div>

<div className='sf-password'>
<label>firstName</label>
<TextField type="password" label="Password" variant="outlined"  {...register("password", registerOptions.password)}/>

{errors.password && <p>{errors.password.message} </p>}
</div>


<div className="sf-confir">

<TextField type="password"  label="Confirm Password" variant="outlined" name="confirmPassword"  {...register("confirmPassword", registerOptions.confirmPassword)} />

{errors.confirmPassword && <p>{errors.confirmPassword.message} </p>}
</div>

<button>Sign up</button>

<p className="sf-or">Or signup using</p>
     <button type="button" onClick={googleBtn}>Google</button>

    <p>Already got an account?</p>
        </form>
    )
}