import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TaskI, UserI } from '../../types/Task';
import moment from 'moment';
import { Chip } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'taskName', headerName: 'Task Name', width: 150 },
    { field: 'deadline', headerName: 'Deadline', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows_default = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const renderChip = (deadline: string, respon: UserI | undefined) => {
    interface chipProps {
        lable: string;
        color: string;
    }
    const now = moment();
    const taskTime = moment(deadline);
    const diff = taskTime.diff(now, 'minutes');
    if (respon) {
        if (diff < 0) {
            // return <Chip label="Overdue" color="error" />; // Task is overdue
            return "OVERDUE"
        } else if (diff <= 30) {
            // return <Chip label="Due soon" color="warning" />; // Task is within 30 minutes of deadline
            return "DUE SOON"
        } else {
            // return <Chip label="In progess" color="success" />; // Task is not near the deadline
            return "IN PROGRESS"
        }
    } else {
        // return <Chip label="Not started" color="default" />; //Task is not started
        return "NOT STARTED"
    }
};

export default function DataTableVer2() {
    const { tasks } = useSelector((state: RootState) => state.todos);
    const tranformData = () => {
        const rows = tasks.map((t: TaskI) => {
            return {
                id: t.idTask,
                taskName: t.name,
                deadline: t.deadline,
                firstName: t.respon?.firstName ?? 'not-assign',
                lastName: t.respon?.lastName ?? 'not-assign',
                status: renderChip(t.deadline,t.respon),
            };
        });
        return rows;
    };
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tranformData()}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
