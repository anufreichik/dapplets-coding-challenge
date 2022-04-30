import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
const Header = () => {
    return (

            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Extention State: Active
                </Typography>
                <IconButton color="inherit"><SettingsIcon/></IconButton>
            </Toolbar>

    );
};

export default Header;
