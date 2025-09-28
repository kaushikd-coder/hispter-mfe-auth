import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DevPreview from './dev/DevPreview';

const root = createRoot(document.getElementById('root'));
root.render(<DevPreview />);
