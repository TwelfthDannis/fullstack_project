import {
    Box,
    Button, Checkbox,
    Container,
    createTheme, Divider, IconButton, InputAdornment,
    Paper,
    Stack,
    styled,
    TextField,
    ThemeProvider, Typography
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../api/axios.jsx";
import Cookies from "js-cookie";

//Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const darkTheme = createTheme({palette: {mode: 'dark'}});
const CustomButtonActive = styled(Button)({
    color: "#c7493a",
    border: "1px solid rgba(199, 73, 58,0)",
    fontSize: "large",
    '&:hover': {
        border: "1px solid #c7493a",
        backgroundColor: "transparent",
    }
})
const CustomButtonNonActive = styled(Button)({
    color: "#c7493a",
    fontSize: "large",
})

export default function Sign() {

    const location = useLocation();
    const nav=useNavigate();

    //ColorIcon

    const [dataUser, setDataUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    })
    const handleDataUser = (e) => {
        const {name, value} = e.target;
        setDataUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //Correct Email
    const [errorEmail, setErrorEmail] = useState(false)
    const incorrectEmail = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        re.test(dataUser.email) ? setErrorEmail(false) : setErrorEmail(true)
    }
    //showPassword
    const [showPassword, setShowPassword] = useState(true)
    const handleShowPassword = () => setShowPassword(!showPassword);


    //Style
    const styleInput = {
        flexGrow: 1,
        "& .MuiInput-root": {
            "&::after": {
                borderBottom: "2px solid #c7493a"
            }
        },
        "&:hover": {
            '& .MuiInputLabel-root': {
                color: "#c7493a",
            },
        }

    }
    const styleLabelProp = {
        color: "#495057",
        "&.Mui-focused": {color: "#c7493a"}
    }
    const stylesIcon = {
        iconStatic: {
            mr: 1,
            color: ("#495057"),
            ":hover": {color: "white"}
        },
        iconChange: {
            my: errorEmail ? 'auto' : 0.5
        },
    }
    const styleBoxInput = {
        display: 'flex',
        alignItems: 'flex-end',
    }

    //Post
    const loginData = async () => {
        const res=await axios({
            method:"POST",
            url:"/identity/login",
            data:{
                email:dataUser.email,
                password:dataUser.password
            }})
        document.cookie = `token=${res.data.token};path=/;max-age=${60*60};secure`;
        console.log(res.data)
    }
    const home=()=>{nav("/")}
    const registerData=async ()=>{
        const response=await axios({
            method:"POST",
            url:"/identity/register",
            data:{
                email:dataUser.email,
                password:dataUser.password,
                firstName:dataUser.firstName,
                lastName:dataUser.lastName,
            },
        })
        console.log(response.data)
    }

    const ButtonSign=()=>{
        return(
            <>
                {location.pathname=== "/identity/register" ? (
                    <>
                        <CustomButtonActive onClick={registerData}>
                            Register
                        </CustomButtonActive>
                        <CustomButtonNonActive href={"/identity/login"}>
                            Login
                        </CustomButtonNonActive>
                    </>
                ) : (
                    <>
                        <CustomButtonActive onClick={loginData}>
                            Login
                        </CustomButtonActive>
                        <CustomButtonNonActive href={ "/identity/register"}>
                            Register
                        </CustomButtonNonActive>
                    </>
                )}
            </>
        )
    }


    return (
        <Container fixed sx={{height: "100vh", display: "flex", justifyContent: 'center', alignItems: "center"}}>
            <ThemeProvider theme={darkTheme}>
                <Paper variant={"outlined"} sx={{p: 2, borderRadius: "25px", width: "40vh"}}>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: "center", my: 3}}>
                        <Typography variant="h4" noWrap component="a" href="/" sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            letterSpacing: '.3rem',
                            color: "#c7493a",
                            textDecoration: 'none',
                        }} display={'flex'} justifyContent={'center'}>TWELFTH</Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{m: "8px 0 24px 0"}}>
                        <Stack spacing={2} sx={{py: 2}}>
                            <Box sx={{...styleBoxInput, ":hover": {".MuiSvgIcon-root": {color: "white"}}}}>
                                <AccountCircleOutlinedIcon sx={{...stylesIcon.iconStatic, ...stylesIcon.iconChange}}/>
                                <TextField label="Email" variant="standard" type="email" name='email' onBlur={handleDataUser} title='Enter your email address' helperText={errorEmail ? 'incorrect email' : ''} InputLabelProps={{sx: styleLabelProp}} sx={{...styleInput}}/>
                            </Box>
                            {location.pathname === "/identity/register" && (
                                <>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end',":hover":{"svg":{color:"white"} }}}>
                                        <BadgeOutlinedIcon sx={{...stylesIcon.iconStatic}}/>
                                        <TextField id="FirstName" label="First Name" variant="standard" type="text" name="firstName" title='Enter your first name' InputLabelProps={{sx: styleLabelProp}} sx={styleInput} onBlur={handleDataUser}/>
                                    </Box>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end',":hover":{"svg":{color:"white"} } }}>
                                        <BadgeOutlinedIcon sx={{...stylesIcon.iconStatic}}/>
                                        <TextField id="LastName" label="Last Name" variant="standard" type="text" name="lastName" title='Enter your last name' InputLabelProps={{sx: styleLabelProp}} sx={styleInput} onBlur={handleDataUser}/>
                                    </Box>
                                </>
                            )}
                            <Box sx={{...styleBoxInput,":hover":{"svg":{color:"white"} }}}>
                                <LockOutlinedIcon sx={{...stylesIcon.iconStatic}}/>
                                <TextField label="Password" name='password' variant="standard" title="Enter your password" type={showPassword ? "password" : "text"} onBlur={handleDataUser} InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={"end"}>
                                                <IconButton title="Show password"
                                                            onClick={handleShowPassword} sx={{p: 0.5}}>
                                                    {showPassword ? (
                                                        <VisibilityOutlinedIcon
                                                            sx={{...stylesIcon.iconStatic, m: 0}}/>) : (
                                                        <VisibilityOffOutlinedIcon
                                                            sx={{...stylesIcon.iconStatic, m: 0}}/>)}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    InputLabelProps={{sx: styleLabelProp}}
                                    sx={styleInput}
                                />
                            </Box>
                            {location.pathname === "/identity/register" && (
                                <Box sx={{...styleBoxInput,":hover":{"svg":{color:"white"} }}}>
                                    <LockOutlinedIcon sx={{...stylesIcon.iconStatic}}/>
                                    <TextField label="Confirm password" name='confirmPassword' variant="standard" title="Enter your password" type={showPassword ? "password" : "text"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position={"end"}>
                                                    <IconButton title="Show password" onClick={handleShowPassword}
                                                                sx={{p:0.5}}>
                                                        {showPassword ? (
                                                            <VisibilityOutlinedIcon
                                                                sx={{...stylesIcon.iconStatic,m:0}}/>) : (
                                                            <VisibilityOffOutlinedIcon
                                                                sx={{...stylesIcon.iconStatic,m:0}}/>)}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        InputLabelProps={{sx: styleLabelProp}}
                                        sx={styleInput}/>
                                </Box>
                            )}
                        </Stack>
                        {location.pathname === "identity/register" && (
                            <Stack direction={'row'} sx={{display: "flex", justifyContent: "space-between", pt: 2}}>
                                <Stack direction={'row'}>
                                    <Checkbox defaultChecked sx={{color: "#495057", p: 0.5, "&.Mui-checked": {color: "#c7493a"}}} size={'10px'}/>
                                    <Typography sx={{my: 'auto', fontSize: "10px"}}>Remember me</Typography>
                                </Stack>
                                <Typography sx={{my: "auto", fontSize: "10px"}}>Forgot password?</Typography>
                            </Stack>)}
                    </Box>
                    <Divider/>
                    <Stack spacing={1} sx={{my: 3}}>
                        <ButtonSign/>
                    </Stack>
                </Paper>
            </ThemeProvider>
        </Container>
    )
        ;
}