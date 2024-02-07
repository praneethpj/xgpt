 
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';
import React, { useState, useEffect } from 'react';

const Chat = () => {

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageSender, setMessageSender] = useState('xGpt');  
  const [chatMessages, setChatMessages] = useState([]);


  const fetchData = async () => {
  
    try {
      const response = await fetch('https://x-gpt-backend.onrender.com/api/v1/user/getAllChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:  localStorage.getItem('userName'),
        }),
      });

      const data = await response.json();
      console.log(data);
      setChatMessages(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  const handleButtonClick = () => {

    fetchData();
  };

 

  useEffect(() => {
    const ws = new WebSocket( process.env.WEB_SOCKET_URL || "ws://x-gpt-backend.onrender.com:5000");

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);  

      console.log("MSG "+data.content);
 
      setMessageSender(data.sender);

      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };

  }, []);

  const onSendMessage = ({ message }) => {
    console.log("here " + message);
    if (socket && message) {
      const messageData = {
        sender: 'User',
        username:  localStorage.getItem('userName'),
        content: message,
      };

      setReceivedMessages((prevMessages) => [...prevMessages, messageData]);
      socket.send(JSON.stringify(messageData));
      setMessage('');
    }

    handleButtonClick();
  };

  const loadChatList = async ({ chatId }) => {
    console.log("Chat ID ss : " + chatId);
    try {
      
      const response = await fetch('https://x-gpt-backend.onrender.com/api/v1/user/getAllChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectId:chatId,
          username:  localStorage.getItem('userName'),
        }),
      });
      console.log("Chat ID ss : " + chatId);
      const data = await response.json();

      console.log("chat msg ;;;"+JSON.stringify(data.message));
      setReceivedMessages( data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-row">
      <ChatSidebar chatMessages={chatMessages} loadChatList={loadChatList} />
      <div id="received-messages" className="flex-1 block w-full p-2.5 text-sm text-gray-900 bg-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 overflow-auto">
        <ChatMessages receivedMessages={ receivedMessages}   />
      </div>
      <ChatInput onSendMessage={onSendMessage}  />
    </div>
  );
};

export default Chat;