import React from 'react';

const SignInBar = ({ signOut, user }) => {
  
  return (
    <div>
      <p>{user.displayName}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default SignInBar;
