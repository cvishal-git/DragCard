import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const deferRender = async () => {
  const { worker } = await import('./mocks/browser.ts');
  await worker.start();
  console.log('Mock Service Worker started successfully');
};

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
