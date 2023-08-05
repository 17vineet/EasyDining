
import { initializeApp } from "firebase/app";

const firebaseConfigCustomer = {
  apiKey: "AIzaSyAwAnPzGSMtoNtlLV60KcquRUpU-MLs4ec",
  authDomain: "easydiningcustomer.firebaseapp.com",
  databaseURL: "https://easydiningcustomer-default-rtdb.firebaseio.com",
  projectId: "easydiningcustomer",
  storageBucket: "easydiningcustomer.appspot.com",
  messagingSenderId: "526965226455",
  appId: "1:526965226455:web:d3441166b5c740f1f7e992"
};

export const appCustomer = initializeApp(firebaseConfigCustomer);
