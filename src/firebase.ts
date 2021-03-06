import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import firebaseConfig from './config/firebase';
import { NoteItem } from './features/notes/components/notesList';
import { selector } from 'recoil';
import { loggedUser } from './App';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
};

export const checkAuth = (cb: any) => {
  auth.onAuthStateChanged(cb);
};

export const logOut = async () => {
  await auth.signOut();
  window.location.reload();
};

export const getCollection = async (id: string) => {
  const snapshot = await db.collection(id).get();
  const data = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  console.log('getCollection data', data);
};

export const getUserNotes = async (userId: string) => {
  const snapshot = await db
    .collection('notes')
    .where('author', '==', userId)
    .get();

  console.log(
    'USER DATA',
    snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
  );
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToNotesList = (userId: string, cb: any) => {
  return db.collection('notes').where('author', '==', userId).onSnapshot(cb);
};

export const uploadImage = (file: any) => {
  const uploadTask = storage
    .ref(`images/${file.name}-${file.lastModified}`)
    .put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot: any) => console.log('image uploaded', snapshot),
      reject,
      () => {
        storage
          .ref('images')
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
};

export const createNote = async (note: NoteItem, user: any) => {
  await db.collection('notes').add({
    ...note,
    author: user.uid,
    images: note.images ? await uploadImage(note.images) : null,
    userIds: [user.uid],
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    users: [
      {
        id: user.uid,
        name: user.displayName,
      },
    ],
  });
};

export const deleteNote = (noteId: any) =>
  db.collection('notes').doc(noteId).delete();

export const fetchNotes = selector({
  key: 'notesSelector',
  get: async ({ get }) => {
    const user = get(loggedUser);
    const usersCollection = await db
      .collection('notes')
      .where('author', '==', user?.uid)
      .get();
    return usersCollection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
});
