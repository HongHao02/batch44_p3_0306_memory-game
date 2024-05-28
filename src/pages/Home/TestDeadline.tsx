import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '@mui/material';

interface Task {
    id: number;
    name: string;
    deadline: string; // ISO 8601 format string
}

const TestDeadline: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, name: 'Task 1', deadline: '05/28/2024 10:10' },
        { id: 2, name: 'Task 2', deadline: '05/28/2024 10:45' },
        { id: 3, name: 'Task 3', deadline: '05/29/2024 10:55' },
    ]);

    //add task
    const [date, setDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSubmit = () => {
        if (date) {
            const momentDate = moment(date);
            if (momentDate.diff(moment(), 'minutes') < 0) {
                setFormattedDate('Please choose another after today!');
            } else {
                if (momentDate.isValid()) {
                    const task: Task = {
                        id: tasks.length + 1,
                        deadline: momentDate.format('MM/DD/YYYY HH:mm'),
                        name: `Task ${tasks.length + 1}`,
                    };
                    addStask(task);
                }
                setFormattedDate(momentDate.format('MM/DD/YYYY HH:mm'));
            }
        } else {
            setFormattedDate('Please select a date.');
        }
    };
    const addStask = (task: Task) => {
        if (task) {
            setTasks((pre: Task[]) => [...pre, task]);
        }
    };
    //handle stype of task
    const getTaskStyle = (deadline: string) => {
        const now = moment();
        const taskTime = moment(deadline);
        const diff = taskTime.diff(now, 'minutes');

        if (diff < 0) {
            return { color: 'red' }; // Task is overdue
        } else if (diff <= 30) {
            return { color: 'orange' }; // Task is within 30 minutes of deadline
        } else {
            return { color: 'green' }; // Task is not near the deadline
        }
    };

    // Update task styles every minute
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('trigger');
            setTasks([...tasks]); // Trigger a re-render to update styles
        }, 30000); // 1 minute

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [tasks]);

    console.log('re-render');

    return (
        <div>
            <h1>Task List</h1>
            <div className=" mt-4">
                <div className="flex gap-2 ">
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={handleDateChange}
                        name="assign-date"
                        className="bg-slate-300 rounded-md p-2"
                    />
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
                <p className="font-bold text-xl text-red-700">{formattedDate}</p>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={getTaskStyle(task.deadline)}>
                        {task.name} - {moment(task.deadline).format('MM/DD/YYYY HH:mm')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestDeadline;
