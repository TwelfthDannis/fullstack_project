import * as React from 'react';
import {
    Avatar,
    Box, Button,
    Card,
    Collapse,
    Container,
    Grid,
    Hidden,
    ListItemButton,
    ListItemText, MenuItem,
    Pagination, Select,
    Stack, styled,
    Typography
} from "@mui/material";
import DunkLow from "../assets/DunkLow.webp"
import DunkLowRetro from "../assets/DunkLowRetro.webp"
import ForceNB from "../assets/ForceNB.webp"
import Huarache from "../assets/Nike Air Huarache.webp"
import AirMax97 from "../assets/Nike Air Max 97.webp"
import AirMax90 from "../assets/NikeAirMax 90.webp"
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios.jsx";

export default function Content() {
    const Styles = {
        NameItem: {
            color: "white",
            fontWeight: "bold",
        },
        ItemProperties: {
            color: "#c7493a",
            fontWeight: "bold",
            fontSize: "14px"
        },
        changeCard: {
            transition: "all 1s ease",
            ":hover": {
                transform: "scale(1.02)",
                backgroundColor: "rgba(255,255,255,0.03)",
                boxShadow: "0 0 0.1px 0.05px rgb(0,0,0)",
                transition: "all 1s ease"
            }
        },
        listItemText: {
            "span": {
                color: "white"
            },
        },
        filterText: {},
        sizeGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
        },
        pagination: {
            display: "flex",
            justifyContent: "center",
            " svg": {color: "#c7493a"},
            "button": {color: "#c7493a", borderColor: "#7f4343"},
            ".MuiPaginationItem-root": {color: "#c7493a"},
            ".Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.05)"
            }
        },
        ButtonBuy:{
            width:"100%",
            color:"#c7493a",
            fontWeight:"bold",
            borderColor:"rgba(255,255,255,0.05)",
            ":hover":{
                backgroundColor:"rgba(127,67,67,0.04)",
                borderColor:"#c7493a"
            }
        }
    }
    const createSizeArray = () => Array.from({length: 33}, (_, i) => (i * 0.5 + 2).toString());
    const filter = [
        {
            category: "Sort By",
            options: ["Price: Low-High", "Price: High-Low"],
        },
        {
            category: "Gender",
            options: ["Men", "Women", "Unisex"],
        },
        {
            category: "Size",
            options: createSizeArray(),
        },
    ];
    const [openedSize, setOpenedSize] = useState(null);
    const FilterVisible = (index) => {
        setOpenedSize(openedSize === index ? null : index);
    };

//pagination
    const shoes = [
        {"id": 1, "name": "Nike", "model": "Dunk low", "price": "100", "image": DunkLow},
        {"id": 2, "name": "Nike", "model": "Dunk Low Retro", "price": "110", "image": DunkLowRetro},
        {"id": 3, "name": "Nike", "model": "Nike Air Force 1 '07 LX NBHD", "price": "90", "image": ForceNB},
        {"id": 4, "name": "Nike", "model": "Huarache", "price": "110", "image": Huarache},
        {"id": 5, "name": "Nike", "model": "Air Max 97", "price": "140", "image": AirMax97},
        {"id": 6, "name": "Nike", "model": "Air Max 90", "price": "120", "image": AirMax90},
    ];
    const handleChangePage = (e , value) => {
        setPage(value);
    };
    const [page, setPage] = useState(1);
    const getVisibleItems = () => {
        const start = (page - 1) * 4;
        const end = page * 4;
        return shoes.slice(start, end);
    }

    const CustomSelect=styled(Select)(({theme})=>({
        height:"40px",
        width:"100%",
        color:"#c7493a",
        ".MuiOutlinedInput-notchedOutline":{
            borderColor:"rgba(255,255,255,0.05)",
        },
    }));
    const [selectedSize, setSelectedSize] = useState({});
    const handleChangeSize = (event,idShoes) => {
        setSelectedSize({...selectedSize,[idShoes]:event.target.value});
    }
    function ShoeItem(x) {
        const shoeSelectedSize = selectedSize[x.shoe.id] || "Size";
        return (
            <Grid item xs={12} lg={3}>
                <Card sx={{backgroundColor:"transparent"}} >
                    <Box sx={{...Styles.changeCard, backgroundColor: "rgba(255,255,255,0.01)", borderRadius: "20px", p: 2}}>
                        <Box>
                            <Avatar variant="rounded" src={x.shoe.image} alt={x.shoe.model} sx={{width:"100%",height:"400px",borderRadius:"20px"}}/>
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography fontSize={"14px"}
                                        sx={{...Styles.NameItem}}>{`${x.shoe.name} ${x.shoe.model}`}</Typography>
                            <Typography fontSize={"10px"} sx={{...Styles.NameItem}}>
                                Shoes / Men
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1}}>
                            <Typography sx={{...Styles.ItemProperties}}>
                                {`Price: $${x.shoe.price}`}
                            </Typography>
                            <Typography sx={{...Styles.ItemProperties}}>
                                Available
                            </Typography>
                        </Box>
                        <CustomSelect value={shoeSelectedSize} onChange={(e)=>handleChangeSize(e,x.shoe.id)} sx={{my:1}}>
                            <MenuItem value={"Size"} disabled>Size</MenuItem>
                            {createSizeArray().map((size, index) => (
                                <MenuItem key={index} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                        <Button variant={"outlined"} sx={{...Styles.ButtonBuy}} onClick={(e)=>AddProductUser(e,x)}>Buy</Button>
                    </Box>
                </Card>
            </Grid>
        );
    }

    const navigate = useNavigate();
    const AddProductUser=async (e, shoes) => {
        if (document.cookie.includes("token") === false) {
            window.location.href = "/identity/login";
        } else {
            const response = await axios.post("/", {
                brand: shoes.shoe.name,
                model: shoes.shoe.model,
                price: shoes.shoe.price,
                image: shoes.shoe.image.split("/")[3].split(".")[0],
                size: selectedSize[shoes.shoe.id]
            },{headers:{"Authorization":document.cookie.split("=")[1]}});
            console.log(response.data);
        }
    }

    return (
        <Container maxWidth={'xl'} sx={{my: 4}}>
            <Hidden lgDown>
                <Box sx={{ position: "absolute", left: 0 }}>
                    <Box sx={{position: "fixed", my: 4, top: "10%", backgroundColor: "rgba(255,255,255,0.03)", maxWidth: "150px", borderRadius: "0 20px 20px 0",}}>
                        {filter.map(({ category, options }, index) => (
                            <React.Fragment key={index}>
                                <ListItemButton
                                    sx={{ "& svg": { color: "white" }, color: "white" }}
                                    onClick={() => FilterVisible(index)}>
                                    <ListItemText primary={category} />
                                    {openedSize !== index ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openedSize === index}>
                                    <Grid container spacing={0}>
                                        {options.map((item) => (
                                            <Grid item xs={category === "Size" ? 4 : 12} key={item}>
                                                <ListItemButton>
                                                    <ListItemText primary={item} sx={{ ...Styles.listItemText }} />
                                                </ListItemButton>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Hidden>
            <Grid container spacing={3}>
                {getVisibleItems().map((shoe) => (
                    <ShoeItem key={shoe.id} shoe={shoe}/>
                ))}
            </Grid>
            <Stack spacing={2} sx={{my: 4}}>
                <Pagination variant="outlined" count={Math.ceil(shoes.length / 4)} onChange={handleChangePage} sx={Styles.pagination}/>
            </Stack>
        </Container>
    )
}