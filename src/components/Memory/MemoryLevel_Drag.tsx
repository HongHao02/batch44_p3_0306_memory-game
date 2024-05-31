import React, { useEffect, useState } from 'react';
import images from '../../assets/images/images';
import { useDrag, useDrop } from 'react-dnd';
import { MUserI } from '../../types/Memory';
import { shuffleArray } from '../../utils/Function/Array';
import { Tooltip } from '@mui/material';

interface ImageDraggableItemProps {
    id: number;
    src: string;
}

export const ImageDraggableItem = ({ id, src }: ImageDraggableItemProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'IMAGE',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div className="h-1/3  flex justify-center">
            <div ref={drag} className={`w-40 h-full ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
                <img src={src} alt="img1" className="object-cover h-full w-full rounded-md shadow-md" />
            </div>
        </div>
    );
};

const onDrop = (id: number, droppedId: number) => {
    console.log('id_droppedId ', id, droppedId);
};
interface MemoryLevelDragProps {
    data: MUserI[];
}

function MemoryLevel_Drag({ data }: MemoryLevelDragProps) {
    const [source, setSource] = useState([...data]);
    useEffect(() => {
        setSource([...data]);
    }, [data]);
    return (
        <div className="flex flex-col gap-2 h-full">
            {source.map((mUser: MUserI) => (
                <ImageDraggableItem key={mUser.id} id={mUser.id} src={mUser.image.src}></ImageDraggableItem>
            ))}
        </div>
    );
}

export default MemoryLevel_Drag;
