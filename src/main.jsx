import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import { AuthProvider } from './states/AuthContext.jsx'; // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
