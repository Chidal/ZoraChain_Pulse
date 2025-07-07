# ZoraChain Pulse: Project Overview

**ZoraChain Pulse** is a decentralized analytics dashboard that empowers traders and investors with real-time insights into Base blockchain tokens using Zora’s Coins SDK. It visualizes token metrics (market cap, volume, holders) and integrates AI-driven sentiment analysis for predictive market trends. Built to offer a modern, responsive UI with smooth animations and robust error handling. The app addresses the demand for transparent DeFi tools, enhancing user decision-making with blockchain data and AI insights, making it a standout.

#### Importance to the Blockchain Ecosystem
- **Base Blockchain**: Leverages Base’s scalability for low-cost, high-speed data queries, driving adoption in DeFi.
- **Zora’s Technology**: Uses Zora’s Coins SDK (`getCoinsTopVolume24h`) for trusted, immutable token data, ensuring reliability.
- **AI Integration**: Combines blockchain data with sentiment analysis, offering predictive insights, a key differentiator in DeFi.
- **Next Big Thing**: Merges user-friendly UI with decentralized data and AI, rivaling centralized platforms like CoinMarketCap.

#### Relevance and Usage
- **Target Audience**: Crypto traders, investors, and DeFi enthusiasts seeking actionable insights.
- **Use Case**: Real-time monitoring of token performance, portfolio tracking, and AI-driven market predictions.
- **UI Focus**: Responsive design with Tailwind CSS, animated transitions via Framer Motion, and dynamic charts with Recharts, ensuring accessibility and engagement.

---

### Implementation Plan

#### Technologies
- **Frontend**: Create React App (`react-scripts@5.0.1`), React (`18.3.1`), TypeScript (`4.9.5`)
- **Blockchain**: Zora Coins SDK (`0.2.1`), Viem (`2.31.2`) for Base blockchain integration
- **Styling**: Tailwind CSS (`3.4.14`) for responsive, utility-first design
- **Animations**: Framer Motion (`11.11.9`) for smooth transitions
- **Data Visualization**: Recharts (`2.12.7`) for interactive charts
- **Testing**: Jest (`29.7.0`), `@testing-library/react` (`13.4.0`)

#### Features
1. **Token Insights Dashboard**: Displays token data (name, symbol, market cap, 24h volume, holders) in a grid of cards.
2. **AI Sentiment Analysis**: Uses a custom hook (`useSentimentAnalysis`) to analyze social sentiment for tokens, displayed as a “Pulse Score.”
3. **Interactive Charts**: Visualizes market trends with Recharts, supporting zoom and hover interactions.
4. **Portfolio Tracker**: Allows users to monitor selected tokens, with real-time updates.
5. **Alerts System**: Notifies users of significant market changes (e.g., volume spikes).
6. **Error Handling**: Robust loading/error states to prevent crashes, addressing `BigInt` issues.


# ZoraChain Pulse

**ZoraChain Pulse** is a decentralized analytics platform for Base blockchain tokens. It leverages Zora’s Coins SDK to display real-time token metrics (market cap, volume, holders) and integrates AI-driven sentiment analysis for predictive insights. Built with Create React App, TypeScript, Tailwind CSS, Framer Motion, and Recharts, it offers a responsive, animated UI with robust error handling.

## Features
- **Token Insights**: Displays token data using Zora’s `getCoinsTopVolume24h` API.
- **AI Sentiment Analysis**: Shows a “Pulse Score” for market sentiment (mocked, extensible to real APIs).
- **Interactive Charts**: Visualizes trends with Recharts, supporting zoom and hover.
- **Responsive UI**: Tailwind CSS ensures mobile-friendly design.
- **Animations**: Framer Motion adds smooth transitions.
- **Error Handling**: Prevents crashes with loading/error states.

## Technologies
- **Frontend**: React (`18.3.1`), TypeScript (`4.9.5`), Create React App (`5.0.1`)
- **Blockchain**: Zora Coins SDK (`0.2.1`), Viem (`2.31.2`)
- **Styling**: Tailwind CSS (`3.4.14`)
- **Animations**: Framer Motion (`11.11.9`)
- **Visualization**: Recharts (`2.12.7`)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chidal/zora-chain-pulse.git
   cd zora-chain-pulse
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Create `.env`:
   ```env
   REACT_APP_ZORA_API_KEY=your-zora-api-key
   REACT_APP_RPC_URL=https://rpc.base.org
   ```
4. **Start Development Server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000`.
5. **Run Tests**:
   ```bash
   npm test
   ```
6. **Build for Production**:
```bash
   npm run build
   npx serve -s build
```

## Usage
- **Dashboard**: View token cards and charts at `http://localhost:3000`.
- **Token Cards**: Display name, symbol, market cap, volume, holders, and Pulse Score.
- **Charts**: Analyze market trends with interactive visuals.
- **Debugging**: Check console for logs (`ZORA_API_KEY`, `Token data`).


## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
MIT License. See [LICENSE](LICENSE).

## Acknowledgements

- **Zora**: For Coins SDK and Base integration.

For inspiring decentralized innovation.
- **Base Blockchain**: For scalable infrastructure.
- **Tailwind CSS, Framer Motion, Recharts**: For modern UI/UX.

---

### Why ZoraChain Pulse Succeeds

 Uses Zora’s Coins SDK, Base blockchain, and AI-driven features, meeting innovation goals.
- **Robust Error Handling**: Addresses `BigInt` errors by converting floats to integers, ensuring crash-free rendering.
- **Modern UI/UX**: Tailwind CSS and Framer Motion deliver a polished, responsive experience.
- **Scalability**: Modular design supports future features (e.g., real-time WebSocket updates, advanced AI models).
- **Relevance**: Combines blockchain transparency with AI insights, addressing DeFi’s need for accessible analytics.

### Testing and Deployment
1. **Run Tests**:
```bash
   npm test
```
   Ensure `App.test.tsx` covers rendering and mock data.

2. **Deploy**:
   ```bash
   npm run build
   npx serve -s build
   ```
   Deploy to Netlify or Vercel for production.

3. **Debugging**:
   - Check console for `Token data` logs.
   - Verify `.env` contains a valid `REACT_APP_ZORA_API_KEY`.
   - Test with mock data in `useTokenData.ts` if API issues persist.

---

### Future builds

- **Autonomous Trading Agents**: Integrate AI agents in `PortfolioManager.tsx` to execute trades via Base smart contracts, using Zora’s data.

- **Data Marketplace**: Add a data-sharing feature where users monetize token analytics, secured by Base blockchain.
