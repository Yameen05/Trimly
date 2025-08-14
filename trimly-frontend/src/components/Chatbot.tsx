import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// TypeScript interfaces - Define the shape of your data
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotResponse {
  response: string;
  success: boolean;
  powered_by?: string;
  fallback?: boolean;
  error?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm Trimly's AI assistant, here to help you with Ali's barbershop! I can tell you about services, pricing, hours, or help you book an appointment. What can I help you with today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL: string = 'http://localhost:8000/api';

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGPTResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await axios.post<ChatbotResponse>(`${API_BASE_URL}/chatbot/`, {
        message: userMessage
      }, { withCredentials: true });
      
      return response.data.response;
    } catch (error) {
      console.error('GPT API error:', error);
      // Fallback responses if GPT fails
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    // Greeting responses
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hey there! 👋 Welcome to Trimly! I'm here to help you with Ali's barbershop. What can I help you with today?";
    }
    
    // Thank you responses
    if (text.includes('thank') || text.includes('thanks')) {
      return "You're very welcome! 😊 Anything else I can help you with about booking with Ali?";
    }
    
    // Services and pricing
    if (text.includes('service') || text.includes('haircut') || text.includes('beard') || text.includes('cut')) {
      return "Ali offers amazing services! ✂️ Classic Haircut ($35), Beard Trim ($15), or the popular Haircut + Beard combo ($50). All include consultation and styling. Ready to book?";
    }
    
    if (text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('expensive')) {
      return "Great value for expert work! 💰 Classic Haircut is $35, Beard Trim $15, or get both for $50. All services include wash and styling. Want to schedule?";
    }
    
    // Hours and availability
    if (text.includes('hour') || text.includes('open') || text.includes('close') || text.includes('time')) {
      return "We're open Monday-Saturday 9:00 AM - 6:00 PM, closed Sunday. 🕘 You can book online or call (980) 318-4863!";
    }
    
    // Location
    if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('find')) {
      return "You'll find us at 6721 E Independence Blvd, Charlotte, NC 28212! 📍 Easy to find with plenty of parking. Call (980) 318-4863 if you need directions!";
    }
    
    // Booking
    if (text.includes('book') || text.includes('appointment') || text.includes('schedule')) {
      return "Perfect! 📅 You can book online through our website or call Ali directly at (980) 318-4863. Which service interests you most?";
    }
    
    // Payment
    if (text.includes('pay') || text.includes('payment') || text.includes('cash') || text.includes('card')) {
      return "We make payment easy! 💳 Cash, all cards, Zelle, Apple Pay, Cash App, and Venmo accepted. No worries about payment methods!";
    }
    
    // Cancellation
    if (text.includes('cancel') || text.includes('reschedule') || text.includes('change')) {
      return "No problem! Just give us 2+ hours notice and there's no fee. 📞 Call (980) 318-4863 to reschedule or cancel.";
    }
    
    // Contact
    if (text.includes('contact') || text.includes('phone') || text.includes('call')) {
      return "Easy to reach us! 📞 Call (980) 318-4863 or visit us at 6721 E Independence Blvd, Charlotte, NC 28212. Ali's always happy to chat!";
    }
    
    // Default response
    return "I'm here to help with anything about Ali's barbershop! ✂️ Ask me about services, pricing, hours, booking, or anything else. What would you like to know?";
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get GPT response
    try {
      const botResponseText = await getGPTResponse(inputText);
      
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: botResponseText,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 800); // Simulate typing delay
      
    } catch (error) {
      setTimeout(() => {
        const errorResponse: Message = {
          id: messages.length + 2,
          text: "Oops! I'm having a connection issue right now. 😅 But I can still help! Try asking again, or call Ali directly at (980) 318-4863 for immediate assistance!",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 800);
    }

    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions: string[] = [
    "What services does Ali offer?",
    "How much does a haircut cost?",
    "What are your hours?",
    "How do I book an appointment?",
    "Where are you located?"
  ];

  const handleQuickQuestion = (question: string): void => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-blue-500"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Trimly AI Assistant</h3>
                  <p className="text-xs text-blue-200">Powered by GPT-4</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message: Message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 border border-gray-200'
                      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;