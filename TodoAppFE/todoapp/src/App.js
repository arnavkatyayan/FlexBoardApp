import React from 'react';
import LoginPage from './LoginPage';
import Logo from './MainIcon.png';
import { Button } from 'react-bootstrap';

function App() {
  return (
    <div>
      <div className="logo-container">
        <div className="logo">
          <img src={Logo} className="icon" alt="App Logo" />
          <span className="app-name">FlexBoard</span>
        </div>
        <div className="other-features">
          <h4>Pricing</h4>
          <h4>Change Password</h4>
          <h4>Signup</h4>
        </div>
      </div>

      <div className="App">
        <LoginPage />
      </div>
    </div>
  );
}

export default App;
