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
import { TaskI, TaskStatusType, Tasktype, UserI } from '../../types/Task';
import { Chip, IconButton, Tooltip } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import EditTaskDialog from '../Dialog/EditTaskDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Add } from '@mui/icons-material';
import AddTaskDialog from '../Dialog/AddTaskDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import RedoIcon from '@mui/icons-material/Redo';
import { TaskTranform } from '../../types/Task';
import { redoCompleteTask, redoTrashTask } from '../../features/todoStore/todoSlice';
import HandleTaskDiaglog from '../Dialog/HandleTaskDialog';
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

const renderChip = (type: Tasktype) => {
    switch (type) {
        case 'complete':
            return <Chip label="Completed" color="default" />;
        case 'trash':
            return <Chip label="Trashed" color="default" />;
        default:
            return <Chip label="Not started" color="default" />;
    }
};

const renderEmptyTask = (type: Tasktype) => {
    switch (type) {
        case 'complete':
            return 'No task are completed!!!';
        case 'trash':
            return 'Empty trash!!!';
        default:
            return 'Year! No task to do!!!';
    }
};

interface TodoTaskMakeContainerProps {
    type: Tasktype;
}

export default function TodoTaskMakeContainer({ type }: TodoTaskMakeContainerProps) {
    const { completeTask, trashTask, tasks } = useSelector((state: RootState) => state.todos);
    const dispatch: AppDispatch = useDispatch();

    const chooseTaskList = (type: Tasktype) => {
        switch (type) {
            case 'complete':
                return completeTask;
            case 'trash':
                return trashTask;
            default:
                return [];
        }
    };
    const hanleRedoTrashTask = (idTask: number) => {
        dispatch(redoTrashTask(idTask));
    };
    const hanleRedoCompleteTask = (idTask: number) => {
        dispatch(redoCompleteTask(idTask));
    };
    const renderRedoChip = (type: Tasktype, task: TaskTranform) => {
        if (type == 'complete' || type == 'trash') {
            const redoTask: TaskI = {
                idTask: task.idTask,
                deadline: task.deadline,
                name: task.name,
                respon: task.respon,
            };
            return (
                <HandleTaskDiaglog
                    title="Redo"
                    icon={RedoIcon}
                    task={redoTask}
                    response={{
                        error: 'Cannot redo task',
                        success: 'Redo task successfuly',
                    }}
                    action={type == 'complete' ? hanleRedoCompleteTask : hanleRedoTrashTask}
                ></HandleTaskDiaglog>
            );
        }
    };
    console.log('trashTask ', trashTask);
    console.log('tasks ', tasks);

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chooseTaskList(type).length != 0 ? (
                        chooseTaskList(type).map((task) => (
                            <StyledTableRow key={task.name}>
                                <StyledTableCell component="th" scope="task">
                                    {task.idTask}
                                </StyledTableCell>
                                <StyledTableCell align="center">{task.name}</StyledTableCell>
                                <StyledTableCell align="center">{task.deadline}</StyledTableCell>
                                <StyledTableCell align="center">{`${task.respon?.firstName ?? 'Not'}_${
                                    task.respon?.id ?? 'assign'
                                }`}</StyledTableCell>
                                <StyledTableCell align="center">{renderChip(type)}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="flex gap-2 items-center justify-center">
                                        {renderRedoChip(type, task)}
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell align="center">{renderEmptyTask(type)}</StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
