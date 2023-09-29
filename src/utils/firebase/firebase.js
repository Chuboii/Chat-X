import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithPopup, signOut,onAuthStateChanged ,GoogleAuthProvider,signInWithEmailAndPassword ,createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {getDoc, setDoc, doc, getFirestore,updateDoc, arrayUnion} from 'firebase/firestore'
import { getStorage} from "firebase/storage";
import {v4} from "uuid"
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
            export  const app = initializeApp(firebaseConfig);
            export  const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider()

export const auth = getAuth()

googleProvider.setCustomParameters({
 params: "select_account"
})

export const storage = getStorage();


export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)

export const createUserWithEmailAndPass = async (auth,email, password) => {
    if(!email || !password) return
   
   return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInWithEmailAndPass = async (auth, email, password) =>{
  if(!email || !password) return

  return signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback)

export const signOutUser = () => signOut(auth)

export const db = getFirestore()



export const createUserDocRef = async (userAuth, otherParams) => {
   let userGlobalRef = doc(db, 'user global', userAuth.uid)
  
   try{
   let getUserGlobalDoc = await getDoc(userGlobalRef)
//let getUserLocalDoc = await getDoc(userLocalRef)

   if(!getUserGlobalDoc.exists()){
   const {displayName, email, photoURL, uid} = userAuth
  const dateCreated = new Date()
  
  await setDoc(userGlobalRef, {
      uid,
      dateCreated,
      firstName: otherParams[0],
      lastName: otherParams[1],
      fullName: otherParams[2],
      displayName,
      email,
      photoURL,
      isFriend: false,
      isOnline:false
    })
   }
   }
   catch(e){
    console.log(e);
   }

}

export const createUserFriendRef = async (userAuth, addUsers) => {
 const userFriendRef = doc(db, "userFriends", userAuth.uid)
 
const doesDataExists = await getDoc(userFriendRef)
 
if(!doesDataExists.exists()){
   await setDoc(userFriendRef, {
     friends: [{}]
   })
 }
 
 await updateDoc(userFriendRef, {
    friends: arrayUnion({
      ...addUsers
    })
});
}
/*
export const setUserOnlineStatus = async (userAuth, isOnline) => {
  const userRef = doc(db, "userFriends", userAuth.uid)
  
await updateDoc(userRef, {
    isOnline: isOnline,
  });
};
*/