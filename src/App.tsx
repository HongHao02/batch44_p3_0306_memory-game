import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import router from './routes/router';
import { AppDispatch } from './app/store';
import { useDispatch } from 'react-redux';
import { addTask, addTasksList } from './features/todoStore/todoSlice';
import TaskSamples from './data/TaskSamples';

function App() {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        // dispatch(addTasksList(TaskSamples)); error: non non-serializable
        TaskSamples.map((task) => {
            dispatch(addTask({ deadline: task.deadline, name: task.name }));
        });
    }, []);
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
