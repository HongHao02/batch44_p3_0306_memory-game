// src/components/ThemeToggle.js
import React, { useEffect, useState } from 'react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness1 } from '@mui/icons-material';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // On initial load, check for saved theme preference in localStorage
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            {/* <IconButton onClick={toggleTheme} className="mt-4 px-4 py-2 bg-blue-500 text-white dark:bg-yellow-500 hover:bg-white"> */}
            {isDarkMode ? (
                <Tooltip title='Dark mode'>
                    <Brightness4Icon color="inherit" onClick={toggleTheme}></Brightness4Icon>
                </Tooltip>
            ) : (
                <Tooltip title='Light mode'>
                    <Brightness5Icon onClick={toggleTheme} color="inherit"></Brightness5Icon>
                </Tooltip>
            )}
            {/* </IconButton> */}
        </>
    );
};

export default ThemeToggle;
