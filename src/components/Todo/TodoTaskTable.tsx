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
import { TaskI, UserI } from '../../types/Task';
import { Chip, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import EditTaskDialog from '../Dialog/EditTaskDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Add } from '@mui/icons-material';
import AddTaskDialog from '../Dialog/AddTaskDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import CheckCompleteDialog from '../Dialog/CheckCompleteDialog';
import Notification from '../Notification/Notification';
import HandleTaskDiaglog from '../Dialog/HandleTaskDialog';
import { addCompleteTask, moveToTrash } from '../../features/todoStore/todoSlice';
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
    const { tasks, error } = useSelector((state: RootState) => state.todos);
    const [tasksList, setTaskList] = React.useState<TaskI[]>(tasks);
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTaskList([...tasks]); // Trigger a re-render to update styles
        }, 30000); // half minutes

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [tasks]);
    const handleMoveToTrash = (idTask: number) => {
        dispatch(moveToTrash(idTask));
    };
    const handleCheckCompleteTask = (idTask: number) => {
        dispatch(addCompleteTask(idTask));
    };
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
                        tasks.map((task) => (
                            <StyledTableRow key={task.name}>
                                <StyledTableCell component="th" scope="task">
                                    {task.idTask}
                                </StyledTableCell>
                                <StyledTableCell align="center">{task.name}</StyledTableCell>
                                <StyledTableCell align="center">{task.deadline}</StyledTableCell>
                                <StyledTableCell align="center">{`${task.respon?.firstName ?? 'Not'} ${
                                    task.respon?.lastName ?? 'assign'
                                }`}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {renderChip(task.deadline, task.respon)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className="flex gap-2 items-center justify-center">
                                        {/* <CheckCompleteDialog task={task}></CheckCompleteDialog> */}
                                        <HandleTaskDiaglog
                                            title="Check completed"
                                            icon={TaskAltIcon}
                                            task={task}
                                            response={{
                                                error: 'Cannot add to complete task',
                                                success: 'Move to complete task successfuly',
                                            }}
                                            action={handleCheckCompleteTask}
                                        ></HandleTaskDiaglog>
                                        <HandleTaskDiaglog
                                            title="Move to trash"
                                            icon={DeleteIcon}
                                            task={task}
                                            response={{
                                                error: 'Cannot move to Trash',
                                                success: 'Move to trash successfuly',
                                            }}
                                            action={handleMoveToTrash}
                                        ></HandleTaskDiaglog>
                                        <EditTaskDialog task={task}></EditTaskDialog>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell align="center">No tasks to do!!!</StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
