import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// msw 목서버 필요한 경우 주석 해제
// import { worker } from './mocks/worker';

// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
