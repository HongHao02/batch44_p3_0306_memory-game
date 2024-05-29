import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';

import { Link } from 'react-router-dom';

export default function CustomSearch() {
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Link to="/">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon></SearchIcon>
                </IconButton>
            </Link>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Task"
                inputProps={{ 'aria-label': 'search google maps' }}
                // onChange={(e) => setSearch(e.target.value)}
                // onKeyDown={handleEnterKeyDown}
            />
            <IconButton>
                <ClearIcon></ClearIcon>
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton>
        </Paper>
    );
}
