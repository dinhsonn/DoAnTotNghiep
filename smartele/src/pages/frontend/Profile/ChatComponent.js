import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatComponent = ({ userId, orderId }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8082/ws'); // Đổi URL WebSocket của bạn
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => {
      setStompClient(stomp);
      stomp.subscribe(`/user/${userId}/queue/messages`, (response) => {
        const message = JSON.parse(response.body);
        setMessages(prevMessages => [...prevMessages, message]);
      });
    });

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    if (stompClient && messageText.trim()) {
      stompClient.publish({
        destination: `/app/chat/${orderId}`, // Kênh để gửi tin nhắn đến admin
        body: JSON.stringify({
          sender: 'user',
          content: messageText,
          orderId: orderId,
        }),
      });
      setMessageText('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
};

export default ChatComponent;
