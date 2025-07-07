import { motion } from 'framer-motion';
import { TokenCard } from './TokenCard';
import { Chart } from './Chart';
import { useTokenData } from '../hooks/useTokenData';
import { useSentimentAnalysis } from '../hooks/useSentimentAnalysis';

export const Dashboard = () => {
  const { tokens, loading, error } = useTokenData();
  const sentimentScores = useSentimentAnalysis(tokens);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">ZoraChain Pulse</h1>
      {loading && <p className="text-center text-xl">Loading tokens...</p>}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}
      {tokens.length === 0 && !loading && !error && (
        <p className="text-center text-xl">No tokens found</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {tokens.map((token) => (
          <TokenCard
            key={token.address}
            token={token}
            sentimentScore={sentimentScores.get(token.address)}
          />
        ))}
      </div>
      <Chart />
    </motion.div>
  );
};