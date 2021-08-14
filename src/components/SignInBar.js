import React, { useEffect, useState } from 'react';

const SignInBar = ({ signedIn, signIn, signOut, user }) => {
  const [userName, setUserName] = useState(user);

  useEffect(() => {
    signedIn && user ? setUserName(user.displayName) : setUserName('Test');
  }, [signedIn, user]);

  return (
    <div>
      <p>{userName}</p>
      {
        signedIn ?
        <button onClick={signOut}>Sign Out</button> :
        <button onClick={signIn}>Sign In</button>
      }
    </div>
  );
}

export default SignInBar;
