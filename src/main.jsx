import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import Store from './store/index.js';

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <App />
    </Provider>
)