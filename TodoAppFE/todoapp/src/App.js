import React, { useEffect } from 'react';
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
import axios from 'axios';
import TodoList from './TodoList';
import Coins from './coin.png'
function App() {
 
  const [checked, setChecked] = useState(false);
  const [activePage, setActivePage] = useState("login");
  const [coins, setCoins] = useState(0);
  const [isCoinDisplayed, setIsCoinDisplayed] = useState(false);
  const handleSignup = () => {
    setActivePage("signup")
  }

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  }

  const handlePricing = () => {
    setActivePage("pricing")
  }

  const handleAbout = () => {
    setActivePage("about");
  }
  const handleForgetPassword = () => {
    setActivePage("forget-password");
  }

  const checkEmailAvailable = async (email) => {
    const emailData = {
        email: email.trim()
    }
    const response = await axios.post('http://127.0.0.1:5000/check_email_exists', emailData);
    return response.data;
}

  const handleLoginOnLogoClick = () => {
    setActivePage("login");
  }

  return (
    <div className={checked? 'bg-color':null}>
      <div className={`logo-container ${checked ? 'bg-color':null}`}>
        <div className="logo">
          <img src={Logo} className="icon" alt="App Logo" />
          <span className={`app-name cursor-pointer ${checked ? 'bg-color-labels' : ''}`} onClick={handleLoginOnLogoClick}>FlexBoard</span>
          <div className='coins-flex'>
          {isCoinDisplayed ? <img src={Coins} className='coins-css' /> : null} {isCoinDisplayed ? <span className='coin-number'>{coins}</span> : null}
          </div>
        </div>
        <div className="other-features">
          {/* <FormControlLabel className='switch'
            control={<Switch checked={checked} onChange={handleSwitch} />}
            label={checked ? <img src={LightMode} className="switch-icons" /> : <img src={DarkMode} className="switch-icons" />}
          /> */}
          <h4 className={`pricing ${checked ? 'bg-color-labels' : ''}`} onClick={handlePricing}>Prices</h4>
          <h4 className={`signup ${checked ? 'bg-color-labels' : ''}`} onClick={handleForgetPassword}>Forget Password</h4>
          <h4 className={`signup ${checked ? 'bg-color-labels' : ''}`} onClick={handleSignup}>Signup</h4>
          <h4 className={`pricing ${checked ? 'bg-color-labels' : ''}`} onClick={handleAbout}>About</h4>

        </div>
      </div>
      {activePage === 'login' && <LoginPage coins={coins} setCoins={setCoins} setIsCoinDisplayed={setIsCoinDisplayed}/>}
      {activePage === 'signup' && <SignupPage checkEmailAvailable={checkEmailAvailable} />}
      {activePage === 'pricing' && <Pricing />}
      {activePage === 'about' && <About />}
      {activePage === 'forget-password' && <ForgetPassword checkEmailAvailable={checkEmailAvailable} />}
    </div>
  );
}

export default App;
