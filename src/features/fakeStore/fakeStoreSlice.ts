import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../../types/Product';
import { getFakeProduct } from './fakeStoreThunk';

interface ProductInitialState {
    products: Product[];
    error: string | undefined | null;
    state: 'pending' | 'fulfilled' | 'rejected' | 'none';
}

const initialState: ProductInitialState = {
    products: [],
    error: null,
    state: 'none',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const newProduct: Product = {
                id: 1001 + state.products.length + 1,
                category: action.payload.category,
                description: action.payload.description,
                image: action.payload.image,
                price: action.payload.price,
                title: action.payload.title,
            };
            state.products.push(newProduct);
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
    //   extraReducers(builder) {
    //     builder
    //         .addCase(getTodoList.pending, (state) => {
    //             //Xử lý sự kiện khi bắt đầu loading data
    //             state.state = 'pending';
    //         })
    //         .addCase(getTodoList.fulfilled, (state, action) => {
    //             console.log("ADDRESSES_THUNK_SUCCESS ", action.payload)
    //             // Xử lý sự kiện khi request thành công
    //             state.state = 'fulfilled';
    //             // Add any fetched posts to the array
    //             state.todos = action.payload;
    //         })
    //         .addCase(getTodoList.rejected, (state, action) => {
    //             //Xử lý khi request bị từ chối
    //             state.state = 'rejected';
    //             state.error = action.payload as string
    //         })
    // },
    extraReducers: (builder) => {
        builder
            .addCase(getFakeProduct.pending, (state) => {
                state.state = 'pending';
                state.error = null;
            })
            .addCase(getFakeProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.state = 'fulfilled';
                console.log('todos_from_thunk ', action.payload);
                state.products = action.payload;
            })
            .addCase(getFakeProduct.rejected, (state, action) => {
                state.state = 'rejected';
                state.error = action.payload as string;
            });
    },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
