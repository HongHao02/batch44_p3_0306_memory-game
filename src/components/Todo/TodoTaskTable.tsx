import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { green } from '@mui/material/colors';
import { UserI } from '../../types/Task';
import { Chip, IconButton, Tooltip } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import EditTaskDialog from '../Dialog/EditTaskDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Add } from '@mui/icons-material';
import AddTaskDialog from '../Dialog/AddTaskDialog';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#7a7c7e',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(idTask: number, name: string, deadline: string, respon?: UserI | undefined) {
    return { idTask, name, deadline, respon };
}

const rows = [
    createData(1, 'Task 1', '05/28/2024 14:34'),
    createData(2, 'Task 2', '05/28/2024 15:00'),
    createData(3, 'Task 3', '05/28/2024 16:00'),
    createData(4, 'Task 4', '05/28/2024 18:00'),
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
            return <Chip label="Overdue" color="error" />; // Task is overdue
        } else if (diff <= 30) {
            return <Chip label="Due soon" color="warning" />; // Task is within 30 minutes of deadline
        } else {
            return <Chip label="In progess" color="success" />; // Task is not near the deadline
        }
    } else {
        return <Chip label="Not started" color="default" />; //Task is not started
    }
};

export default function TodoTaskTable() {
    const { tasks } = useSelector((state: RootState) => state.todos);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="center">NAME</StyledTableCell>
                        <StyledTableCell align="center">DEADLINE</StyledTableCell>
                        <StyledTableCell align="center">RESOURCE</StyledTableCell>
                        <StyledTableCell align="center">STATUS</StyledTableCell>
                        <StyledTableCell align="center">EDIT</StyledTableCell>
                        <StyledTableCell align="center">
                            <AddTaskDialog></AddTaskDialog>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.length != 0 ? (
                        tasks.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.idTask}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">{row.deadline}</StyledTableCell>
                                <StyledTableCell align="center">{`${row.respon?.firstName ?? 'Not'}_${
                                    row.respon?.id ?? 'assign'
                                }`}</StyledTableCell>
                                <StyledTableCell align="center">{renderChip(row.deadline, row.respon)}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="flex gap-2 items-center justify-center">
                                        <Tooltip title="Check complete">
                                            <IconButton>
                                                <DownloadDoneIcon></DownloadDoneIcon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Move to trash">
                                            <IconButton>
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </Tooltip>

                                        <EditTaskDialog task={row}></EditTaskDialog>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                          <StyledTableCell align='center'>No tasks to do!!!</StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
