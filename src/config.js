import  firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDSKkjfiT6aguI0S8w87-Nah1k4Zu2bs0w",
    authDomain: "testpro-1b89d.firebaseapp.com",
    projectId: "testpro-1b89d",
    storageBucket: "testpro-1b89d.appspot.com",
    messagingSenderId: "410528208861",
    appId: "1:410528208861:web:d003bc4f508b7d03dac834",
    measurementId: "G-FEJXDDJB7D"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
 export default fire;