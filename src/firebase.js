import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyA-PQXXyJ0K2mjOtRjSHYqwvHT_qhtE0z4",
authDomain: "abarrotes-ibsa.firebaseapp.com",
databaseURL: "https://abarrotes-ibsa.firebaseio.com",
projectId: "abarrotes-ibsa",
storageBucket: "",
messagingSenderId: "133711310640",
appId: "1:133711310640:web:cb50c6385090e395"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);