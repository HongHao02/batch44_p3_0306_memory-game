import React from "react";
import { Outlet } from "react-router-dom";

function TaskContainer() {
    return ( <div>
        <Outlet></Outlet>
    </div> );
}

export default TaskContainer;