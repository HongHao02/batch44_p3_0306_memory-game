import { IconButton, Tooltip } from '@mui/material';
import SidebarCustom from '../components/Sidebar/SidebarCustom';
import { Link, Outlet } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Menu from '../components/Menu/Menu';
import React from 'react';
import Header from '../components/Header/Header';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeleteIcon from '@mui/icons-material/Delete';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GradingIcon from '@mui/icons-material/Grading';
import routes from '../../config/routes';
import HomeIcon from '@mui/icons-material/Home';
function DefaultLayout() {
    return (
        <div className="flex flex-col gap-1 overflow-x-hidden min-h-screen">
            <Header></Header>
            <div className="flex bg-white mt-12 sm:mt-16 flex-1 mb-2">
                <div className="flex flex-col  items-center w-14 bg-white shadow-md">
                    <Tooltip title="Home" placement="right">
                        <Link to={routes.todo}>
                            <IconButton>
                                <HomeIcon></HomeIcon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Compelted" placement="right">
                        <Link to={routes.complete}>
                            <IconButton>
                                <GradingIcon></GradingIcon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Resources" placement="right">
                        <IconButton>
                            <AssignmentIndIcon></AssignmentIndIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chat" placement="right">
                        <IconButton>
                            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Diverity" placement="right">
                        <IconButton>
                            <Diversity2Icon></Diversity2Icon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Trash" placement="right">
                        <IconButton>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tag" placement="right">
                        <IconButton>
                            <LoyaltyIcon></LoyaltyIcon>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-2 min-h-[570px]">
                    <div className="bg-slate-100 shadow-md rounded-md p-2 h-12">
                        <Menu></Menu>
                    </div>
                    <div className="flex flex-1 ">
                        <div className="w-2/12 hidden lg:block p-2 rounded-md">
                            <SidebarCustom></SidebarCustom>
                        </div>
                        <div className="w-10/12 bg-white">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
