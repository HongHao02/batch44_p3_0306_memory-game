import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _, { round } from 'lodash';
import { HistoryRound, MUserI, SingleLevel } from '../../types/Memory';
import { SatelliteAlt } from '@mui/icons-material';
import { shuffleArray } from '../../utils/Function/Array';

interface MemoryInitialState {
    level: number;
    round: number;
    playHistory: HistoryRound[];
    results: SingleLevel[];
    source: MUserI[];
    sourcePro: MUserI[];
    sourceCon: MUserI[];
    toTalCore: number;
}

const initialState: MemoryInitialState = {
    level: 0,
    round: 1,
    results: [],
    sourcePro: [],
    source: [],
    sourceCon: [],
    playHistory: [],
    toTalCore: 0,
};

const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {
        addSource: (state, action: PayloadAction<MUserI[]>) => {
            state.source = [...action.payload];
            state.sourcePro = [...shuffleArray(state.source)];
        },
        completeLevel: (state, action: PayloadAction<SingleLevel>) => {
            state.results = [...state.results, action.payload];
            console.log('LEVEL_RESULT ', state.results);
            // state.sourceCon = [...state.sourcePro.slice(0, 3)];
            // state.sourcePro = [...state.sourcePro.slice(3, state.sourcePro.length)];
            state.toTalCore = state.toTalCore + action.payload.core;
        },
        startMemory: (state) => {
            state.level = state.level + 1;
            state.sourcePro = [...shuffleArray(state.source)];
            state.sourceCon = [...state.sourcePro.slice(0, 3)];
            state.sourcePro = [...state.sourcePro.slice(3, state.sourcePro.length)];
        },
        completePlay: (state) => {
            state.round++;
            state.level = 0;
            console.log('RESULTS ADD TO HIS ', state.results);

            state.playHistory.push({
                no: state.round,
                round: [...state.results],
                totalCore: state.toTalCore,
            });
            state.results = [];
            state.toTalCore = 0;
            // state.playHistory= _.sortBy(state.playHistory, (h)=>h.totalCore, ['desc'])
            state.playHistory = state.playHistory.sort((a, b) => b.totalCore - a.totalCore);
        },
    },
});

export const { addSource, startMemory, completeLevel, completePlay } = memorySlice.actions;

export default memorySlice.reducer;
