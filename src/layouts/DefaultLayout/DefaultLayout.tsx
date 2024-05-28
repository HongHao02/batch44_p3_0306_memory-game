import MailIcon from '@mui/icons-material/Mail';
import { IconButton, Tooltip } from '@mui/material';
import SidebarCustom from '../components/Sidebar/SidebarCustom';
import { Outlet } from 'react-router-dom';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Menu from '../components/Menu/Menu';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import Header from '../components/Header/Header';

function DefaultLayout() {
    return (
        <div className="flex flex-col gap-1 overflow-x-hidden min-h-screen">
            <Header></Header>
            <div className="flex bg-white mt-12 sm:mt-16 flex-1 mb-2">
                <div className="flex flex-col  items-center w-14 bg-white shadow-md">
                    <Tooltip title="Delete" placement="right">
                        <IconButton>
                            <MailIcon></MailIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chat" placement="right">
                        <IconButton>
                            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="right">
                        <IconButton>
                            <MailIcon></MailIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="right">
                        <IconButton>
                            <MailIcon></MailIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="right">
                        <IconButton>
                            <MailIcon></MailIcon>
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
