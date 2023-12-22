import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD2D4NbtZBm6fg_L-UUB2zTx_RrFLDxGKA",
  authDomain: "qesser-20312.firebaseapp.com",
  projectId: "qesser-20312",
  storageBucket: "qesser-20312.appspot.com",
  messagingSenderId: "678831290841",
  appId: "1:678831290841:web:ebd4009ec23e792a8dc1c8",
  measurementId: "G-V6NLBG9LNY"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const storage = getStorage(app);

export {app, auth, storage};