import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/fakeStore/fakeStoreSlice';
import todoReducer from '../features/todoStore/todoSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        todos: todoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
