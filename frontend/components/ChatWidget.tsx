'use client';
import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white border shadow-xl rounded-lg p-4 flex flex-col mb-4">
          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((m, i) => <p key={i} className={m.role === 'user' ? 'text-blue-600' : 'text-gray-800'}>{m.content}</p>)}
          </div>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)}
            className="border p-2" placeholder="Ask Akademia..."
          />
          <button onClick={sendMessage} className="bg-black text-white mt-2 p-2">Send</button>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white p-4 rounded-full">
        Chat
      </button>
    </div>
  );
}