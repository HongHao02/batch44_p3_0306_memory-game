import React from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import DatasetIcon from '@mui/icons-material/Dataset';
function Menu() {
    return (
        <div className="flex items-center gap-2">
            <Link to={routes.todo}>
                <Button variant="outlined">TODO DASHBOARD</Button>
            </Link>
            <Link to={routes.dataset}>
                <Tooltip title="Dataset" placement="bottom">
                    <IconButton>
                        <DatasetIcon></DatasetIcon>
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );
}

export default Menu;
