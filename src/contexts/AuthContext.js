import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase';

const AuthContext = React.createContext();

export const useAuth = ()=> useContext(AuthContext);

export const AuthProvider = ({children}) =>{ //states of app

    const [loading, setloading]= useState(true);//loading state

    const [user, setUser]= useState(null)//user state

    const history = useHistory();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            setloading(false);

            if(user) history.push('/chats');
        })

    }, [user, history]) //update app whenever user object and history changes

    const value ={user};

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}