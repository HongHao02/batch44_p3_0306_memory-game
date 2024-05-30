import SidebarCustom from '../components/Sidebar/SidebarCustom';
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import React from 'react';
import Header from '../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import IconSidebar from '../components/IconSideBar/IconSidebar';

function DefaultLayout() {
    const dispatch: AppDispatch = useDispatch();
    const { open, onClose, message, severity } = useSelector((state: RootState) => state.dialog);
    return (
        <div className="flex flex-col gap-1 overflow-x-hidden min-h-screen">
            <Notification open={open} onClose={onClose} message={message} severity={severity} />
            <Header></Header>
            <div className="flex bg-white mt-12 sm:mt-16 flex-1 mb-2">
                <IconSidebar></IconSidebar>
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
