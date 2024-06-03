import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { AppDispatch } from './app/store';
import { useDispatch } from 'react-redux';



function App() {
    const dispatch: AppDispatch = useDispatch();
    localStorage.setItem('theme', 'light');
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
