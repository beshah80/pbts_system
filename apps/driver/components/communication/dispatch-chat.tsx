'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Paperclip, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  sender: 'driver' | 'dispatch';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
  status: 'sent' | 'delivered' | 'read';
}

interface DispatchChatProps {
  driverName: string;
  onSendMessage: (message: string) => void;
}

export function DispatchChat({ driverName, onSendMessage }: DispatchChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'dispatch',
      content: 'Good morning! Your route assignment is confirmed. Drive safely.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      sender: 'driver',
      content: 'Received. Starting route now.',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      type: 'text',
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'driver',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    onSendMessage(newMessage);
    setNewMessage('');

    // Simulate dispatch response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'dispatch',
          content: 'Message received. Thank you for the update.',
          timestamp: new Date().toISOString(),
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 2000);
    }, 500);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'read': return '✓✓';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-96">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Dispatch Center</h3>
          <p className="text-sm text-green-600">● Online</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                message.sender === 'driver'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className={`flex items-center justify-between mt-1 text-xs ${
                message.sender === 'driver' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <span>{formatTime(message.timestamp)}</span>
                {message.sender === 'driver' && (
                  <span className="ml-2">{getStatusIcon(message.status)}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}