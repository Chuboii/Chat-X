import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth"
import {getDoc, setDoc, doc, getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAMWUp7rACgSsMhuloiiKLNlmNi9Ki7smU",
    authDomain: "chat-app-8d540.firebaseapp.com",
      projectId: "chat-app-8d540",
        storageBucket: "chat-app-8d540.appspot.com",
          messagingSenderId: "1121751504",
            appId: "1:1121751504:web:92f534dc196beae74569d5",
              measurementId: "G-C1ESKZMN65"
              };

              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
              const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider()

export const auth = getAuth()

googleProvider.setCustomParameters({
 params: "select_account"
})

export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)

export const createUserWithEmailAndPass = async (auth,email, password) => {
    if(!email || !password) return
   
   return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInWithEmailAndPass = async (auth, email, password) =>{
  if(!email || !password) return

  return signInWithEmailAndPassword(auth, email, password)
}


let db = getFirestore()

export const createUserDocRef = async (userAuth, otherParams) => {
   let userRef = doc(db, 'users', userAuth.uid)
   
   try{
   let getUserDoc = await getDoc(userRef)

   if(!getUserDoc.exists()){
   const {displayName, email} = userAuth
   
    let setUserDoc = await setDoc(userRef, {
      displayName,
      email,
      profilePicture: '',
      ...otherParams
    })
   }
   }
   catch(e){
    console.log(e);
   }

}