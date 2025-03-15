import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Group as GroupIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';
import { grayColor, matBlack } from '../../constants/color';

const Link = styled(LinkComponent)`
    text-decoration: none;
    barder-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
        color: rgba(0, 0, 0, 0.5)
    }
`;


const adminTab = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />
    },
];

const SideBar = ({ w="100%" }) => {

    const location = useLocation();
    const logOutHanlder = () => {
        console.log("log out")
    }
    return (
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
            <Typography variant='h5' textTransform={"uppercase"}>
                Admin
            </Typography>
            <Stack spacing={"1rem"}>
                {
                    adminTab.map((tab) => (
                        <Link 
                            key={tab.path} 
                            to={tab.path}
                            sx={
                                location.pathname === tab.path && {
                                    bgcolor: matBlack,
                                    color: "white",
                                    ":hover" : { color: "white"}
                                }
                            }
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }
                <Link 
                    onClick={logOutHanlder}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon />
                        <Typography>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}

const isAdmin = true;

const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(!isMobile);

    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to="/admin" />

  return( 
    <Grid container minHeight={"100vh"}>
        <Box
            sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                right: "1rem",
                top: "1rem"
            }}
        >
            <IconButton onClick={handleMobile}>
                {
                    isMobile? <CloseIcon /> : <MenuIcon />
                }
            </IconButton>
        </Box>
        <Grid 
            item
            md={4}
            lg={3}
            sx={{
                display: {
                    xs: "none",
                    md: "block"
                }
            }}
        >
            <SideBar />
        </Grid>
        <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
                bgcolor: grayColor
            }}
        >
            {children}
        </Grid>
        <Drawer open={isMobile} onClick={handleClose}>
            <SideBar w="50vw" />
        </Drawer>
    </Grid>
    );
};

export default AdminLayout;