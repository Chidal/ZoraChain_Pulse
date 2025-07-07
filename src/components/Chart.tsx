import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTokenData } from '../hooks/useTokenData';
import { formatEther } from 'viem';

const Chart = () => {
  const { tokens, error, loading } = useTokenData();

  if (loading) return <div className="text-center text-xl">Loading chart...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  const data = tokens.map((token) => ({
    name: token.symbol || 'Unknown',
    marketCap: token.marketCap
      ? Number(formatEther(BigInt(Math.floor(Number(token.marketCap)).toString())))
      : 0,
    volume24h: token.volume24h
      ? Number(formatEther(BigInt(Math.floor(Number(token.volume24h)).toString())))
      : 0,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="marketCap" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="volume24h" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;