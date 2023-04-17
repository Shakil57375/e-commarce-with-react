import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { app } from '../../Firebase/firebase';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app)
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    } 
    const SignIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () =>{
        signOut(auth)
    }

    // observer user auth state

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log("object", currentUser);
            setUser(currentUser)
        })
        // stop observing while unmounting
        return () =>{
            return unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        SignIn,
        createUser,
        logOut
    }
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;