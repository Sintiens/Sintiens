import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AppErrorBoundary from './components/AppErrorBoundary.tsx';
import './index.css';

const root = document.getElementById('root')!;

const removeLoader = () => {
  const loaders = document.querySelectorAll('.instant-loader-container');
  loaders.forEach((l) => l.remove());
};
setTimeout(removeLoader, 3000);

// Global error handler — surface errors clearly
window.addEventListener('error', (e) => {
  console.error('[Sintiens] Runtime error:', e.error || e.message);
  removeLoader();
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Sintiens] Unhandled rejection:', e.reason);
  removeLoader();
});

function RemoveLoader() {
  useEffect(() => {
    removeLoader();
  }, []);
  return null;
}

createRoot(root).render(
  <StrictMode>
    <AppErrorBoundary>
      <RemoveLoader />
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
