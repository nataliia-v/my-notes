import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";

import { SignIn } from "./features/auth/signIn";
import { HomePage } from "./features/homePage/components";
import { Header } from "./shared/components/header";

import { useAuth } from "./shared/hooks";

import "./App.css";


export const loggedUser = atom<any>({
  key: "loggedUser",
  default: null,
});


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
      <Header name={'Overview'}/>
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
