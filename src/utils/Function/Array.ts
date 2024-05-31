import { MUserI } from "../../types/Memory";

export function shuffleArray(array: MUserI[]) {
    return array.sort(() => Math.random() - 0.5);
}