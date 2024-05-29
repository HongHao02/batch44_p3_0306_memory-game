import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskCreateInputI, TaskI, TaskTranform, TaskUpdateInputI, UserI } from '../../types/Task';
import staff from '../../data/User';
import _ from 'lodash';

interface TodoInitialState {
    rootID: number;
    tasks: TaskI[];
    completeTask: TaskTranform[];
    trashTask: TaskTranform[];
    error: string | undefined | null;
    state: 'pending' | 'fulfilled' | 'rejected' | 'none';
}

const initialState: TodoInitialState = {
    rootID: 0,
    tasks: [],
    completeTask: [],
    trashTask: [],
    error: null,
    state: 'none',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskCreateInputI>) => {
            state.rootID++;
            const responUser = _.find(staff, (user: UserI) => user.id == action.payload.id);
            const taskTransform: TaskI = {
                idTask: state.rootID,
                deadline: action.payload.deadline,
                name: action.payload.name,
                respon: responUser,
            };
            state.tasks.push(taskTransform);
        },
        addTasksList: (state, action: PayloadAction<TaskI[]>) => {
            state.rootID = action.payload.length;
            state.tasks = action.payload;
        },
        updateTask: (state, action: PayloadAction<TaskUpdateInputI>) => {
            const existsTask = _.find(state.tasks, (t: TaskI) => t.idTask == action.payload.idTask);
            const responUser = _.find(staff, (user: UserI) => user.id == action.payload.idUser);
            if (existsTask) {
                existsTask.name = action.payload.name;
                existsTask.deadline = action.payload.deadline;
                existsTask.respon = responUser;
            }
        },
        addCompleteTask: (state, action: PayloadAction<number>) => {
            const existsTask = _.find(state.tasks, (t: TaskI) => t.idTask === action.payload);
            const indexTask = _.findIndex(state.tasks, (t) => t.idTask === action.payload);
            console.log('id_index ', action.payload, indexTask);
            console.log('exitstTask ', existsTask);

            if (existsTask && indexTask !== -1) {
                const tTransform: TaskTranform = {
                    idTask: existsTask.idTask,
                    deadline: existsTask.deadline,
                    name: existsTask.name,
                    respon: existsTask.respon,
                    index: indexTask,
                };
                state.completeTask.push(tTransform);
                state.tasks = _.filter(state.tasks, (t: TaskI) => t.idTask != existsTask.idTask);
                state.error = null;
            } else {
                state.error = 'Can not add task to Complete Task';
            }
        },
        moveToTrash: (state, action: PayloadAction<number>) => {
            const existsTask = _.find(state.tasks, (t: TaskI) => t.idTask === action.payload);
            const indexTask = _.findIndex(state.tasks, (t) => t.idTask === action.payload);
            console.log('id_index ', action.payload, indexTask);
            console.log('exitstTask ', existsTask);

            if (existsTask && indexTask !== -1) {
                const tTransform: TaskTranform = {
                    idTask: existsTask.idTask,
                    deadline: existsTask.deadline,
                    name: existsTask.name,
                    respon: existsTask.respon,
                    index: indexTask,
                };
                state.trashTask.push(tTransform);
                state.tasks = _.filter(state.tasks, (t: TaskI) => t.idTask != existsTask.idTask);
                state.error = null;
            } else {
                state.error = 'Cannot move to Trash';
            }
        },
        redoTrashTask: (state, action: PayloadAction<number>) => {
            const existsTrash = _.find(state.trashTask, (t) => t.idTask === action.payload);
            if (existsTrash) {
                const redoTask: TaskI = {
                    idTask: existsTrash.idTask,
                    deadline: existsTrash.deadline,
                    name: existsTrash.name,
                    respon: existsTrash.respon,
                };
                state.trashTask = [
                    ..._.filter(state.trashTask, (trash: TaskTranform) => trash.idTask != action.payload),
                ];
                state.tasks.splice(existsTrash.index, 0, redoTask);
                state.error = null;
            } else {
                state.error = 'Can not redo task!';
            }
        },
        redoCompleteTask: (state, action: PayloadAction<number>) => {
            const existsTrash = _.find(state.completeTask, (t) => t.idTask === action.payload);
            if (existsTrash) {
                const redoTask: TaskI = {
                    idTask: existsTrash.idTask,
                    deadline: existsTrash.deadline,
                    name: existsTrash.name,
                    respon: existsTrash.respon,
                };
                state.completeTask = [
                    ..._.filter(state.completeTask, (trash: TaskTranform) => trash.idTask != action.payload),
                ];
                state.tasks.splice(existsTrash.index, 0, redoTask);
                state.error = null;
            } else {
                state.error = 'Can not redo task!';
            }
        },
    },
});

export const { addTask, updateTask, addCompleteTask, moveToTrash, redoTrashTask, redoCompleteTask, addTasksList } = todoSlice.actions;

export default todoSlice.reducer;
