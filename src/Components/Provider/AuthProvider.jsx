import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { app } from '../../Firebase/firebase';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const auth = getAuth(app)
    const createUser = (email, password) =>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    } 
    const SignIn = (email, password) =>{
        setLoader(true);
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
            setLoader(false)
        })
        // stop observing while unmounting
        return () =>{
            return unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        loader,
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