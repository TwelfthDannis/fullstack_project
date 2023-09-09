import {
    Avatar,
    Button,
    Collapse,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Typography
} from "@mui/material";
import "../style/profile.css"
import * as React from "react";
import photo from "../assets/photo.jpg"
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "../api/axios.jsx";
import {useNavigate} from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate()

    const Styles = {
        Paper: {
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "transparent",
        },
        TypographyAccountName: {
            color: "#c7493a",
            fontWeight: "bold",
            fontSize: "auto",
            wordBreak: "break-word"
        },
        TypographyPersonalData: {
            marginLeft: 1,
            color: "white",
            fontWeight: "bold",
            fontSize: "auto",
            wordBreak: "break-word"
        }
    }
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const handleOpen = () => {
        setOpen(!open);
    }
    useEffect(() => {
        ( async () => {
            try {
                const token = document.cookie.split(";")[0].split("=")[1];
                console.log(token);
                const res = await axios.get("http://localhost:8080/profile", {
                    headers: {
                        Authorization: token,
                    },
                });
                setData(res.data);
                console.log(data)
            } catch (error) {
                navigate("/identity/login");
            }
        })();
    }, []);



    return (
        <Container maxWidth={"md"} sx={{p: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={4} sx={{
                        ...Styles.Paper,
                        height: "100%",
                        alignItems: "center",
                        display: {xs: "block", lg: "flex"}
                    }}>
                        <Avatar sx={{height: "200px", width: "200px", m: 2}} variant="rounded" src={photo}></Avatar>
                        <List sx={{width: "100%"}}>
                            <Divider textAlign="left"
                                     sx={{"::before,::after": {borderColor: "#c7493a"}}}><Typography
                                sx={{...Styles.TypographyAccountName}}>Personal information</Typography></Divider>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>First name:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}>{data.firstName}</Typography>
                            </ListItem>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>Last name:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}>{data.lastName}</Typography>
                            </ListItem>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>Email:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}>{data.email}</Typography>
                            </ListItem>
                            <Divider textAlign="left"
                                     sx={{"::before,::after": {borderColor: "#c7493a"}}}><Typography
                                sx={{...Styles.TypographyAccountName}}>Address
                            </Typography>
                            </Divider>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>Country/Region:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}></Typography>
                            </ListItem>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>Сity:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}></Typography>
                            </ListItem>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>Street address:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}></Typography>
                            </ListItem>
                            <ListItem sx={{py: 0, display: {lg: "flex", xs: "block"}}}>
                                <Typography sx={{...Styles.TypographyAccountName}}>ZIP/Postal Code:</Typography>
                                <Typography sx={{...Styles.TypographyPersonalData}}></Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{...Styles.Paper, display: "block"}} elevation={4}>
                        <ListItemButton sx={{borderRadius: "20px", justifyContent: "center"}} onClick={handleOpen}>
                            <Typography variant={"h5"} fontSize={"20px"} fontWeight={"bold"}
                                        sx={{...Styles.TypographyAccountName}}>
                                Orders
                            </Typography>
                            {open ? <ExpandLess sx={{color: "white"}}/> : <ExpandMore sx={{color: "white"}}/>}
                        </ListItemButton>
                        <Collapse in={open}>
                            <ListItem>q</ListItem>
                        </Collapse>
                    </Paper>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        sx={{...Styles.TypographyAccountName, borderRadius: "20px", fontSize: "16px"}}>Help</Button>
                    <Button sx={{
                        ...Styles.TypographyAccountName,
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "16px"
                    }}>Logout</Button>
                </Grid>
            </Grid>
        </Container>
    )
}