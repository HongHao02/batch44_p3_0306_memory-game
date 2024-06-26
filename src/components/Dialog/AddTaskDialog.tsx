import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Tooltip,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TaskCreateInputI } from '../../types/Task';
import staff from '../../data/User';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addTask } from '../../features/todoStore/todoSlice';
import { addDialog, resetDialog } from '../../features/dialogStore/dialogSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface TaskInput {
    name: string;
    deadline: string;
    id: string;
}
interface TaskError {
    errorName: string | null;
    errorDate: string | null;
    errorSelect: string | null;
}
export default function AddTaskDialog() {
    const [open, setOpen] = React.useState(false);
    const [canSubmit, setCansubmit] = useState(false);

    const { error: errorTodo } = useSelector((state: RootState) => state.todos);
    const [formData, setFormData] = useState<TaskInput>({ name: '', deadline: '', id: '' });
    const [error, setError] = useState<TaskError>({ errorName: null, errorDate: null, errorSelect: null });

    const dispatch: AppDispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSetError = (name: string, message: string | null) => {
        setError((prev: TaskError) => ({ ...prev, [name]: message }));
    };
    const resetForm = () => {
        setFormData({
            id: '',
            deadline: '',
            name: '',
        });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setFormData({
            ...formData,
            id: event.target.value,
        });
    };
    const handleCloseNoti = () => {
        dispatch(resetDialog());
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, deadline, id } = formData;
        const idUser: number = parseInt(id);
        const inputTransform: TaskCreateInputI = {
            id: idUser,
            name: name,
            deadline: moment(deadline).format('MM/DD/YYYY HH:mm'),
        };
        dispatch(addTask(inputTransform));
        resetForm();
        setOpen(false);
        if (!errorTodo) {
            dispatch(
                addDialog({
                    message: 'Add task successfully',
                    open: true,
                    severity: 'success',
                }),
            );
        } else {
            dispatch(
                addDialog({
                    message: 'Some error occured when add task!Try again.',
                    open: true,
                    severity: 'warning',
                }),
            );
        }
    };
    useEffect(() => {
        if (formData.name.length == 0) {
            handleSetError('errorName', 'Task name must be not empty!');
        } else if (formData.name.length > 30) {
            handleSetError('errorName', 'Task name length must less than 30 letters!');
        } else {
            handleSetError('errorName', null);
        }
        if (formData.deadline) {
            const momentDate = moment(formData.deadline);
            if (momentDate.diff(moment(), 'minutes') < 0) {
                handleSetError('errorDate', 'Please choose another after today!');
            } else {
                handleSetError('errorDate', null);
            }
        } else {
            handleSetError('errorDate', 'Task deadline must be not empty');
        }
        if (
            error.errorDate == null &&
            error.errorName == null &&
            error.errorSelect == null &&
            formData.name.length > 0 &&
            formData.deadline.length > 0
        ) {
            setCansubmit(true);
        } else {
            setCansubmit(false);
        }
    }, [formData]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Tooltip title="Add task">
                <IconButton onClick={handleClickOpen} color="success">
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </IconButton>
            </Tooltip>
            <BootstrapDialog
                maxWidth="sm"
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 400 }} id="customized-dialog-title">
                    ADD TASK
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <form onSubmit={handleSubmit}>
                        <div className="h-full">
                            <div className="flex items-center gap-2 min-h-8 p-2">
                                <p className="font-bold w-20">Task name</p>
                                <input
                                    onChange={handleChange}
                                    value={formData.name}
                                    className="flex-1 appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-l-0 border-r-0"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name task"
                                />
                            </div>
                            {error.errorName && (
                                <div className="font-bold text-center text-red-500">{error.errorName}</div>
                            )}
                            <Divider></Divider>
                            <div className="flex items-center gap-2 min-h-8 p-2">
                                <p className="font-bold w-20">Deadline</p>
                                <input
                                    type="datetime-local"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    name="deadline"
                                    className="bg-slate-100 rounded-md p-2"
                                />
                            </div>
                            {error.errorDate && (
                                <div className="font-bold text-center text-red-500">{error.errorDate}</div>
                            )}

                            <Divider></Divider>
                            <div className="flex items-center gap-2 min-h-8 p-2">
                                <p className="font-bold w-20">Assign</p>
                                <FormControl variant="filled" sx={{ minWidth: 230, backgroundColor: 'white' }}>
                                    <InputLabel id="assign">Assign</InputLabel>
                                    <Select
                                        labelId="assign"
                                        id="demo-simple-select-filled"
                                        value={formData.id}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {staff.map((user) => (
                                            <MenuItem
                                                key={user.id}
                                                value={`${user.id}`}
                                            >{`${user.firstName} ${user.lastName}`}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="flex justify-end mt-2">
                                <Button type="submit" variant="contained" disabled={!canSubmit}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="warning" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
