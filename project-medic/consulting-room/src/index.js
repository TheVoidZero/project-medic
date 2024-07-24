import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css';
import RoutesMain from './components/RoutesMain.js'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<RoutesMain/>);