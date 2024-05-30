export interface UserI{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}

export interface TaskI{
    idTask: number,
    name: string,
    deadline: string,
    respon?: UserI | undefined
}

export type ListTaskType= "todo"|"sortByDeadline"|"sortByAUser"
export type TaskStatusType = "Not Started" | "In Progress" | "Completed" | "Pending" | "Overdue" | "Due Soon"
export type Tasktype= "not-started"|"complete"|"trash"|"drafts"
//Tasktype for redux store
export interface TaskCreateInputI{
    name: string,
    deadline: string,
    id?: number,
}
export interface TaskUpdateInputI{
    name: string,
    deadline: string,
    idTask: number,
    idUser?: number
}
export interface TaskTranform extends TaskI{
    index: number,
}
export type TaskIdAction = (taskId: number) => void;
