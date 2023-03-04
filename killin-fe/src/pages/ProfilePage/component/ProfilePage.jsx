import { Button, Card, CardContent, CardMedia, Grid, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import jwtDecode from 'jwt-decode';
import React from 'react'


const ProfilePage = () => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const token = jwtDecode(loginInfo)

    return (


        <div className="container" >


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vh' }} >

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {console.log(token)}
                    <Toolbar />
                    <Grid container spacing={3}>
                        <Card>
                            <CardContent style={{ width: 750, height: 500 }} >

                                <Typography gutterBottom variant="h5" component="h2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '30px' }}>
                                    Personal Information
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    style={{ marginTop: 25, fontSize: '25px' }}

                                >
                                    Name:  {token.fullName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    style={{ marginTop: 25, fontSize: '25px' }}

                                >
                                    Phone number:  {token.phoneNumber}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    style={{ marginTop: 25, fontSize: '25px' }}

                                >
                                    Email:  {token.email}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    style={{ marginTop: 25, fontSize: '25px' }}

                                >
                                    Address:  {token.address}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 25, marginLeft: 285, }}
                                >
                                    Save
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
            </div>

        </div>



    );
};

export default ProfilePage