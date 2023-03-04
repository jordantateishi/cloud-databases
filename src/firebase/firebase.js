import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2v86Tg6uZVS41AugNHHqww-VcmyqXhIc",
  authDomain: "module4-c0a57.firebaseapp.com",
  projectId: "module4-c0a57",
  storageBucket: "module4-c0a57.appspot.com",
  messagingSenderId: "210672905602",
  appId: "1:210672905602:web:05429bea7869c46c0db39b"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };