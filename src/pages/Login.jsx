import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Login = () => {
  const responseGoogle = async (response) => {
    localStorage.setItem('user', JSON.stringify(response));
    console.log(response);
    const decoded = jwtDecode(response.credential);
    const { sub, name, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    localStorage.setItem('userName', name);
    localStorage.setItem('picture', picture);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-full h-full">
        {/* Your background content goes here */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay"
      >
        <div className="p-5">
        <TypeAnimation
      sequence={[
  
        'Let\'s experience the xGPT',
        1000, 
        'AI-based Text Manipulations',
        1000,
        'Freemium to use',
        1000,
        'Let\'s get started within 2 seconds',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
        </div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="shadow-2xl p-4"
        >
          <GoogleOAuthProvider
            clientId="700864335372-7mdeqro3n29nphr7j7q844246doinksm.apps.googleusercontent.com"
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
