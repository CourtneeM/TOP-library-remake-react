import React from 'react';

const Home = ({ signIn }) => {
  return (
    <div>
      <h1>Welcome to Library!</h1>
      <p>Please sign in to continue</p>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default Home;
