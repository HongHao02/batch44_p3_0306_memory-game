import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const get: any = async (path: string, option?: any) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

//fake store api
export const getFakeProduct: any = async () => {
    const response = await get('/products');
    console.log('httpRequest ', response);
    return response;
};
