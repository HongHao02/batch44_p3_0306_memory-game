import React from 'react';
import Notification from '../Notification/Notification';
interface DialogContainer {
    notificationOpen: boolean;
    handleCloseNoti: () => void;
    notificationMessage: string;
    notificationSeverity: 'success' | 'error' | 'warning' | 'info';
}

function DialogContainer({
    handleCloseNoti,
    notificationMessage,
    notificationOpen,
    notificationSeverity,
}: DialogContainer) {
    return <Notification open={notificationOpen} message={notificationMessage} severity={notificationSeverity} />;
}

export default DialogContainer;
