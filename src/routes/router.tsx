import { createBrowserRouter } from "react-router-dom";
import routes from "../config/routes";
import Loginform from "../components/Login/LoginForm";
import React from "react";
import ErrorPage from "./ErrorPage";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import TodoContainer from "../components/Todo/TodoContainer";


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
                element: <TodoContainer/>,
                errorElement: <ErrorPage></ErrorPage>,
                
            },
        ],
    },
]);
export default router;
