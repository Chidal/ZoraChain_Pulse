import { motion } from 'framer-motion';
import { Zora20Token } from '../types';
import { formatEther } from 'viem';

interface TokenCardProps {
token: Zora20Token;
sentimentScore?: number;
}

export default function TokenCard({ token, sentimentScore }: TokenCardProps) {
const marketCap = token.marketCap
? formatEther(BigInt(Math.floor(Number(token.marketCap)).toString()))
: 'N /A';
const volume24h = token.volume24h
? formatEther(BigInt(Math.floor(Number(token.volume24h)).toString()))
: 'N/A';

return (
<motion.div
className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform transition duration-300"
style={{ backdropFilter: 'blur(5px)', background: 'rgba(255, 255, 255, 0.05)' }}
whileHover={{ scale: 1.05, rotate: 1 }}
transition={{ type: 'spring', stiffness: 300 }}
>
<motion.img
src={token.mediaContent?.previewImage || 'https://via.placeholder.com/150'}
alt={token.name || 'Token'}
className="w-full h-40 object-cover rounded-t-xl"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
/>
<div className="p-4">
<h2 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
{token.name || 'Unknown'} ({token.symbol || 'N/A'})
</h2>
<p className="text-gray-300 mt-2">Market Cap: ${marketCap}</p>
<p className="text-gray-300">24h Volume: ${volume24h}</p>
<p className="text-gray-300">Unique Holders: {token.uniqueHolders || 'N/A'}</p>
<p className="text-yellow-400 font-medium mt-2">
Pulse Score: {sentimentScore !== undefined ? sentimentScore : 'N/A'}
</p>
</div>
</motion.div>
);
}