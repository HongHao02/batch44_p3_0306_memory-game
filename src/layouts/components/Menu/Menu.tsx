import React from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import FilterListIcon from '@mui/icons-material/FilterList';
function Menu() {
    return (
        <div className="flex items-center gap-2">
            <Link to={routes.todo}>
                <Button variant="outlined">
                    TODO DASHBOARD
                </Button>
            </Link>
            <Link to={routes.sort}>
                <Tooltip title="Sort" placement="bottom">
                    <IconButton>
                        <FilterListIcon></FilterListIcon>
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );
}

export default Menu;
