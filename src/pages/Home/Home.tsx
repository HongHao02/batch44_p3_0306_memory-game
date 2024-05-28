import { useState } from 'react';
import moment from 'moment';
import React from 'react';
import TestDeadline from './TestDeadline';
interface Task {
    id: number;
    name: string;
    deadline: string; // ISO 8601 format string
  }
function Home() {
    const [date, setDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSubmit = () => {
        if (date) {
            const momentDate = moment(date);
            setFormattedDate(momentDate.format('MM/DD/YYYY HH:mm'));
        } else {
            setFormattedDate('Please select a date.');
        }
    };
    return (
        <div className="flex flex-col justify-center items-center  h-screen bg-gray-300 ">
            <div className="min-w-[500px] shadow-md rounded-md bg-gray-50 p-[10px]">
                <div className=" mt-4">
                    <div>
                        <input type="datetime-local" value={date} onChange={handleDateChange} name="assign-date" />
                        <button onClick={handleSubmit}>Submit</button>
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <TestDeadline></TestDeadline>
            </div>
        </div>
    );
}

export default Home;
