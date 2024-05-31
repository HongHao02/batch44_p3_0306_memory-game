import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/fakeStore/fakeStoreSlice';
import todoReducer from '../features/todoStore/todoSlice';
import dialogReducer from '../features/dialogStore/dialogSlice';
import memoryReducer from '../features/memoryStore/memorySlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        todos: todoReducer,
        dialog: dialogReducer,
        memory: memoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
