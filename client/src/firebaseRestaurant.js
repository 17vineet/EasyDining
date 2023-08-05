import { initializeApp } from "firebase/app";

const firebaseConfigRestaurant = {
    apiKey: "AIzaSyCB6AVtOBTZcxx4tM_6TYjAQnjCIRSq3WU",
    authDomain: "easydiningrestaurant.firebaseapp.com",
    databaseURL: "https://easydiningrestaurant-default-rtdb.firebaseio.com",
    projectId: "easydiningrestaurant",
    storageBucket: "easydiningrestaurant.appspot.com",
    messagingSenderId: "501911691695",
    appId: "1:501911691695:web:3fc6b9c5216508623d8f5a"
}

export const appRestaurant = initializeApp(firebaseConfigRestaurant);
