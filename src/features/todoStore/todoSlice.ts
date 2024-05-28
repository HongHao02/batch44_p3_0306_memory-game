import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskCreateInputI, TaskI, TrashTaskI, UserI } from '../../types/Task';
import staff from '../../data/User';
import _ from 'lodash'

interface TodoInitialState {
    rootID: number,
    tasks: TaskI[],
    completeTask: TaskI[],
    trashTask: TrashTaskI[],
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
            state.rootID++
            const responUser= _.find(staff, (user: UserI)=> user.id == action.payload.id)
            const taskTransform: TaskI= {
                idTask: state.rootID,
                deadline: action.payload.deadline,
                name: action.payload.name,
                respon: responUser
            }
            state.tasks.push(taskTransform)
            
        },
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     const todo = state.todos.find((todo) => todo.id === action.payload);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },
        // removeTodo: (state, action: PayloadAction<number>) => {
        //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        // },
    },
});

export const { addTask } = todoSlice.actions;

export default todoSlice.reducer;
