import React, {useEffect, useRef, useState} from 'react';
import firebase from 'firebase';

import { auth, signInWithGoogle } from './firebase';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const unsubscribeFromAuth = useRef<firebase.Unsubscribe>();
  
  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    });
    return () => {
      if (unsubscribeFromAuth.current) {
        unsubscribeFromAuth.current();
      }
    }
  }, [])
  
  
  return (
    <div>
      {currentUser ? (
        <div>
          <div>
            <img src={currentUser.photoURL} />
          </div>
          <div>Name: {currentUser.displayName}</div>
          <div>Email: {currentUser.email}</div>

          <button onClick={() => auth.signOut()}>LOG OUT</button>
        </div>
        ) : <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>}
    </div>
  );
}

export default App;
