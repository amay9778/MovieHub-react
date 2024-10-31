import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB7ilAYTiRY_3A5x83wIA4bU3SIK_-P5XA",
  authDomain: "netflix-clone-afe2a.firebaseapp.com",
  projectId: "netflix-clone-afe2a",
  storageBucket: "netflix-clone-afe2a.appspot.com",
  messagingSenderId: "1007531283562",
  appId: "1:1007531283562:web:9f50809eebc1bd0dfe6613"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
         const res = await createUserWithEmailAndPassword(auth,email,password);
         const user = res.user;
         await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider :"local",
            email,
         })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('')[1].split('-').join(" "));
    }

}
const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('')[1].split('-').join(" "));
        
    }
}
const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout}