import React, {useRef, useState, useEffect} from 'react'
import { useHistory} from 'react-router-dom';
import {Avatar, ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

const Chats = ()=>{
    const history = useHistory();
    const {user}= useAuth();
    const [loading, setLoading]= useState(true);

    const handleLogout = async ()=>{
        await auth.signOut();
        history.push('/')
    }

    const getFile = async (url)=>{
        const response = await fetch(url)
        const data = await response.blob(); // it contain image
        return new File([data], "userPhoto.jpg", {type:"image/jpeg"})
    }

    useEffect(()=>{
        if(!user){
            history.push('/')
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": "7f28bc95-75da-4f43-8b9f-4ae185222847",
                "user-name" : user.email,
                "user-secret" : user.uid
            }
        })
        .then(() => setLoading(false))
        .catch(e => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
            .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post ('https://api.chatengine.io/users',
                        formdata,
                        {headers: {"private-key" : "f6ad2483-ae52-4b74-b42a-805d524592c3"}}
                    )
                    .then(() => setLoading(false))
                    .catch(e => console.log('e', e.response))
                })
        })

    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    TrueChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                     Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="7f28bc95-75da-4f43-8b9f-4ae185222847"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
};

export default Chats