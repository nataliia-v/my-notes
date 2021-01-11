import React, { useEffect } from "react";
import {atom, useRecoilState, useRecoilValue} from "recoil";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";

import { SignIn } from "./features/auth/signIn";
import * as db from './firebase'
import { useAuth } from "./shared/hooks";

import "./App.css";
import useSWR from "swr";
import {NoteItem} from "./features/notes/components/notesList";
import {CreateNote} from "./features/notes/components/createNote";

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
      <UserLists/>
  
      <CreateNote/>
    </Layout>
  );
}

function ListPage() {
  return (
    <Layout>
      List Page
    </Layout>
  );
}

function UserLists() {
  const user = useRecoilValue<any>(loggedUser);
  
  const { data: notes, error } = useSWR(user?.uid, db.getUserNotes)
  
  if (error) return <div>Error: {error.message}</div>
  if (!notes) return <Spin/>
  if (notes.length === 0) return <div>EMPTY</div>
  
  return (
    <Layout>
      {
        notes.map((item: NoteItem) => (
          <div key={item.id}>
            <p>
              {item.name}
            </p>
          </div>
        ))
      }
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
  
      <Route path="/:listId" component={ListPage} />
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
