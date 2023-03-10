import { Button, Card, CardContent, CardMedia, Grid, Toolbar, Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS_ID, GET_PRODUCT_COMMENT_BY_ID, POST_CHANGE_PASSWORD, POST_COMMENT, POST_GET_USER_BY_PHONENUMBER, POST_ORDER, POST_UPDATE_USER } from "../../../services/constants/apiConstants";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPass, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const token = jwtDecode(loginInfo);
    useEffect(() => {
        getUser();
    }, [])
    const handleUpdateClick = () => {
        setIsEditing(true);
    };
    const handlePasswordChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value });
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
    const handleSaveClick = async () => {
        const updatedUser = {
            fullName: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            dob: document.getElementById("dob").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            userId: user.userId
        };
        try {
            console.log(updatedUser);
            const response = await axiosUrl.post(POST_UPDATE_USER, updatedUser);
            const data = { ...response.data };
            setUser(data);
            setIsEditing(false);
        } catch (e) {
            console.error(`Error at handleSaveClick: ${e.message}`);
        }
    };
    const handleSavePasswordClick = async () => {
        try {
            // const params = {
            //     userId: token.userId,
            //     currentPass,
            //     newPassword,
            // };
            if (newPassword === confirmPassword) {
                const updateParams = {
                    userId: token.userId,
                    currentPass: password.currentPassword,
                    newPass: password.newPassword,
                };
                await axiosUrl.post(POST_CHANGE_PASSWORD, updateParams);
                alert('Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert('New password and confirm password do not match');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Current password is not correct');
            } else {
                console.error(`Error at handleSavePasswordClick: ${error.message}`);
            }
        }
    };

    return (

        <div className="container" >
            {console.log(token)}
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh' }} >
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid container spacing={3}>
                        <Card sx={{ display: 'flex', margin: '0 auto' }}>
                            <CardContent style={{ width: 750, minHeight: 500 }} >
                                <Typography gutterBottom variant="h5" component="h2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '30px' }}>
                                    Personal Information
                                </Typography>
                                {isEditing ? (
                                    <div>
                                        <TextField
                                            label="Date Of Birth"
                                            defaultValue={token.dob}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="dob"
                                        />
                                        <TextField
                                            label="Name"
                                            defaultValue={token.fullName}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="name"
                                        />
                                        <TextField
                                            label="Phone number"
                                            defaultValue={token.phoneNumber}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id='phoneNumber'
                                        />
                                        <TextField
                                            label="Email"
                                            defaultValue={user.email}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="email"
                                        />
                                        <TextField
                                            label="Address"
                                            defaultValue={user.address}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="address"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: 25 }}
                                            onClick={handleSaveClick}
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
                                                style={{ marginTop: 25, marginLeft: '15%' }}

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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: 25, marginLeft: 20 }}
                                                onClick={() => setIsEditingPassword(true)}
                                            >
                                                Cập nhật mật khẩu
                                            </Button>

                                        </div>
                                    </div>
                                )}
                                {isEditingPassword && (
                                    <div>
                                        <TextField
                                            label="Mật khẩu hiện tại"
                                            type="password"
                                            name="currentPassword"
                                            value={password.currentPassword}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handlePasswordChange}
                                        />
                                        <TextField
                                            label="Mật khẩu mới"
                                            type="password"
                                            name="newPassword"
                                            value={password.newPassword}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handlePasswordChange}
                                        />
                                        <TextField
                                            label="Xác nhận mật khẩu mới"
                                            type="password"
                                            name="confirmPassword"
                                            value={password.confirmPassword}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handlePasswordChange}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: 25, marginLeft: 250, marginRight: 20 }}
                                                onClick={() => setIsEditingPassword(false)}
                                            >
                                                Hủy bỏ
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: 25 }}
                                                onClick={handleSavePasswordClick}
                                            >
                                                Save Password
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