import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useTokenData } from '../hooks/useTokenData';
import { formatEther } from 'viem';

const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#ff4040', '#00a8ff'];

const Chart = () => {
  const { tokens, error, loading } = useTokenData();
  const [data, setData] = useState<any[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !error && tokens.length > 0) {
      const chartData = tokens.map((token, index) => ({
        name: token.symbol || `Token${index + 1}`,
        marketCap: token.marketCap
          ? Number(formatEther(BigInt(Math.floor(Number(token.marketCap)).toString())))
          : 0,
        volume24h: token.volume24h
          ? Number(formatEther(BigInt(Math.floor(Number(token.volume24h)).toString())))
          : 0,
        holders: token.uniqueHolders || 0,
      }));
      setData(chartData);
    }
  }, [tokens, loading, error]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          marketCap: item.marketCap * (1 + (Math.random() - 0.5) * 0.1),
          volume24h: item.volume24h * (1 + (Math.random() - 0.5) * 0.15),
        }))
      );
      // Trigger alert for significant volume spike
      const maxVolume = Math.max(...data.map((d) => d.volume24h));
      if (maxVolume > 1000) {
        setAlert(`${data.find((d) => d.volume24h === maxVolume)?.name} volume spiked!`);
        setTimeout(() => setAlert(null), 5000); // Alert lasts 5 seconds
      }
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <div className="text-center text-2xl text-white">Loading charts...</div>;
  if (error) return <div className="text-center text-2xl text-red-400">{error}</div>;
  if (data.length === 0) return <div className="text-center text-2xl text-white">No data available</div>;

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6"
      style={{ backdropFilter: 'blur(5px)', background: 'rgba(255, 255, 255, 0.05)' }}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1, transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' } }}
    >
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Market Insights
      </h2>
      {/* Live Alert */}
      {alert && (
        <motion.div
          className="mb-4 p-2 bg-yellow-500 text-white rounded text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {alert}
        </motion.div>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#bbb' }} />
          <Area
            type="monotone"
            dataKey="marketCap"
            stroke="#8884d8"
            fill="url(#colorMarketCap)"
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="volume24h"
            stroke="#82ca9d"
            fill="url(#colorVolume)"
            isAnimationActive={true}
          />
          <defs>
            <linearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300} className="mt-6">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#bbb' }} />
          <Bar
            dataKey="holders"
            fill="#ff7300"
            isAnimationActive={true}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300} className="mt-6">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#bbb' }} />
          <Line
            type="monotone"
            dataKey="marketCap"
            stroke="#00a8ff"
            activeDot={{ r: 8 }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="volume24h"
            stroke="#ff4040"
            activeDot={{ r: 8 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300} className="mt-6">
        <PieChart>
          <Pie
            data={data.map((d, i) => ({ name: d.name, value: d.marketCap }))}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
            isAnimationActive={true}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#bbb' }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Chart;