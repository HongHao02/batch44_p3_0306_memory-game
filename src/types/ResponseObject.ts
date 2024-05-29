export interface ResponseObject {
    status: 'success' | 'error' | 'warning' | 'info';
    message: string;
}
export interface ReduxResponse {
    error: string
    success: string;
}
