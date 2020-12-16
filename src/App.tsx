import React, {useEffect, useRef, useState} from 'react';
import firebase from 'firebase';
import { atom, useRecoilState } from 'recoil';
import { Layout } from 'antd';

import { Sidebar } from './core/componrnts/sidebar/components/sidebar';

import { auth, signInWithGoogle } from './firebase';
import { mainRoutes } from "./App.routing";

import './App.css';


export const userInfo = atom({
  key: 'userInfo',
  default: {
    isAuth: false,
    name: '',
    email: '',
  }
})

function App() {
  const unsubscribeFromAuth = useRef<firebase.Unsubscribe>();
 
  const [currentUser, setCurrentUser] = useState();
  const [isAuthUser, setIsAuthUser] = useRecoilState<any>(userInfo);

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
  useEffect(() => {
    currentUser && setIsAuthUser({isAuth: true, name: currentUser?.displayName, email: currentUser?.email});
  }, [currentUser])
  
  
  return (
    <div>
      {
        currentUser
          ?
          (
            <Layout style={{ minHeight: '100vh' }}>
              <Sidebar/>
              <Layout>
                <main className="content">{mainRoutes}</main>
              </Layout>
            </Layout>
        )
        :
        <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>}
    </div>
  );
}

export default App;
