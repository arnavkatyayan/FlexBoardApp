import React from 'react';
import LoginPage from './LoginPage';
import Logo from './MainIcon.png';
import { Button } from 'react-bootstrap';
import SignupPage from './SignupPage';
import { useState } from 'react';
function App() {
    const [isSignupClicked, setIsSignUpClicked]= useState(false);

    const handleSignup = ()=> {
      setIsSignUpClicked(!isSignupClicked);
    }

   

  return (
    <div className='bg-color'>
      <div className="logo-container bg-color">
        <div className="logo">
          <img src={Logo} className="icon" alt="App Logo" />
          <span className="app-name">FlexBoard</span>
        </div>
        <div className="other-features">
          <h4>Pricing</h4>
          <h4 onClick={handleSignup}>Signup</h4>
        </div>
      </div>
      {isSignupClicked && <SignupPage />}
      {!isSignupClicked ? 
      <div className="App">
        <LoginPage />
      </div> :null }
    </div>
  );
}

export default App;
