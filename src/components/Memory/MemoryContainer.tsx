import React, { useEffect, useState } from 'react';
import images from '../../assets/images/images';
import MemoryLevel from './MemoryLevel_Drag';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { addSource, completeLevel, completePlay, startMemory } from '../../features/memoryStore/memorySlice';
import { MemoryUser } from '../../data/MemoryUser';
import { Avatar, Button, Divider, IconButton, Tooltip } from '@mui/material';
import { MUserI, SingleLevel, UserChoose } from '../../types/Memory';
import MemoryLevel_Drag from './MemoryLevel_Drag';
import MemoryLevel_Drop from './MemoryLevel_Drop';
import { divide, drop } from 'lodash';
import { compose } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryTable from '../Table/HistoryTable';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Man } from '@mui/icons-material';
const Manual = () => {
    return (
        <div>
            <p className="font-bold text-xl">How to play memory game?</p>
            <p>You can see 3 avatar in the left sight and 3 name in the other hand</p>
            <p>Drag a image and drop it into the name field where you believe this is the avatar's name</p>
            <p>You can see your result when finish your round</p>
            <p className="font-bold text-xl">Tip</p>
            <p>Click 'Next' to skip this level</p>
            <p>Click 'Finish' to stop your play</p>
        </div>
    );
};

