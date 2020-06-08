import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDueF7qXIxjPTJRVBtiSdF8xyNHbOCAoKU",
    authDomain: "era-website-278919.firebaseapp.com",
    databaseURL: "https://era-website-278919.firebaseio.com",
    projectId: "era-website-278919",
    storageBucket: "era-website-278919.appspot.com",
    messagingSenderId: "167570430970",
    appId: "1:167570430970:web:79fe6a4138b11d5ad5a243"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const db = firebase.database();
  export const storage = firebase.storage();
