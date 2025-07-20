import { motion } from 'framer-motion';
import { Zora20Token } from '../types';
import { formatEther } from 'viem';
import { FaCoin, FaGem, FaChartLine } from 'react-icons/fa';
import token1Image from '../assets/token1.png';
import token2Image from '../assets/token2.png';
import defaultTokenImage from '../assets/default-token.png';

interface TokenCardProps {
  token: Zora20Token;
  sentimentScore?: number;
}

export default function TokenCard({ token, sentimentScore }: TokenCardProps) {
  const marketCap = token.marketCap
    ? formatEther(BigInt(Math.floor(Number(token.marketCap)).toString()))
    : 'N/A';
  const volume24h = token.volume24h
    ? formatEther(BigInt(Math.floor(Number(token.volume24h)).toString()))
    : 'N/A';

  const getTokenImage = () => {
    switch (token.symbol) {
      case 'TOKEN1':
        return token1Image;
      case 'TOKEN2':
        return token2Image;
      default:
        return token.mediaContent?.previewImage || defaultTokenImage;
    }
  };

  const getTokenIcon = () => {
    if (sentimentScore && sentimentScore > 0.7)
      return (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <FaChartLine className="text-green-400" />
        </motion.div>
      );
    if (token.uniqueHolders && token.uniqueHolders > 100) return <FaGem className="text-purple-400" />;
    return <FaCoin className="text-yellow-400" />;
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform transition duration-300"
      style={{ backdropFilter: 'blur(5px)', background: 'rgba(255, 255, 255, 0.05)' }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div className="relative">
        <motion.img
          src={getTokenImage()}
          alt={token.name || 'Token'}
          className="w-full h-40 object-cover rounded-t-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onError={(e) => { (e.target as HTMLImageElement).src = defaultTokenImage; }}
        />
        <motion.div
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {getTokenIcon()}
        </motion.div>
      </motion.div>
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
        <button
          className="mt-2 bg-green-600 px-3 py-1 rounded text-sm"
          onClick={() => alert(`Voted on ${token.symbol}!`)} // Placeholder for voting logic
        >
          Vote Important
        </button>
      </div>
    </motion.div>
  );
}