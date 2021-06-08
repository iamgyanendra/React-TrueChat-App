import firebase from 'firebase/app';
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyAZtblgFNGUNquYeTpgfNsLbPLqU4em19c",
    authDomain: "truechat-7debe.firebaseapp.com",
    projectId: "truechat-7debe",
    storageBucket: "truechat-7debe.appspot.com",
    messagingSenderId: "1070738381957",
    appId: "1:1070738381957:web:a09f5c947bc3f20e061dec"
  }).auth();