import React, { useState, useEffect } from 'react';

const ChatSidebar = ({ chatMessages, loadChatList }) => {
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    console.log('ChatMessages prop changed:', chatMessages);
    setForceRerender((prev) => !prev);
  }, [chatMessages]);

  return (
    <div className="w-1/6 bg-gray-800 p-4">
      {Array.isArray(chatMessages) &&
        chatMessages.map((message) => (
          <div key={message._id} className='text-white group'>
            <p
              className='hover:bg-slate-300 hover:text-slate-900 hover:cursor-pointer'
              onClick={() => loadChatList({ chatId: message._id })}
            >
              {message.messageBot && message.messageBot.length > 25
                ? `${message.messageBot.slice(0, 25)}...`
                : message.messageBot}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ChatSidebar;
