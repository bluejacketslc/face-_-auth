import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAZYyictCNoHJr8ob5TMZY7GzDBp0WwAd0",
    authDomain: "face-auth-5cee3.firebaseapp.com",
    databaseURL: "https://face-auth-5cee3.firebaseio.com",
    projectId: "face-auth-5cee3",
    storageBucket: "face-auth-5cee3.appspot.com",
    messagingSenderId: "34206306693",
    appId: "1:34206306693:web:e2896ea1b6a024ccb134ec"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase