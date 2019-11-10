import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyDeSLeDkr4u40jNaFcaTo8_w4ixzSLsFug",
    authDomain: "todo-rrf-316-b40ce.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-b40ce.firebaseio.com",
    projectId: "todo-rrf-316-b40ce",
    storageBucket: "todo-rrf-316-b40ce.appspot.com",
    messagingSenderId: "653995999863",
    appId: "1:653995999863:web:f10a356a9e790353643c72",
    measurementId: "G-2P19GPW6XE"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;