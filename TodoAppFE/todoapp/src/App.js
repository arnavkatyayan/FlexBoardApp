import React from 'react';
import LoginPage from './LoginPage';
import Logo from './MainIcon.png';
import { Button } from 'react-bootstrap';
import SignupPage from './SignupPage';
import { useState } from 'react';
import { Switch, FormControlLabel } from "@mui/material";
import LightMode from './light-mode.png';
import DarkMode from './dark-mode.png';
import Pricing from './Pricing';
import About from './About';
import ForgetPassword from './ForgetPassword';

function App() {
  const [isSignupClicked, setIsSignUpClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isPricing, setIsPricing] = useState(false);
  const [isAbountClicked, setIsAboutClicked] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);

  const handleSignup = () => {
    setIsSignUpClicked(!isSignupClicked);
  }

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  }

  const handlePricing = () => {
    setIsPricing(!isPricing);
  }

  const handleAbout = () => {
    setIsAboutClicked(true);
  }
  const handleForgetPassword = () => {
    setForgetPass(true);
  }

  return (
    <div className={checked? 'bg-color':null}>
      <div className={`logo-container ${checked ? 'bg-color':null}`}>
        <div className="logo">
          <img src={Logo} className="icon" alt="App Logo" />
          <span className={`app-name ${checked ? 'bg-color-labels' : ''}`}>FlexBoard</span>
        </div>
        <div className="other-features">
          <FormControlLabel className='switch'
            control={<Switch checked={checked} onChange={handleSwitch} />}
            label={checked ? <img src={LightMode} className="switch-icons" /> : <img src={DarkMode} className="switch-icons" />}
          />
          <h4 className={`pricing ${checked ? 'bg-color-labels' : ''}`} onClick={handlePricing}>Pricing</h4>
          <h4 className={`signup ${checked ? 'bg-color-labels' : ''}`} onClick={handleForgetPassword}>Forget Password</h4>
          <h4 className={`signup ${checked ? 'bg-color-labels' : ''}`} onClick={handleSignup}>Signup</h4>
          <h4 className={`pricing ${checked ? 'bg-color-labels' : ''}`} onClick={handleAbout}>About</h4>

        </div>
      </div>
      {isSignupClicked && <SignupPage />}
      {isPricing && <Pricing/>}
      {isAbountClicked && <About/>}
      {forgetPass && <ForgetPassword/>}
      {!isSignupClicked && !forgetPass && !isPricing && !isAbountClicked ?
        <div className="App">
          <LoginPage />
        </div> : null}
    </div>
  );
}

export default App;
