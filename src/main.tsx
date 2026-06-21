import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const loader = root.querySelector('.instant-loader-container');

// Last-resort: if React never mounts (throws, hangs, whatever), make
// sure the loading screen still disappears after a short delay so the
// user is never stuck on it.
const removeLoader = () => {
  if (loader && loader.parentNode) {
    loader.remove();
  }
};
setTimeout(removeLoader, 50);

// Global error handler — if React throws during render, hide the loader
// and surface the error in the console.
window.addEventListener('error', (e) => {
  console.error('[Sintiens] Runtime error:', e.error || e.message);
  removeLoader();
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Sintiens] Unhandled rejection:', e.reason);
  removeLoader();
});

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
