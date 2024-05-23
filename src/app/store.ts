import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/fakeStore/fakeStoreSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
