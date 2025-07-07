import { useEffect, useState } from 'react';
import { getCoinsTopVolume24h } from '@zoralabs/coins-sdk';
import { Zora20Token } from '../types';

export const useTokenData = () => {
  const [tokens, setTokens] = useState<Zora20Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getCoinsTopVolume24h({ count: 10 });
        const tokenData = response.data?.exploreList?.edges?.map((edge: any) => edge.node) || [];
        console.log('Token data:', JSON.stringify(tokenData, null, 2));
        setTokens(tokenData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch token data');
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  return { tokens, loading, error };
};