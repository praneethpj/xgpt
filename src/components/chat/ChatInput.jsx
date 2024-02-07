import React, { useState } from 'react';

import { googleLogout } from '@react-oauth/google';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('userName');
  const image = localStorage.getItem('picture');

  const handleSendMessage = () => {
    onSendMessage({ message });
    setMessage('');
  };

  const logout = () => {
    googleLogout();
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <form className='fixed bottom-0 left-0 right-0 py-1 px-1 bg-gray-50 rounded-lg dark:bg-gray-700'>
      <div className='flex'>

        <div className='m-2'>
          <img
            src={`${image}`}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            alt={`${username}'s avatar`}
            referrerpolicy="no-referrer"
          />

        </div>

        <div className=' text-slate-300 w-1/6 m-3'>
          <div  >
            {username}
          </div>
          <div >
            <button onClick={logout}><span className='text-slate-300 text-xs'>SignOut</span></button>
          </div>
        </div>

        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 w-5/6">

          <textarea
            id="chat"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          ></textarea>
          <button type="button" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600" onClick={handleSendMessage}>
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;