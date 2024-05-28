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

export interface TrashTaskI extends TaskI{
    index: number
}

export type TaskStatusType = "Not Started" | "In Progress" | "Completed" | "Pending" | "Overdue" | "Due Soon"

export interface TaskCreateInputI{
    name: string,
    deadline: string,
    id?: number,
}
