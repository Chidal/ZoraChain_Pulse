import { motion, AnimatePresence } from 'framer-motion';
import TokenCard from './TokenCard';
import Chart from './Chart';
import { useTokenData } from '../hooks/useTokenData';
import { useSentimentAnalysis } from '../hooks/useSentimentAnalysis';

export const Dashboard = () => {
const { tokens, loading, error } = useTokenData();
const sentimentScores = useSentimentAnalysis(tokens);

return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
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
{/* Virtual Activity Indicator */}
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