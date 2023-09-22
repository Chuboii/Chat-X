import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import { auth, signInWithEmailAndPass} from "../../utils/firebase/firebase";


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

    return (
        <form onSubmit={handleSubmit(submitForm)}>
        <div className="signin-emaill">

<TextField label="Email" variant="outlined" name="email"  {...register("email", registerOptions.email)}/>

{errors.email && <p>{errors.email.message} </p>}
</div>

<div className='signin-password'>
<TextField type="password" label="Password" variant="outlined"  {...register("password", registerOptions.password)}/>

{errors.password && <p>{errors.password.message} </p>}
</div>
<button>Sign in</button>
        </form>
    )
}