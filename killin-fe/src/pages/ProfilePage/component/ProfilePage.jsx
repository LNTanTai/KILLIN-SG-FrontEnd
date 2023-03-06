import { Button, Card, CardContent, CardMedia, Grid, Toolbar, Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS_ID, GET_PRODUCT_COMMENT_BY_ID, POST_COMMENT, POST_GET_USER_BY_PHONENUMBER, POST_ORDER } from "../../../services/constants/apiConstants";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = jwtDecode(loginInfo);
    useEffect(() => {
        getUser();
    }, [])
    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const getUser = async () => {
        const params = {
            phoneNumber: token.phoneNumber,
        };
        try {
            const response = await axiosUrl.post(POST_GET_USER_BY_PHONENUMBER, params);
            const data = { ...response.data };
            setUser(data)
            console.log(data);
        } catch (e) {
            console.error(`Error at getUser: ${e.message}`);
        }
    }
    return (
        <div className="container" >


            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh' }} >

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {console.log(token)}
                    <Toolbar />
                    <Grid container spacing={3}>
                        <Card sx={{ display: 'flex', margin: '0 auto' }}>
                            <CardContent style={{ width: 750, height: 500 }} >
                                <Typography gutterBottom variant="h5" component="h2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '30px' }}>
                                    Personal Information
                                </Typography>
                                {isEditing ? (
                                    <div>
                                        <TextField
                                            label="Name"
                                            defaultValue={token.fullName}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            label="Phone number"
                                            defaultValue={token.phoneNumber}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            label="Email"
                                            defaultValue={user.email}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            label="Address"
                                            defaultValue={user.address}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: 25 }}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Typography
                                            variant="body2"
                                            style={{ marginTop: 25, fontSize: '25px' }}
                                        >
                                            Name:  {token.fullName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{ marginTop: 25, fontSize: '25px' }}
                                        >
                                            Phone number:  {token.phoneNumber}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{ marginTop: 25, fontSize: '25px' }}
                                        >
                                            Email:  {user.email}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{ marginTop: 25, fontSize: '25px' }}
                                        >
                                            Address:  {user.address}
                                        </Typography>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: 25, marginLeft: 250 }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: 25, marginLeft: 20 }}
                                                onClick={handleUpdateClick}
                                            >
                                                Update profile
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
            </div>

        </div>



    );
};

export default ProfilePage