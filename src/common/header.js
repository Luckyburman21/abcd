// src/common-header.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout'; 
import BEL_LOGO from "../images/bel_logo.png";

const Logo = styled('img')({
    height: '100px', 
    width: 'auto',   
    marginRight: '20px', 
});

const HeaderContainer = styled(Toolbar)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4682B4', 
    padding: '5px',
    position:"fixed",
    width:"97%",
    zIndex:1200
});

const Title = styled(Typography)({
    flexGrow: 1,
    fontSize: '2rem', 
    color: '#fff', 
    textAlign: 'center',
});

const CommonHeader = ({ onLogout }) => {
    return (
        <AppBar  position="static" style={{ width: '100%',height:'50px'}}>
            <HeaderContainer>
                <Logo src={BEL_LOGO} alt="Logo" style={{width:'10%',height:'50px'}} />
                <h1 class="text-3xl font-bold text-white" >
                Enterprise Financial Information System</h1>
                {/* <Title variant="h6">
                    Enterprise Financial Information System
                </Title> */}
                <IconButton color="inherit" onClick={onLogout}>
                    <LogoutIcon />
                </IconButton>
            </HeaderContainer>
        </AppBar>
    );
};

export default CommonHeader;
