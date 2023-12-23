import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, updateProfile } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {doc, getFirestore, setDoc} from 'firebase/firestore';


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

const db = getFirestore();

const uploadToFirebase = async (uri: string, name:string, onProgress:any) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user logged in");
  }

  const imageRef = ref(getStorage(), `profilePics/${user.uid}/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
        updateProfile(user, {
          photoURL: downloadUrl,
        });

        await setDoc(doc(db, "users", user.uid), {
          photoURL: downloadUrl,
        }, {merge: true});

      }
    );
  });
};

export {app, auth, uploadToFirebase, db};