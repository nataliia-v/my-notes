import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";

import { SignIn } from "./features/auth/signIn";
import { CreateNote } from "./features/notes/components/createNote";
import { UserNotes } from "./features/notes/components/notesList/UserNotes";

import * as db from './firebase'
import { useAuth } from "./shared/hooks";

import "./App.css";

export const loggedUser = atom({
  key: "loggedUser",
  default: null,
});

function HomePage() {
  const user = useRecoilValue<any>(loggedUser);
  
  return (
    <Layout>
      Home Page
      <p>Hello, {user?.displayName}</p>
      <p>UID {user?.uid}</p>
      <UserNotes/>
      <CreateNote/>
    </Layout>
  );
}

function NotePage() {
  return (
    <Layout>
      Note Page
    </Layout>
  );
}


export interface AuthAppProps {
  user: any
}

export const AuthApp: React.FC<AuthAppProps> = ({user}) => {
  
  const [authUser, setAuthUser] = useRecoilState<any>(loggedUser);
  
  const { displayName, email, photoURL, uid } = user;
  
  useEffect(() => {
    user &&
    setAuthUser({
      displayName,
      email,
      photoURL,
      uid
    }
    )}, []);
  
  
  return(
    <>
      <button onClick={()=> {db.logOut()}}>Logout</button>
      <Route path="/:noteId" component={NotePage} />
      <Route exact path="/" component={HomePage} />
    </>
  )
}

function UnAuthApp() {
  return <SignIn />;
}

function App() {

const { user, loading } = useAuth();
  
  if (loading) return <Spin/>

  return (
    user ? <AuthApp user={user}/> : <UnAuthApp/>
  );
}

export default App;
