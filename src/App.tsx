import './index.css';
import { Dashboard } from './components/Dashboard';

function App() {
  console.log('ZORA_API_KEY:', process.env.REACT_APP_ZORA_API_KEY);
  return (
    <div className="min-h-screen bg-gray-900">
      <Dashboard />
    </div>
  );
}

export default App;