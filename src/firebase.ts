import firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage'
import firebaseConfig from "./config/firebase";

export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase
