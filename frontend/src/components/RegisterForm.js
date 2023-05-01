import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Container, Grid, TextField, Typography} from "@mui/material";
import '../App.css';
import axios from "axios";
import {API_BASE_URL} from "../config";
import {Link, useNavigate} from "react-router-dom";
import {checkValue} from "../helpers";

const RegisterForm = () => {
        const [formData, setFormData] = useState({name: '', email: '', password: ''});
        const [formDirty, setFormDirty] = useState({name: false, email: false, password: false});
        const [formError, setFormError] = useState(
            {
                name: 'Имя не может быть пустым',
                email: 'Email не может быть пустым',
                password: 'Пароль не может быть пустым'
            });
        const [formValid, setFormValid] = useState(false);
        const [messageError, setMessageError] = useState('');
        const navigate = useNavigate();

        useEffect(() => {
            if (localStorage.getItem('access_token')) navigate('/');
        }, []);

        useEffect(() => {
            if (formError.name || formError.email || formError.password) {
                setFormValid(false);
            } else {
                setFormValid(true);
            }
        }, [formError]);

        const blurHandler = (e) => {
            switch (e.target.name) {
                case "name":
                    setFormDirty(prev => ({...prev, name: true}));
                    break;
                case "email":
                    setFormDirty(prev => ({...prev, email: true}));
                    break;
                case "password":
                    setFormDirty(prev => ({...prev, password: true}));
                    break;
            }
        }

        const changeFormErrorName = (e) => {
            setFormData(prev => ({...prev, name: e.target.value}));
            if (e.target.value.length < 3) {
                setFormError(prev => ({...prev, name: "Некоректное имя"}));
            } else {
                setFormError(prev => ({...prev, name: ""}));
            }
        }

        const changeInputEl = (e) => {
            const {name, value} = e.target;
            setFormError(prev => ({
                ...prev,
                [name]: checkValue(name, value)
            }));
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            const res = axios.post(API_BASE_URL + '/auth/register', data);
            res.then(response => {
                    if (Object.keys(response.data).includes('access_token')) {
                        localStorage.setItem('access_token', response.data.access_token);
                        return navigate('/');
                    } else {
                        setMessageError(response.data.message);
                    }
                }
            );
            res.catch(error => {
                setMessageError(error.response.data.message);
            });

        }


        return (
            <Container>
                <div style={{marginTop: '75px'}}>
                    <Typography gutterBottom variant="h3" align="center">
                        Регистрация
                    </Typography>
                    {messageError &&
                    <Typography gutterBottom variant="h5" align="center" style={{color: 'red'}}>
                        {messageError}
                    </Typography>
                    }
                    <Grid>
                        <Card style={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
                            <CardContent>
                                <form className={'form-style'}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeFormErrorName}
                                                       type="text" placeholder="Enter name"
                                                       label="name"
                                                       variant="outlined" fullWidth required name={"name"}
                                                       error={!!(formDirty.name && formError.name)}
                                                       helperText={formDirty.name && formError.name ? formError.name : ''}
                                                       value={formData.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="email" placeholder="Enter email"
                                                       label="Email"
                                                       variant="outlined" fullWidth required name={"email"}
                                                       error={!!(formDirty.email && formError.email)}
                                                       helperText={formDirty.email && formError.email ? formError.email : ''}
                                                       value={formData.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="password"
                                                       placeholder="Enter password" label="Password"
                                                       variant="outlined" fullWidth required name={"password"}
                                                       error={!!(formDirty.password && formError.password)}
                                                       helperText={formDirty.password && formError.password ? formError.password : ''}
                                                       value={formData.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button onClick={handleSubmit} disabled={!formValid} type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                            <div style={{textAlign: 'center', marginTop: '15px'}}>
                                <Link className={'link'} to={'/login'}>Уже есть аккаунт?</Link>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </Container>
        );
    }
;
export default RegisterForm;