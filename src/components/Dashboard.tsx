import { motion, AnimatePresence } from 'framer-motion';
import TokenCard from './TokenCard';
import Chart from './Chart';
import { useTokenData } from '../hooks/useTokenData';
import { useSentimentAnalysis } from '../hooks/useSentimentAnalysis';
import { useState, useEffect } from 'react';
import { Zora20Token } from '../types';
import { formatEther } from 'viem';

const TutorialOverlay = () => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="bg-gray-800 p-6 rounded-lg max-w-md text-white">
      <h3 className="text-xl font-bold mb-4">Welcome to ZoraChain Pulse!</h3>
      <p>Explore your 'pulses'—real-time market insights:</p>
      <ul className="list-disc pl-5 mt-2">
        <li><strong>Pulse Score</strong>: Buy if >0.7, sell if <0.3.</li>
        <li><strong>Volume Spikes</strong>: Act on alerts for trade opportunities.</li>
        <li><strong>Holder Trends</strong>: Spot undervalued tokens.</li>
      </ul>
      <button
        className="mt-4 bg-blue-600 px-4 py-2 rounded"
        onClick={() => {/* Close overlay logic */}}
      >
        Got It
      </button>
    </div>
  </motion.div>
);

const AITradeAdvisor = ({ tokens, sentimentScores }: { tokens: Zora20Token[], sentimentScores: Map<string, number> }) => {
  const getRecommendation = (token: Zora20Token, score: number) => {
    const volumeChange = token.volume24h ? Number(formatEther(BigInt(Math.floor(Number(token.volume24h))))) : 0;
    if (score > 0.7 && volumeChange > 20) return { action: "Buy", confidence: 85 };
    if (score < 0.3 && (token.uniqueHolders || 0) < 50) return { action: "Sell", confidence: 70 };
    return { action: "Hold", confidence: 50 };
  };

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg mt-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h3 className="text-lg font-semibold text-blue-400">AI Trade Advisor</h3>
      {tokens.map((token) => {
        const score = sentimentScores.get(token.address) || 0;
        const rec = getRecommendation(token, score);
        return (
          <div key={token.address} className="mt-2 p-2 bg-gray-700 rounded">
            <p>{token.symbol}: {rec.action} ({rec.confidence}% confidence)</p>
          </div>
        );
      })}
    </motion.div>
  );
};

export const Dashboard = () => {
  const { tokens, loading, error } = useTokenData();
  const sentimentScores = useSentimentAnalysis(tokens);
  const [showTutorial, setShowTutorial] = useState(true);
  const [pulseHistory, setPulseHistory] = useState<{ timestamp: number; score: number; symbol: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      tokens.forEach((token) => {
        const score = sentimentScores.get(token.address) || 0;
        setPulseHistory((prev) => [...prev, { timestamp: Date.now(), score, symbol: token.symbol || 'N/A' }].slice(-24));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [tokens, sentimentScores]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle, rgba(0,168,255,0.1) 0%, rgba(0,0,0,0) 70%)] opacity-10 pointer-events-none"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto p-6 text-white"
        style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          ZoraChain Pulse
        </h1>
        {showTutorial && <TutorialOverlay />}
        {loading && (
          <motion.p
            className="text-center text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading tokens...
          </motion.p>
        )}
        {error && (
          <motion.p
            className="text-center text-2xl text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
        {tokens.length === 0 && !loading && !error && (
          <motion.p
            className="text-center text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No tokens found
          </motion.p>
        )}
        <AnimatePresence>
          {tokens.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {tokens.map((token) => (
                <TokenCard
                  key={token.address}
                  token={token}
                  sentimentScore={sentimentScores.get(token.address)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <Chart />
        <AITradeAdvisor tokens={tokens} sentimentScores={sentimentScores} />
        <motion.div
          className="mt-6 bg-gray-800 p-4 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-blue-400">Pulse History (Last 24 Entries)</h3>
          <div className="mt-2 max-h-40 overflow-y-auto">
            {pulseHistory.map((entry, i) => (
              <p key={i} className="text-sm">{new Date(entry.timestamp).toLocaleTimeString()} - {entry.symbol}: {entry.score.toFixed(2)}</p>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="fixed bottom-5 right-5 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-sm"
          animate={{ scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity } }}
          title="Live Data Active"
        >
          🎯
        </motion.div>
      </motion.div>
    </div>
  );
};