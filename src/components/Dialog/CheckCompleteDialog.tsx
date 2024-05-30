import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCompleteTask } from '../../features/todoStore/todoSlice';
import { TaskI } from '../../types/Task';
import Notification from '../Notification/Notification';

interface CheckCompleteDialogProps {
    task: TaskI;
}
export default function CheckCompleteDialog({ task }: CheckCompleteDialogProps) {
    const [open, setOpen] = React.useState(false);
    const { error } = useSelector((state: RootState) => state.todos);
    const dispatch: AppDispatch = useDispatch();

    //Notification
    const [notificationOpen, setNotificationOpen] = React.useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');
    const [notificationSeverity, setNotificationSeverity] = React.useState<'success' | 'error' | 'warning' | 'info'>(
        'success',
    );

    const handleClick = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        console.log('show_notification ');
        setNotificationOpen(true);
        setNotificationMessage(message);
        setNotificationSeverity(severity);
    };
    console.log('show_notification ', notificationOpen);

    const handleCloseNoti = () => {
        setNotificationOpen(false);
    };
    ///
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickAgree = () => {
        dispatch(addCompleteTask(task.idTask));
        if (error) {
            console.log('add_complete_error ', error);
            handleClick('Some error occur when add complete task!', 'error');
        } else {
            console.log('add_complete_success ', error);
            handleClick('Add task to complete tasks successfuly!', 'success');
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Notification
                open={notificationOpen}
                message={notificationMessage}
                severity={notificationSeverity}
            />
            <Tooltip title="Check complete">
                <IconButton onClick={handleClickOpen}>
                    <DownloadDoneIcon></DownloadDoneIcon>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Check complete task?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Check task <span className="font-bold">{task.name}</span> by{' '}
                        <span className="font-bold">{task.respon?.firstName ?? 'No one'} </span>to complete tasks list
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClickAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
