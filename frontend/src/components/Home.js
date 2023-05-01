import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {API_BASE_URL, INSTANCE} from "../config";

const Home = () => {
    const [user, setUser] = useState();


    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            INSTANCE.post(API_BASE_URL + '/auth/me', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                setUser(res.data.user);
            });
        }
    }, []);

    return (
        <div style={{marginTop: '150px'}}>
            {!user ?
                (<Typography gutterBottom variant="h5" align="center">
                    Войдите чтобы пользоваться приложением
                </Typography>)
                :
                (<Typography gutterBottom variant="h5" align="center">
                    Добро пожаловать {user.name}!
                </Typography>)
            }
        </div>
    );
};

export default Home;