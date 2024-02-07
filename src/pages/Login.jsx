import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
 
// import shareVideo from '../assets/share.mp4' ;
// import logo from '../assets/mejlis-logo.png' ;
// import {client} from '../client';
import { jwtDecode } from "jwt-decode";
//import JWT from 'google-auth-library';
 
const Login = () => {
   

  const responseGoogle = async(response) => {
    localStorage.setItem('user', JSON.stringify(response));
    console.log(response);
    const decoded = jwtDecode(response.credential)
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
    // client.createIfNotExists(doc).then(() => {
    
    // });
  };
  
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relativr w-full h-full'>
        {/* <video src ={shareVideo} type ='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover' /> */}
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 right- left-0 bottom-0 bg-blackOverlay'>
        <div className='p=5'>
          {/* <img  src={logo} width="130px" alt='logo'/> */}
        </div>
        <div className='shadow-2x1'>
          <GoogleOAuthProvider
          clientId="700864335372-7mdeqro3n29nphr7j7q844246doinksm.apps.googleusercontent.com">
            <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy = 'single_host_origin' />
          </GoogleOAuthProvider>

        </div>
      </div>
    </div>
  )
}
export default Login