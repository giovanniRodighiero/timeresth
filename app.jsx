import React from 'react';
import { createRoot } from 'react-dom/client';

import MainPage from './src/MainPage';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>,
);