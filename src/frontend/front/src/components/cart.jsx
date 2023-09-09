import {Avatar, Box, Button, Container, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import shoes from "../assets/DunkLow.webp"
import {NumberInput} from "@mui/base/Unstable_NumberInput/NumberInput.js";
import {useState} from "react";


export default function Cart() {
    const [count, setCount] = useState(1);
    const [price,setPrice] = useState(100);
    const [total,setTotal] = useState(count*price);

    const handleChange = (event) => {
        setCount(event.target.value);
        setTotal(event.target.value*price);
    }

    const Styles = {
        TypographyName: {
            color: "#c7493a",
            fontWeight: "bold",
        },
        TypographyUser: {
            color: "#d6ccc2"
        }
    }

    return (
        <Container maxWidth={"md"} sx={{py: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={8} sx={{backgroundColor: "transparent", p: 1}}>
                        <Avatar sx={{ width: "100%", height: "300px"}} src={shoes} alt="shoes"
                                variant="rounded"/>
                        <Box sx={{display: "flex", flexDirection:"column",py:2}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyName}}>Size</Typography>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyUser}}>10.5</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyName}}>Count</Typography>
                            <input type={"number"} value={count} min={1} max={9} style={{width: "25px", backgroundColor: "transparent", color: "#d6ccc2", border: "none", boxShadow: "0 0 2px 0.1px black"}} onChange={handleChange}/>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyName}}>Price</Typography>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyUser}}>${price}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyName}}>Total</Typography>
                            <Typography variant="subtitle1" sx={{...Styles.TypographyUser}}>${total}</Typography>
                        </Box>
                        </Box>
                        <Button variant="outlined" color="error" sx={{width: "100%"}}>DELETE</Button>
                    </Paper>
                </Grid>
            </Grid>
            <Divider sx={{m: 2}}/>
            <Box sx={{display:"flex"}}>
                <Button variant="contained" color="success" sx={{minWidth: "100px", m: "auto"}}>Pay ${total}</Button>
            </Box>
        </Container>
    )
}