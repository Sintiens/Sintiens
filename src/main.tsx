import {StrictMode, useEffect} from 'react';
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
setTimeout(removeLoader, 5000);

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

// Remove the loader after React's first committed paint so the user never
// sees a flash of loader -> blank while the app hydrates.
function RemoveLoader() {
  useEffect(() => {
    removeLoader();
  }, []);
  return null;
}

createRoot(root).render(
  <StrictMode>
    <RemoveLoader />
    <App />
  </StrictMode>,
);
