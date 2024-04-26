import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import TanstackProvider from './Provider/TanstackProvider.jsx';
import { AuthProvider } from './components/Context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TanstackProvider>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </TanstackProvider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
);
