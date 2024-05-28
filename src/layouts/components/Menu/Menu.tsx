import React from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import FilterListIcon from '@mui/icons-material/FilterList';
function Menu() {
    return (
        <div className="flex items-center gap-2">
            <Link to={routes.newEmail}>
                <Button variant="outlined" startIcon={<MailIcon></MailIcon>}>
                    New Email
                </Button>
            </Link>
            <Link to={routes.sortByTime}>
                <Tooltip title="sort by time" placement="bottom">
                    <IconButton>
                        <FilterListIcon></FilterListIcon>
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );
}

export default Menu;
