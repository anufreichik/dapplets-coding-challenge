import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dapplets
                </Typography>
                <IconButton color="inherit"><ShoppingCart/></IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
