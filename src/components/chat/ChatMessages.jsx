import React from 'react';

const ChatMessages = ({ receivedMessages }) => {
 
  return (
    <>
      {receivedMessages.map((messageData, index) => (
      
            <div key={index}>
            {messageData.sender === 'User' ? (
              <>
                <span className='font-bold text-white'>User</span>
                <br />
                <span className='text-white'>{messageData.content}</span>
                <br />
              </>
            ) : (
              <>
                <span className='font-bold text-white'>xGpt</span>
                <br />
                <span className='text-white'>{messageData.content}</span>
                <br />
              </>
            )}
            <br />
          </div>
   
      ))}
    </>
  );
};

export default ChatMessages;