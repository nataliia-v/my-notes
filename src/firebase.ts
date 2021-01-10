import firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage'
import 'firebase/firestore'
import firebaseConfig from "./config/firebase";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const  signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider)
  window.location.reload()
}

export const checkAuth = (cb: any) => {
  auth.onAuthStateChanged(cb)
}

export const logOut = async () => {
  await auth.signOut();
  window.location.reload()
}

export const getCollection = async (id: string) => {
  const snapshot = await db.collection(id).get();
  const data = snapshot.docs.map((doc: any) => ({ id: doc.id,  ...doc.data() }))
  console.log('data', data);
}

export const getUserLists = async (userId: string) => {
  const snapshot = await db
    .collection('notes').where('author', '==', userId)
    .get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id,  ...doc.data() }))
}
