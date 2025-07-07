import { motion } from 'framer-motion';
import { Zora20Token } from '../types';
import { formatEther } from 'viem';

interface TokenCardProps {
  token: Zora20Token;
  sentimentScore?: number;
}

export function TokenCard({ token, sentimentScore }: TokenCardProps) {
  const marketCap = token.marketCap
    ? formatEther(BigInt(Math.floor(Number(token.marketCap)).toString()))
    : 'N/A';
  const volume24h = token.volume24h
    ? formatEther(BigInt(Math.floor(Number(token.volume24h)).toString()))
    : 'N/A';

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring' }}
    >
      <h2 className="text-xl font-semibold">
        {token.name || 'Unknown'} ({token.symbol || 'N/A'})
      </h2>
      <p>Market Cap: ${marketCap}</p>
      <p>24h Volume: ${volume24h}</p>
      <p>Unique Holders: {token.uniqueHolders || 'N/A'}</p>
      <p>Pulse Score: {sentimentScore !== undefined ? sentimentScore : 'N/A'}</p>
      <img
        src={token.mediaContent?.previewImage || 'https://via.placeholder.com/150'}
        alt={token.name || 'Token'}
        className="w-full h-32 object-cover rounded mt-2"
      />
    </motion.div>
  );
}