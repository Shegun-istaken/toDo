// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHG9SZsFrJUHmBWt0QB6lzUcmcICeZeEc',
  authDomain: 'buystuff-altschool.firebaseapp.com',
  projectId: 'buystuff-altschool',
  storageBucket: 'buystuff-altschool.appspot.com',
  messagingSenderId: '955589185302',
  appId: '1:955589185302:web:04d3192b4efeaf9c178a37'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
