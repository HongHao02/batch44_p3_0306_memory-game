import * as request from '../../utils/httpRequests';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFakeProduct = createAsyncThunk('products/getFakeProduct', async (_, { rejectWithValue }) => {
    try {
        const response = await request.getFakeProduct();
        console.log('resonse from thunk ', response);
        return response;
    } catch (error) {
        // Adjust error handling to match your API's error structure
        return rejectWithValue('Failed to fetch fake store');
    }
});
