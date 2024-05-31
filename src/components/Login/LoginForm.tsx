import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

function Loginform() {
    const navigate = useNavigate();
    const handleLogin = () => {
        if (true) {
            navigate('/memory');
        }
    };
    return (
        <div className="flex h-screen justify-center items-center">
            <Button variant="contained" color="success" onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
}

export default Loginform;
