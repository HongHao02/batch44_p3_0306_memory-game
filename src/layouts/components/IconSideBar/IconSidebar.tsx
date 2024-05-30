import React, { useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeleteIcon from '@mui/icons-material/Delete';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GradingIcon from '@mui/icons-material/Grading';
import routes from '../../../config/routes';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const IconSideBar = [
    { id: 1, icon: HomeIcon, title: 'Home', to: routes.todo },
    { id: 2, icon: GradingIcon, title: 'Completed', to: routes.complete },
    { id: 3, icon: AssignmentIndIcon, title: 'Resources', to: routes.dataset },
    { id: 4, icon: ChatBubbleOutlineIcon, title: 'Chat', to: routes.todo },
    { id: 5, icon: Diversity2Icon, title: 'Diverity', to: routes.todo },
    { id: 6, icon: DeleteIcon, title: 'Trash', to: routes.trash },
    { id: 7, icon: LoyaltyIcon, title: 'Loyal', to: routes.todo },
];

function IconSidebar() {
    const [active, setActive] = useState<number>(1);
    const handleActive = (id: number) => {
        setActive(id);
    };
    return (
        <div className="flex flex-col  items-center w-14 bg-white shadow-md">
            {IconSideBar.map(({ id, title, icon: Icon, to }) => (
                <Tooltip key={id} title={title} placement="right">
                    <Link to={to}>
                        <div
                            // className={id == active ? 'border-l-2 border-blue-500 animate-pulse ' : ''}
                            className={`w-full flex justify-center py-3 transition-all duration-500 ${
                                id === active
                                    ? 'border-l-2 border-blue-500 bg-blue-100'
                                    : 'border-l-2 border-transparent'
                            }`}
                            onClick={() => handleActive(id)}
                        >
                            <IconButton>
                                <Icon
                                    className={`transition-transform duration-300 ${
                                        id === active ? 'scale-110 text-blue-500' : 'text-gray-600'
                                    }`}
                                />
                            </IconButton>
                        </div>
                    </Link>
                </Tooltip>
            ))}
        </div>
    );
}

export default IconSidebar;
