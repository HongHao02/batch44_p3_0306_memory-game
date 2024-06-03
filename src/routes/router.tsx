import { createBrowserRouter } from 'react-router-dom';
import routes from '../config/routes';
import Loginform from '../components/Login/LoginForm';
import React from 'react';
import ErrorPage from './ErrorPage';
import MemoryContainer from '../components/Memory/MemoryContainer';

const router = createBrowserRouter([
    {
        path: routes.index,
        element: <Loginform></Loginform>,
        errorElement: <ErrorPage />,
    },
    {
        path: routes.memory,
        element: <MemoryContainer></MemoryContainer>

    }
]);
export default router;
