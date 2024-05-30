import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskCreateInputI, TaskI, TaskTranform, TaskUpdateInputI, UserI } from '../../types/Task';
import staff from '../../data/User';
import _ from 'lodash';

interface DialogInitialState {
    open: boolean;
    onClose: () => void;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

const initialState: DialogInitialState = {
    open: false,
    message: '',
    onClose: () => {},
    severity: 'success',
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        addDialog: (state, action: PayloadAction<DialogInitialState>) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.onClose = action.payload.onClose;
            state.severity = action.payload.severity;
        },
        resetDialog: (state) => {
            state.open = false;
            state.message = '';
            state.onClose = () => {};
            state.severity = 'success';
        },
        setStateDialog: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const { addDialog, resetDialog, setStateDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
