import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

const config = {
  initialMessages: [{ text: "Hi! How can I help with your pulses?" }],
  botName: "PulseBot",
};

const ActionProvider = ({ createChatBotMessage }) => {
  const handlePulseQuery = () => createChatBotMessage("Use Pulse Score >0.7 to buy, <0.3 to sell.");
  return { handlePulseQuery };
};

export const AIChatbot = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <motion.div className="fixed bottom-5 right-5">
      <button onClick={() => setShowChat(!showChat)} className="bg-blue-600 p-3 rounded-full text-white">
        💬
      </button>
      {showChat && <Chatbot config={config} actionProvider={ActionProvider} />}
    </motion.div>
  );
};