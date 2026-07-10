import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import Test from './Test';

import { GlobalLoaderProvider } from './context/GlobalLoaderContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalLoaderProvider>
        <App />
      </GlobalLoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
