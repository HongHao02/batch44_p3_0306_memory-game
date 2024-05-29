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
import { TaskI, TaskIdAction } from '../../types/Task';
import Notification from '../Notification/Notification';
import { ReduxResponse, ResponseObject } from '../../types/ResponseObject';
import { SvgIconProps } from '@mui/material';

interface CheckCompleteDialogProps {
    task: TaskI;
    action: TaskIdAction;
    response: ReduxResponse;
    icon: React.ElementType<SvgIconProps>,
    title: string
}
export default function HandleTaskDiaglog({ task, action, response, icon : Icon, title }: CheckCompleteDialogProps) {
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
        action(task.idTask)
        if (error) {
            console.log('add_complete_error ', error);
            handleClick(response.error, "error");
        } else {
            console.log('add_complete_success ', error);
            handleClick(response.success, "success");
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Notification
                open={notificationOpen}
                onClose={handleCloseNoti}
                message={notificationMessage}
                severity={notificationSeverity}
            />
            <Tooltip title={title}>
                <IconButton onClick={handleClickOpen}>
                    <Icon></Icon>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {title} <span className="font-bold">{task.name}</span> by{' '}
                        <span className="font-bold">{task.respon?.firstName ?? 'No one'} </span>
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
