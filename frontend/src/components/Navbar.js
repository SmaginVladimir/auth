import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();


    const handleLogOut = (e) => {
        localStorage.removeItem('access_token');
        return navigate('/login');
    };

    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Button onClick={() => navigate('/')} color="inherit">News</Button>
                        </Typography>
                        {localStorage.getItem('access_token') ? (
                            <Button onClick={e => handleLogOut(e)} color="inherit">Выйти</Button>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} color="inherit">Войти</Button>
                                <Button onClick={() => navigate('/register')}
                                        color="inherit">Зарегистрироваться</Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;