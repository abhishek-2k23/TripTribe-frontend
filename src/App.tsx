import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import SignIn from './page/SignIn';
import Hero from './page/Hero';
import SSOCallback from './page/SSOCallback';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Navigate to="/signin" />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
          <Route
            path="/home"
            element={
              <>
                <SignedIn>
                    <Home />
                </SignedIn>
                <SignedOut>
                  <SignIn />
                </SignedOut>
              </>
            }
          />
          </Routes>
        </>
  );
}

export default App;
