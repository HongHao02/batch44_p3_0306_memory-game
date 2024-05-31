import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </Provider>,
);
