import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';

const Navber = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    // Check if the user is on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check if the app is already installed
    setIsInStandaloneMode(window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);

    // Handle the Android install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <button className="logo">
            <img src="/exp.png" alt="" />
          </button>
        </Link>
        <nav>
          {user ? (
            <div className="">
              {deferredPrompt && (
                <button onClick={handleAddToHomeScreen} className="add-button">
                  <img src="/add-to-home.png" alt="" />
                </button>
              )}
              {isIos && !isInStandaloneMode && (
                <button>
                  <img src="/info.png" alt="" />
                </button>
              )}
              <Link to="/ask">
                <button>
                <img src="/gpt.png" alt="" />
                </button>
              </Link>
              <Link to="/add">
                <button>
                  <img src="/Add.png" alt="" />
                </button>
              </Link>
              <button onClick={handleClick}>
                <img src="/logout.png" alt="" />
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navber;
