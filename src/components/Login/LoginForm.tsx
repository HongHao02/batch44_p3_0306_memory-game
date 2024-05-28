import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

function Loginform() {
    return (
        <div>
            <Link to={routes.todo}>
                <Button variant="contained" color="success">
                    Login
                </Button>
            </Link>
        </div>
    );
}

export default Loginform;
