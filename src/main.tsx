import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeONGs, updateONGsWithLocalImages, clearONGs } from './services/storage';


clearONGs();
initializeONGs();
updateONGsWithLocalImages();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
