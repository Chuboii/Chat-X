import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, signInWithEmailAndPass, signInWithGooglePopup} from "../../utils/firebase/firebase";
import './Signin.css'
import signinImg from '/src/assets/html.webp'
import { Link } from "react-router-dom";

export default function Signin(){



    const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})

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
  let {user} = await signInWithEmailAndPass(auth, data.email, data.password)
   console.log(user);
}

const googleBtn = async (data) =>{
    const {user} = await signInWithGooglePopup()
}

const acct  = "Don't have an account?"
    return (
        <form className="signin-form" onSubmit={handleSubmit(submitForm)}>
        <div className="signin-image">
        <img src={signinImg} className="signin-img"/>
        </div>
        <div className="sigin-inputs">
        <div className="signin-email">

<TextField label="Email" variant="outlined" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p className="signin-err">{errors.email.message} </p>}
</div>

<div className='signin-password'>
<TextField type="password" label="Password" variant="outlined"  {...register("password", registerOptions.password)}/>

{errors.password && <p className="signin-err">{errors.password.message} </p>}
</div>

<div className="signin-btn-container">
<button className="signin-btn">Sign up</button>
<button className="signin-google" type="button" onClick={googleBtn}>Google</button>
</div>
<p className="signin-acct">{acct} <Link className="signin-link" to={'/signup'}>Sign up</Link></p>
</div>

        </form>
    )
}