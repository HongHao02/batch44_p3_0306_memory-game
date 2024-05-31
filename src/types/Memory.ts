export interface ImageI {
    idImage: number;
    src: string;
}
export interface MUserI {
    id: number;
    name: string;
    image: ImageI;
}
export interface UserChoose {
    uc1: MUserI;
    uc2: MUserI;
}
export interface SingleLevel {
    id: number;
    core: number;
    time: number;
    sources: MUserI[];
    choose: UserChoose[];
}
export interface HistoryRound {
    no: number;
    round: SingleLevel[];
    totalCore: number
}
