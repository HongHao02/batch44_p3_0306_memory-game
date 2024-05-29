import { createBrowserRouter } from 'react-router-dom';
import routes from '../config/routes';
import Loginform from '../components/Login/LoginForm';
import React from 'react';
import ErrorPage from './ErrorPage';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import TodoContainer from '../components/Todo/TodoContainer';
import TaskContainer from '../components/Todo/TaskContainer';
import TodoTaskCompleteTable from '../components/Todo/TodoTaskMakerContainer';
import TodoTaskMakeContainer from '../components/Todo/TodoTaskMakerContainer';
import DataTable from '../components/Table/DataTable';
import DataTableVer2 from '../components/Table/DataTableVer2';

const router = createBrowserRouter([
    {
        path: routes.index,
        element: <Loginform></Loginform>,
        errorElement: <ErrorPage />,
    },
    {
        path: routes.todo,
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TodoContainer />,
                errorElement: <ErrorPage></ErrorPage>,
            },
            {
                path: 'make',
                element: <TaskContainer />,
                errorElement: <ErrorPage></ErrorPage>,
                children: [
                    {
                        path: 'complete',
                        element: <TodoTaskMakeContainer type="complete"></TodoTaskMakeContainer>,
                    },
                    {
                        path: 'trash',
                        element: <TodoTaskMakeContainer type="trash"></TodoTaskMakeContainer>,
                    },
                    {
                        path: 'sort',
                        element: <DataTableVer2></DataTableVer2>,
                    },
                ],
            },
        ],
    },
]);
export default router;