function MemoryContainer() {
    const gameLevel = 3;
    const gameTimeLeft = 30;
    const dispatch: AppDispatch = useDispatch();
    const { sourceCon, level, playHistory } = useSelector((state: RootState) => state.memory);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0);
    const [sConDrag, setSConDrag] = useState([...sourceCon]);
    const [sConDrop, setSConDrop] = useState([...sourceCon]);
    const [chooses, setChooses] = useState<UserChoose[]>([]);
    const [canPlay, setCanPlay] = useState(false);
    const [coreLevel, setCoreLevel] = useState(0);

    //init data memory user
    useEffect(() => {
        dispatch(addSource(MemoryUser));
    }, []);
    useEffect(() => {
        setSConDrag([...sourceCon]);
        setSConDrop([...sourceCon]);
    }, [sourceCon]);

    console.log('CAN PLAY ', canPlay);
    console.log('source ', sConDrag, sConDrop);
    console.log('choose ', chooses);
    console.log('TIMELEFT ', timeLeft);

    // console.log('sourceConDrag ', sConDrag);
    // console.log('sourceConDrop', sConDrop);

    //update player choose
    const handleChoose = (id: number, droppedId: number) => {
        console.log('chooseId ', id, droppedId);

        const uc1 = sConDrag.find((sCon) => sCon.id == droppedId);
        const uc2 = sConDrop.find((sCon) => sCon.id == id);

        if (uc1 && uc2) {
            if (uc1.id == uc2.id) {
                setCoreLevel((prev) => prev + 1);
            }
            setChooses((pre) => [...pre, { uc1: uc1, uc2: uc2 }]);
        }
        console.log(
            'sConDragFilter ',
            sConDrag.filter((s) => s.id != droppedId),
        );
        console.log(
            'sConDrropFilter ',
            sConDrop.filter((s) => s.id != id),
        );

        setSConDrag((prev) => [...prev.filter((s) => s.id != droppedId)]);
        setSConDrop((prev) => [...prev.filter((s) => s.id != id)]);
    };
    const handleStart = () => {
        setCanPlay(true);
        setTimeLeft(gameTimeLeft);
        dispatch(startMemory());
        // setSConDrag([...sourceCon]);
        // setSConDrop([...sourceCon]);
    };
    const handleNext = () => {
        if (level <= gameLevel) {
            const levelResults: SingleLevel = {
                id: level,
                core: coreLevel,
                time: timeLeft,
                choose: chooses,
                sources: sourceCon,
            };
            console.log('levelResult ', levelResults);

            //Save level result
            dispatch(completeLevel(levelResults));
            //set for new level
            setTimeLeft(gameTimeLeft);
            setCoreLevel(0);
            setChooses([]);
            setCanPlay(true);
            dispatch(startMemory());
        } else {
            setCanPlay(false);
            setTimeLeft(0);
            setCoreLevel(0);
            setChooses([]);
            dispatch(completePlay());
        }
    };
    const handleFinish = () => {
        const levelResults: SingleLevel = {
            id: level,
            core: coreLevel,
            time: timeLeft,
            choose: chooses,
            sources: sourceCon,
        };
        //Save level result
        dispatch(completeLevel(levelResults));
        //
        setCanPlay(false);
        setTimeLeft(0);
        setCoreLevel(0);
        setChooses([]);

        dispatch(completePlay());
    };
    useEffect(() => {
        console.log('TIME LEFT EFFECT ');
        let timer;
        if (level <= gameLevel) {
            if (canPlay) {
                timer = setInterval(() => {
                    console.log('timer ', timer);
                    setTimeLeft((prev) => prev - 1);
                }, 1000);

                if (timeLeft <= 0) {
                    //Game level final -> Start new level
                    const levelResults: SingleLevel = {
                        id: level,
                        core: coreLevel,
                        time: 30,
                        choose: chooses,
                        sources: sourceCon,
                    };
                    console.log('levelResult ', levelResults);

                    //Save level result
                    dispatch(completeLevel(levelResults));
                    //set for new level
                    setTimeLeft(gameTimeLeft);
                    setCoreLevel(0);
                    setChooses([]);
                    dispatch(startMemory());
                }
            }
        } else {
            setCanPlay(false);
            dispatch(completePlay());
            console.log('PLAY HISTORY ', playHistory);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleTimeLeft = (timeLeft: number) => {
        if (timeLeft < 10) {
            return 'red';
        } else if (timeLeft < 20) {
            return 'orange';
        } else {
            return 'green';
        }
    };
    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col h-full w-full">
                <div className=" p-4 flex items-center  gap-4 h-20 bg-slate-200">
                    <p>MEMORY GAME</p>
                    <p>LEVEL: {level}/10 </p>
                    <p>| TIME LEFT: {timeLeft}</p>
                    <div>CORE </div>
                    <div className="flex flex-grow justify-end ml-auto">
                        <Tooltip title={<Manual></Manual>}>
                            <IconButton>
                                <QuestionMarkIcon></QuestionMarkIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex flex-grow flex-row bg-slate-100 p-2 rounded-md shadow-md">
                    {!canPlay ? (
                        <div className="flex flex-col gap-2 justify-center items-center w-full">
                            <div className="flex gap-2">
                                <Tooltip title="Click START button to play game">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleStart}
                                        endIcon={<PlayArrowIcon></PlayArrowIcon>}
                                        autoFocus
                                    >
                                        Start
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className="lg:w-3/5">
                                <HistoryTable></HistoryTable>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col w-2/4 h-full  bg-white">
                                <MemoryLevel_Drag data={sConDrag}></MemoryLevel_Drag>
                            </div>
                            <div className={`w-40 flex justify-center items-center`}>
                                <Avatar sx={{ width: 100, height: 100, backgroundColor: handleTimeLeft(timeLeft) }}>
                                    <p className="text-white font-bold text-xl">{timeLeft}</p>
                                </Avatar>
                            </div>
                            <div className="flex flex-col w-2/4 h-full  bg-white">
                                <MemoryLevel_Drop data={sConDrop} onDrop={handleChoose}></MemoryLevel_Drop>
                            </div>
                        </>
                    )}

                    {/* <MemoryLevel_Drag data={sConDrag}></MemoryLevel_Drag>
                    <MemoryLevel_Drop data={sConDrop} onDrop={handleChoose}></MemoryLevel_Drop> */}
                </div>
                <div className=" flex flex-col items-center gap-2 h-10 bg-slate-300">
                    <div className="flex justify-center item-center gap-2 h-full">
                        {level >= 1 && level < gameLevel && (
                            <Tooltip title="Click Next to skip this level">
                                <Button variant="contained" color="info" onClick={handleNext}>
                                    Next
                                </Button>
                            </Tooltip>
                        )}
                        {level + 1 > gameLevel && (
                            <Button variant="contained" color="info" onClick={handleFinish}>
                                Finish
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemoryContainer;
