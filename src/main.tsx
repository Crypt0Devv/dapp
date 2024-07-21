import './polyfills';
import eruda from 'eruda';
import './index.scss';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

eruda.init();

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
