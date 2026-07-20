'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation'; // For dashboard redirection

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const router = useRouter();

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

    let responseText = data.response;

    // Check if the backend triggered a dashboard navigation command
    if (responseText.includes('[NAVIGATE:DASHBOARD]')) {
      responseText = responseText.replace('[NAVIGATE:DASHBOARD]', '');
      router.push('/dashboard'); // Automatically takes them to the dashboard!
    }

    setMessages([...newMessages, { role: 'assistant', content: responseText }]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="w-90 h-[450px] bg-white border border-gray-200 shadow-2xl rounded-xl p-4 flex flex-col mb-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-gray-700">Akademia Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-2 space-y-3 pr-1 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-50 text-blue-900 ml-6' : 'bg-gray-100 text-gray-800 mr-6'}`}>
                {/* Markdown parsing lets lists, bold text, and code render properly */}
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Ask Akademia..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
        💬
      </button>
    </div>
  );
}