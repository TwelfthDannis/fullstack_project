import {Button, Container, List, ListItem} from "@mui/material";
import {useState} from "react";
import axios from "../api/axios.jsx";


export default function ProductAdd(){

    const [data,setData]=useState({
        brand:"",
        model:"",
        price:"",
        category:"",
        count:"",
        image:""
    })

    const handleData = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(data);
    }
    const handleAdd=()=>{

    }

    return(
        <Container maxWidth={"xl"} sx={{display:"flex",justifyContent:"center"}}>
            <List>
                <ListItem>
                    <input placeholder={"brand"} name={"brand"} onChange={handleData}/>
                </ListItem>
                <ListItem>
                    <input placeholder={"model"} name={"model"} onChange={handleData}/>
                </ListItem>
                <ListItem>
                    <input placeholder={"price"} name={"price"} onChange={handleData}/>
                </ListItem>
                <ListItem>
                    <input placeholder={"count"} name={"count"} onChange={handleData}/>
                </ListItem>
                <ListItem>
                    <input placeholder={"category"} name={"category"} onChange={handleData}/>
                </ListItem>
                <ListItem>
                    <input placeholder={"name"} type={"file"} name={"image"} onChange={handleData}/>
                </ListItem>
                <Button onClick={handleAdd}>add</Button>
            </List>
        </Container>
    )
}