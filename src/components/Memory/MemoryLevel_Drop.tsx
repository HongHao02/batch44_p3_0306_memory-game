import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MUserI } from '../../types/Memory';
import { shuffleArray } from '../../utils/Function/Array';

interface NameDroppableProps {
    id: number;
    name: string;
    onDrop: (id: number, draggedId: number) => void;
}

export const NameDroppable: React.FC<NameDroppableProps> = ({ id, name, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'IMAGE',
        drop: (item: { id: number }) => {
            onDrop(id, item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    return (
        <div
            ref={drop}
            className={`cursor-pointer w-4/6 md:w-full h-20 flex justify-center items-center rounded-md shadow-sm font-bold text-xl ${
                isOver ? 'bg-green-600' : 'bg-slate-300'
            }`}
        >
            <p className="">{name}</p>
        </div>
    );
};
// const onDrop = (id: number, droppedId: number) => {
//     console.log('id_droppedId ', id, droppedId);
// };

interface MemoryLevelDropProps {
    data: MUserI[];
    onDrop: (id: number, draggedId: number) => void;
}

function MemoryLevel_Drop({ data, onDrop }: MemoryLevelDropProps) {
    const [source, setSource] = useState([...shuffleArray(data)]);
    useEffect(() => {
        setSource([...shuffleArray(data)]);
    }, [data]);
    return (
        <div className="flex flex-row md:w-4/6 md:mx-auto md:flex-col md:h-full justify-evenly items-center gap-2">
            {source.map((mUser: MUserI) => (
                <NameDroppable key={mUser.id} name={mUser.name} id={mUser.id} onDrop={onDrop}></NameDroppable>
            ))}
        </div>
    );
}

export default MemoryLevel_Drop;
