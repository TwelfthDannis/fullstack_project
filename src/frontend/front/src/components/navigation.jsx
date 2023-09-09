//#Imports
import * as React from 'react';
import {useEffect, useState} from "react";
import {
    AppBar, Avatar,
    Box, Button, ButtonGroup,
    Container,
    Divider, Drawer, Hidden, IconButton,
    Link, Menu, MenuItem, styled, SwipeableDrawer, Toolbar, Tooltip,
    Typography, useMediaQuery
} from "@mui/material";
//Icons
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from "../api/axios.jsx";
//Close


export default function Navigation() {
    const isLargeScreen = useMediaQuery('(min-width:1200px)');
    //#Location
    const [userCity, setUserCity] = useState({location: "Loading..", city: "Unknown"});
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const [latitude, longitude] = [position.coords.latitude, position.coords.longitude];
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
                        const data = await response.json();
                        const cityName = data.address.city || 'Unknown';
                        setUserCity({
                            location: `Location: ${cityName}, Lat: ${latitude}, Long: ${longitude}`,
                            city: cityName
                        });
                    } catch (error) {
                        console.error('Error fetching city:', error);
                        setUserCity({location: "Location not available", city: 'Unknown'});
                    }
                },
                (error) => {
                    console.error(error);
                    setUserCity({location: "Location not available", city: 'Unknown'});
                }
            );
        } else {
            setUserCity({location: "Geolocation not supported", city: 'Unknown'});
        }
    }, []);
    const profile = document.cookie;
    const [isAuth, setIsAuth] = useState(!document.cookie);
    //Close
    const Styles = {
        Brand: {
            letterSpacing: ".3rem",
            color: '#c7493a',
            flexGrow: {lg: 0, xs: 1},
            fontSize: {lg: "30px", xs: "24px"},
            display: "flex",
            justifyContent: "center",
            fontFamily: "monospace"
        },
        Button: {
            my: 2,
            color: '#d6ccc2',
            display: 'block',
            fontSize: {lg: "16px", xs: "14px"},
            width: "100px",
            borderColor: "red",
            "&&.MuiButton-root": {borderColor: "#d6ccc2"},
            ":hover": {
                backgroundColor: "rgba(199,73,58,0.07)"
            }
        },
        Menu: {
            ".MuiPaper-root": {
                backgroundColor: "#161616",
                color: "#d6ccc2"
            }
        },

    }
    const StyleButtonMenu = styled(Button)(({theme}) => ({borderColor: "#d6ccc2",}));
    const [openSetting, setOpenSetting] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openSettingMobile, setOpenSettingMobile] = useState(false);
    const handleClose = (name) => {
        switch (name) {
            case "account":
                setOpenSetting(null);
                break;
            case "menu":
                setOpenMenu(false);
                break;
            case "mobileSetting":
                setOpenSettingMobile(false);
                break;
        }
    }
    const handleClick = (event, name) => {
        switch (name) {
            case "account": {
                setOpenSetting(event.currentTarget);
                console.log(profile)
                break;
            }
            case "menu": {
                setOpenMenu(true);
                break;
            }
            case "mobileSetting": {
                setOpenSettingMobile(true);
                break;
            }
        }
    };
    const handleOpen = () => {
        setOpenMenu(true);
    }
    const handleOpenMobile = () => {
        setOpenSettingMobile(true);
    }
    const VisibleMenu = () => {
        return (
            <ButtonGroup variant={"text"} orientation={isLargeScreen ? "horizontal" : "vertical"}>
                <StyleButtonMenu sx={{...Styles.Button}}>Men</StyleButtonMenu>
                <StyleButtonMenu sx={{...Styles.Button}}>Woman</StyleButtonMenu>
                <StyleButtonMenu sx={{...Styles.Button}}>Sale</StyleButtonMenu>
            </ButtonGroup>
        )
    }
    const VisibleSetting = () => {
        return (
            <>
                {isAuth ? (
                    <ButtonGroup variant={"text"} sx={{
                        width: "170px",
                        display: "flex",
                        justifyContent: "space-between",
                        borderColor: "red"
                    }}>
                        <Button component={"a"} href={"/identity/login"} sx={{
                            ...Styles.Button,
                            width: "100%",
                            color: "#c7493a",
                            m: 0,
                            fontSize: "14px",
                            "&&.MuiButton-root": {borderColor: "#c7493a"}
                        }}>Sign in</Button>
                        <Button component={"a"} href={"/identity/register"} sx={{
                            ...Styles.Button,
                            width: "100%",
                            color: "#c7493a",
                            m: 0,
                            fontSize: "14px",
                            "&&.MuiButton-root": {borderColor: "#c7493a"}
                        }}>Sign up</Button>
                    </ButtonGroup>
                ) : (
                    <>
                        <MenuItem sx={{justifyContent: 'center'}} component={"a"} href={"/profile"}>
                            <PersonOutlineIcon/>
                            <Typography textAlign="center" sx={{width: "100px"}}>Profile</Typography>
                        </MenuItem>
                        <MenuItem sx={{justifyContent: 'center'}} component={"a"} href={"/profile"}>
                            <ShoppingCartIcon/>
                            <Typography textAlign="center" sx={{width: "100px"}}>Cart</Typography>
                        </MenuItem>
                        <MenuItem sx={{justifyContent: 'center'}} component={"a"} href={"/profile"}>
                            <ListAltIcon/>
                            <Typography textAlign="center" sx={{width: "100px"}}>Orders</Typography>
                        </MenuItem>
                        <MenuItem sx={{justifyContent: 'center'}} component={"a"} href={"/profile"}>
                            <LogoutIcon/>
                            <Typography textAlign="center" sx={{width: "100px"}}>Logout</Typography>
                        </MenuItem>
                    </>
                )}
            </>
        )
    }


    return (
        <AppBar sx={{backgroundColor: '#161616', position: "relative"}}>
            <Hidden lgDown>
                <div id={"userLocation"} style={{background: "#F5F5F5"}}>
                    <Container maxWidth="xl">
                        <Box component={'div'} sx={{
                            display: "flex",
                            flexGrow: 1,
                            justifyContent: "end",
                            alignItems: "center",
                            color: "#c7493a"
                        }}>
                            <FmdGoodIcon fontSize={'small'}/>
                            <Typography variant="caption" sx={{margin: "5px"}}>
                                {userCity.city}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Link href={"#"} sx={{color: "inherit", textDecoration: "none", margin: "5px"}}>
                                <Typography variant="caption">
                                    Help & FAQs
                                </Typography>
                            </Link>
                        </Box>
                    </Container>
                </div>
            </Hidden>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <Tooltip title="Open catalog">
                            <IconButton size="large" color="inherit" onClick={(e) => handleClick(e, "menu")}>
                                <MenuIcon style={{color: "#c7493a"}}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Typography variant="h1" component={"a"} href={"/"} sx={{...Styles.Brand}}>TWELFTH</Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: {xs: 'none', lg: 'flex'},
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <VisibleMenu/>
                        <SwipeableDrawer open={openMenu} onOpen={handleOpen} onClose={() => handleClose("menu")}
                                         sx={{".MuiDrawer-paper": {backgroundColor: "#161616", p: 2}}}>
                            <VisibleMenu/>
                        </SwipeableDrawer>
                    </Box>
                    <ButtonGroup variant={"text"}>
                        <Hidden lgDown>
                            <Button sx={{...Styles.Button, display: "flex"}} component={"a"}
                                    href={"/cart"}>Cart</Button>
                        </Hidden>
                        <IconButton
                            onClick={(e) => isLargeScreen ? handleClick(e, "account") : handleClick(e, "mobileSetting")}>
                            <Avatar sx={{width: {xs: "28px", lg: "35px"}, height: {xs: "28px", lg: "35px"}}}></Avatar>
                        </IconButton>
                    </ButtonGroup>
                    <Hidden lgDown>
                        <Menu open={Boolean(openSetting)} anchorEl={openSetting} onClose={() => handleClose("account")}
                              sx={{...Styles.Menu}} transformOrigin={{vertical: 'top', horizontal: 'right',}}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}>
                            <VisibleSetting/>
                        </Menu>
                    </Hidden>
                </Toolbar>
                <Hidden lgUp>
                    <SwipeableDrawer anchor="right" open={openSettingMobile} onOpen={handleOpenMobile}
                                     onClose={() => handleClose("mobileSetting")} sx={{
                        right: 0,
                        ".MuiButtonBase-root": {color: "#d6ccc2"},
                        ".MuiDrawer-paper": {backgroundColor: "#161616", p: 2}
                    }}>
                        <VisibleSetting/>
                    </SwipeableDrawer>
                </Hidden>
            </Container>
        </AppBar>
    );
}
