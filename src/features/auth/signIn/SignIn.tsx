import React from "react";
import * as db from '../../../firebase';

export const SignIn: React.FC = () => {
  return (
    <div>
      <button onClick={db.signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};
