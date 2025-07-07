export interface Zora20Token {
  address: string;
  name: string;
  symbol: string;
  marketCap?: string | number;
  volume24h?: string | number;
  uniqueHolders?: number;
  mediaContent?: {
    previewImage?: string;
  };
}