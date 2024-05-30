import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AppDispatch } from '../../app/store';
import { resetDialog } from '../../features/dialogStore/dialogSlice';
import { useDispatch } from 'react-redux';

type NotificationProps = {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
};

const Notification: React.FC<NotificationProps> = ({ open: openProp, message, severity }) => {
    const dispatch: AppDispatch=useDispatch()
    
    const [open, setOpen] = useState(openProp);
    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);
    const handleCloseNotifi=()=>{
        dispatch(resetDialog())
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={7000}
            onClose={handleCloseNotifi}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleCloseNotifi}
                severity={severity}
                sx={{ width: '100%' }}
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseNotifi}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
