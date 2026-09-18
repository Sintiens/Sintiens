import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import AppErrorBoundary from './components/AppErrorBoundary.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el contenedor #root');

const showLoaderError = () => {
  const loader = document.querySelector('.instant-loader-container');
  if (!loader) return;
  loader.innerHTML =
    `<div style="color:#fafafa;font-family:system-ui;text-align:center;padding:40px"><p style="font-size:18px;margin-bottom:12px">No se pudo cargar la aplicación.</p><p style="font-size:13px;opacity:.6">Revisa la consola del navegador (F12) para más detalles.</p></div>`;
};

const removeLoader = () => {
  const loaders = document.querySelectorAll('.instant-loader-container');
  loaders.forEach((l) => l.remove());
};

// Global error handler — surface errors clearly
window.addEventListener('error', (e) => {
  console.error('[Sintiens] Runtime error:', e.error || e.message);
  if (window.__SINTIENS_MOUNTED__) removeLoader();
  else showLoaderError();
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Sintiens] Unhandled rejection:', e.reason);
  if (window.__SINTIENS_MOUNTED__) removeLoader();
  else showLoaderError();
});

function RemoveLoader() {
  useEffect(() => {
    window.__SINTIENS_MOUNTED__ = true;
    removeLoader();
  }, []);
  return null;
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <RemoveLoader />
        <App />
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
